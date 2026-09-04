import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import {
  Maximize2,
  Plus,
  Minus,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  FileText,
  Compass,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { CadastralParcel } from '../../types';

interface LeafletCadastreMapProps {
  parcels: CadastralParcel[];
  selectedParcel: CadastralParcel;
  onSelectParcel: (parcel: CadastralParcel) => void;
  onOpenDeedModal: (parcel: CadastralParcel) => void;
  layers: {
    cadastralParcels: boolean;
    cadastralOpacity: number;
    lulcClassification: boolean;
    lulcOpacity: number;
    disputeGlow: boolean;
    disputeRadius: number;
    droneOrthomosaic: boolean;
    waterBuffers: boolean;
  };
  isDarkMode: boolean;
  showWeatherLayer?: boolean;
  onToggleWeatherLayer?: () => void;
}

export const LeafletCadastreMap: React.FC<LeafletCadastreMapProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  onOpenDeedModal,
  layers,
  isDarkMode,
  showWeatherLayer = true,
  onToggleWeatherLayer,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<Map<string, L.Polygon>>(new Map());
  const markerLayersRef = useRef<Map<string, L.Marker>>(new Map());
  const weatherOverlayRef = useRef<L.LayerGroup | null>(null);
  const corridorLayersRef = useRef<L.LayerGroup | null>(null);
  const bufferLayerRef = useRef<L.Circle | null>(null);

  const [tileMode, setTileMode] = useState<'satellite' | 'streets' | 'topo'>('satellite');
  const [internalWeather, setInternalWeather] = useState<boolean>(true);

  const activeWeather = showWeatherLayer ?? internalWeather;
  const toggleWeather = onToggleWeatherLayer || (() => setInternalWeather((prev) => !prev));

  // Base coordinates: Mauje Wagholi, Haveli Taluka, Pune
  const centerLat = 18.5795;
  const centerLng = 73.9820;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Default Esri World Imagery Satellite Tiles (high-resolution, zero API key required)
    const satelliteTileLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Esri, Maxar, Earthstar Geographics',
      }
    );

    // Streets / Cadastral Vector Layer (CartoDB Dark or Positron)
    const streetsTileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }
    );

    // Topographic Layer (OpenTopoMap)
    const topoTileLayer = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution: 'OpenTopoMap',
      }
    );

    satelliteTileLayer.addTo(map);

    // Store tile layers on map object for switching
    (map as any)._tileLayers = {
      satellite: satelliteTileLayer,
      streets: streetsTileLayer,
      topo: topoTileLayer,
      current: satelliteTileLayer,
    };

    // Corridor and infrastructure layers
    const corridors = L.layerGroup().addTo(map);
    corridorLayersRef.current = corridors;

    // SH-27 Highway alignment polyline
    const highwayCoords: [number, number][] = [
      [18.5720, 73.9710],
      [18.5750, 73.9750],
      [18.5785, 73.9805],
      [18.5808, 73.9835],
      [18.5840, 73.9880],
      [18.5880, 73.9935],
    ];
    L.polyline(highwayCoords, {
      color: '#FFFFFF',
      weight: 4,
      opacity: 0.8,
      dashArray: '6, 6',
    }).addTo(corridors);

    // Metro Line 3 Corridor
    const metroCoords: [number, number][] = [
      [18.5710, 73.9735],
      [18.5745, 73.9785],
      [18.5775, 73.9830],
      [18.5810, 73.9875],
      [18.5850, 73.9920],
    ];
    L.polyline(metroCoords, {
      color: '#F59E0B',
      weight: 3.5,
      opacity: 0.85,
    }).addTo(corridors);

    // Weather Layer Group
    const weatherGroup = L.layerGroup().addTo(map);
    weatherOverlayRef.current = weatherGroup;

    // Weather & Rainfall isohyet bands (Pune Haveli agro-climatic corridor)
    const isohyetPolygon1: [number, number][] = [
      [18.5700, 73.9680],
      [18.5820, 73.9700],
      [18.5880, 73.9850],
      [18.5760, 73.9960],
      [18.5680, 73.9850],
    ];
    L.polygon(isohyetPolygon1, {
      color: '#0284C7',
      weight: 1.5,
      fillColor: '#38BDF8',
      fillOpacity: 0.14,
      dashArray: '4, 4',
    }).bindTooltip('IMD Kharif Monsoon Isohyet: 742 mm / Season', { permanent: false }).addTo(weatherGroup);

    // Weather Inundation Risk Buffer along canal corridor
    L.circle([18.5740, 73.9850], {
      radius: 450,
      color: '#06B6D4',
      weight: 2,
      fillColor: '#06B6D4',
      fillOpacity: 0.18,
    }).bindTooltip('Mula-Mutha Riparian Flood Buffer (1-in-25 Yr Return)', { permanent: false }).addTo(weatherGroup);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Mode Change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const tileLayers = (map as any)._tileLayers;
    if (!tileLayers) return;

    map.removeLayer(tileLayers.current);
    const nextLayer = tileLayers[tileMode];
    nextLayer.addTo(map);
    tileLayers.current = nextLayer;
  }, [tileMode]);

  // Handle Weather Layer visibility
  useEffect(() => {
    const weatherGroup = weatherOverlayRef.current;
    const map = mapInstanceRef.current;
    if (!weatherGroup || !map) return;

    if (activeWeather) {
      if (!map.hasLayer(weatherGroup)) {
        weatherGroup.addTo(map);
      }
    } else {
      if (map.hasLayer(weatherGroup)) {
        map.removeLayer(weatherGroup);
      }
    }
  }, [activeWeather]);

  // Render & Update Cadastral Parcels
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing polygons
    polygonLayersRef.current.forEach((poly) => poly.remove());
    polygonLayersRef.current.clear();
    markerLayersRef.current.forEach((marker) => marker.remove());
    markerLayersRef.current.clear();

    if (!layers.cadastralParcels) return;

    parcels.forEach((parcel) => {
      if (!parcel.geoCoordinates) return;
      const isSelected = selectedParcel.id === parcel.id;

      let color = '#10B981'; // Emerald
      let fillColor = '#10B981';
      if (parcel.encumbrance.level === 'HIGH RISK') {
        color = '#EF4444'; // Red
        fillColor = '#EF4444';
      } else if (parcel.encumbrance.level === 'MEDIUM RISK') {
        color = '#F59E0B'; // Amber
        fillColor = '#F59E0B';
      }

      const opacityVal = (layers.cadastralOpacity / 100);
      const fillOpacityVal = isSelected ? Math.min(0.55, 0.45 * opacityVal) : 0.25 * opacityVal;

      // Leaflet expects [lat, lng] format
      const latLngs: [number, number][] = parcel.geoCoordinates.polygon.map((pt) => [pt.lat, pt.lng]);

      const polygon = L.polygon(latLngs, {
        color,
        weight: isSelected ? 3.5 : 2,
        opacity: isSelected ? 1 : 0.85,
        fillColor,
        fillOpacity: fillOpacityVal,
      }).addTo(map);

      // Custom Popup content matching Indian Land Cadastre standards
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 font-sans text-gray-900 text-xs min-w-[220px]';
      popupContent.innerHTML = `
        <div style="border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #0F766E; font-size: 12px; font-family: monospace;">${parcel.plotNumber}</strong>
          <span style="font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; ${
            parcel.encumbrance.level === 'HIGH RISK'
              ? 'background-color: #FEE2E2; color: #991B1B;'
              : parcel.encumbrance.level === 'MEDIUM RISK'
              ? 'background-color: #FEF3C7; color: #92400E;'
              : 'background-color: #D1FAE5; color: #065F46;'
          }">
            ${parcel.encumbrance.level}
          </span>
        </div>
        <div style="line-height: 1.4; color: #374151; font-size: 11px;">
          <div><strong>Holder:</strong> ${parcel.primaryTitleHolder}</div>
          <div><strong>Area:</strong> ${parcel.registeredAreaHectares} Ha (${parcel.registeredAreaAcres} Ac)</div>
          <div><strong>Zone:</strong> ${parcel.landClassification}</div>
          ${
            parcel.encumbrance.hasActiveEncumbrance
              ? `<div style="color: #DC2626; font-weight: 600; margin-top: 3px;">⚠️ ${parcel.encumbrance.suitType}</div>`
              : `<div style="color: #059669; margin-top: 2px;">✓ Verified Clean RoR</div>`
          }
        </div>
        <button id="deed-btn-${parcel.id}" style="margin-top: 8px; width: 100%; background-color: #0F766E; color: white; border: none; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
          Inspect 7/12 Cadastral Deed
        </button>
      `;

      polygon.bindPopup(popupContent);

      polygon.on('popupopen', () => {
        const btn = document.getElementById(`deed-btn-${parcel.id}`);
        if (btn) {
          btn.onclick = () => onOpenDeedModal(parcel);
        }
      });

      polygon.on('click', () => {
        onSelectParcel(parcel);
      });

      polygonLayersRef.current.set(parcel.id, polygon);

      // Add center badge marker with plot number
      const center = parcel.geoCoordinates.center;
      const customIcon = L.divIcon({
        className: 'custom-cadastre-marker',
        html: `
          <div style="
            background: ${color};
            color: #FFFFFF;
            font-family: monospace;
            font-weight: bold;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.7);
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            white-space: nowrap;
            transform: translate(-50%, -50%);
            display: inline-block;
          ">
            ${parcel.plotNumber.replace('Plot No. ', '').replace('#', '')}
          </div>
        `,
        iconSize: [0, 0],
      });

      const marker = L.marker([center.lat, center.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        onSelectParcel(parcel);
        polygon.openPopup();
      });

      markerLayersRef.current.set(parcel.id, marker);
    });
  }, [parcels, selectedParcel, layers.cadastralParcels, layers.cadastralOpacity, onSelectParcel, onOpenDeedModal]);

  // Pan to selected parcel smoothly
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedParcel.geoCoordinates) return;
    map.panTo([selectedParcel.geoCoordinates.center.lat, selectedParcel.geoCoordinates.center.lng], {
      animate: true,
      duration: 0.8,
    });
  }, [selectedParcel]);

  // Handle Water Buffers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (layers.waterBuffers) {
      if (!bufferLayerRef.current) {
        bufferLayerRef.current = L.circle([18.5740, 73.9850], {
          radius: 500,
          color: '#06B6D4',
          weight: 2,
          fillColor: '#06B6D4',
          fillOpacity: 0.22,
        }).addTo(map);
      }
    } else {
      if (bufferLayerRef.current) {
        bufferLayerRef.current.remove();
        bufferLayerRef.current = null;
      }
    }
  }, [layers.waterBuffers]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const allCoords: [number, number][] = [];
    parcels.forEach((p) => {
      if (p.geoCoordinates) {
        p.geoCoordinates.polygon.forEach((pt) => allCoords.push([pt.lat, pt.lng]));
      }
    });
    if (allCoords.length > 0) {
      map.fitBounds(allCoords, { padding: [40, 40] });
    }
  };

  const handleResetNorth = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView([centerLat, centerLng], 16);
  };

  return (
    <div className="w-full h-full min-h-[580px] flex flex-col relative bg-slate-950">
      {/* Floating Top Telemetry & Controls */}
      <div className="absolute top-3 left-3 right-3 z-500 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Real WGS-84 Telemetry and Weather Status */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-white font-mono text-[11px] pointer-events-auto shadow-lg">
          <span className="text-teal-400 font-bold">WGS-84</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-200">18°34'46.2"N, 73°58'55.2"E</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-200 hidden sm:inline">Elev: 568m</span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-emerald-300 font-semibold hidden md:inline">
            ● Live Cadastre (Pune-Haveli)
          </span>
        </div>

        {/* Tile & Weather Mode Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Weather & Monsoon Risk Layer Toggle */}
          <button
            onClick={toggleWeather}
            title="Toggle Weather & Monsoon Agro-Climatic Layer"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border shadow-md transition-colors ${
              activeWeather
                ? 'bg-sky-500/20 text-sky-200 border-sky-400 ring-1 ring-sky-400/40'
                : 'bg-slate-900/85 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Weather Layer</span>
          </button>

          {/* Map Layer Mode Switcher */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-slate-700/60 shadow-lg">
            <button
              onClick={() => setTileMode('satellite')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                tileMode === 'satellite'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setTileMode('streets')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                tileMode === 'streets'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Vector
            </button>
            <button
              onClick={() => setTileMode('topo')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                tileMode === 'topo'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Topo
            </button>
          </div>
        </div>
      </div>

      {/* Weather & Agro-Climatic Intelligence Pill (Floating top-left under telemetry) */}
      {activeWeather && (
        <div className="absolute top-14 left-3 z-500 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/40 text-xs text-white shadow-xl max-w-sm hidden sm:flex items-center gap-3 font-sans animate-fade-in">
          <div className="flex items-center gap-1.5 text-sky-300">
            <CloudRain className="w-3.5 h-3.5 text-sky-400 shrink-0 animate-bounce" />
            <span className="font-semibold font-mono text-[11px]">IMD Pune:</span>
          </div>
          <div className="text-[11px] text-slate-200 flex items-center gap-2">
            <span>28.4°C</span>
            <span className="text-slate-500">•</span>
            <span className="text-sky-200">Monsoon: 742mm (Normal)</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-300">Soil: 62%</span>
          </div>
        </div>
      )}

      {/* Right Floating Navigation Controls */}
      <div className="absolute right-3 top-16 z-500 flex flex-col gap-1.5 pointer-events-auto">
        <button
          onClick={handleResetNorth}
          title="Reset Center & Heading"
          className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-xs font-bold shadow-md transition-colors"
        >
          <span className="text-rose-400 font-mono text-[11px]">▲ N</span>
        </button>

        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/80 flex items-center justify-center shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/80 flex items-center justify-center shadow-md transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={handleFitBounds}
          title="Zoom to Fit All Cadastral Parcels"
          className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/80 flex items-center justify-center shadow-md transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Leaflet Map Viewport Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[580px] flex-1 z-0 relative"
        style={{ minHeight: '580px' }}
      />

      {/* Corridor & Weather Legend Footnote */}
      <div className="absolute bottom-3 left-3 z-500 pointer-events-none hidden sm:flex flex-wrap items-center gap-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[10px] text-white font-mono shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-white inline-block border-b border-dashed" />
          <span className="text-slate-200">SH-27 Highway</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-amber-400 inline-block" />
          <span className="text-slate-200">Metro Line 3</span>
        </div>
        {activeWeather && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/40 border border-sky-400 inline-block" />
            <span className="text-sky-200">742mm Monsoon Isohyet</span>
          </div>
        )}
        {layers.waterBuffers && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-teal-400 bg-teal-500/30 inline-block" />
            <span className="text-slate-200">NGT 500m Buffer</span>
          </div>
        )}
      </div>
    </div>
  );
};

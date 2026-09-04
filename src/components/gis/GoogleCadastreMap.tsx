import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Polygon,
  Polyline,
  Circle,
  useMap
} from '@vis.gl/react-google-maps';
import {
  Maximize2,
  Plus,
  Minus,
  Layers,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  Compass,
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { CadastralParcel } from '../../types';

interface GoogleCadastreMapProps {
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
}

// Sub-component that has access to the Map instance via useMap hook
interface MapCameraControllerProps {
  selectedParcel: CadastralParcel;
  is3DMode: boolean;
  setIs3DMode: (val: boolean) => void;
  parcels: CadastralParcel[];
}

const MapCameraController: React.FC<MapCameraControllerProps> = ({
  selectedParcel,
  is3DMode,
  setIs3DMode,
  parcels,
}) => {
  const map = useMap();

  // Pan to selected parcel when it changes
  useEffect(() => {
    if (!map || !selectedParcel.geoCoordinates) return;
    map.panTo(selectedParcel.geoCoordinates.center);
    if ((map.getZoom() ?? 16) < 16) {
      map.setZoom(16);
    }
  }, [map, selectedParcel]);

  // Handle 3D mode tilt toggle
  useEffect(() => {
    if (!map) return;
    map.setTilt(is3DMode ? 45 : 0);
  }, [map, is3DMode]);

  const handleZoomIn = () => {
    if (!map) return;
    map.setZoom((map.getZoom() ?? 16) + 1);
  };

  const handleZoomOut = () => {
    if (!map) return;
    map.setZoom((map.getZoom() ?? 16) - 1);
  };

  const handleFitBounds = () => {
    if (!map || typeof google === 'undefined') return;
    const bounds = new google.maps.LatLngBounds();
    parcels.forEach((p) => {
      if (p.geoCoordinates) {
        p.geoCoordinates.polygon.forEach((pt) => bounds.extend(pt));
      }
    });
    map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
  };

  const handleResetNorth = () => {
    if (!map) return;
    map.setHeading(0);
    map.setTilt(0);
    setIs3DMode(false);
  };

  return (
    <div className="absolute right-3 top-16 z-20 flex flex-col gap-1.5 pointer-events-auto">
      {/* North Reset Button */}
      <button
        onClick={handleResetNorth}
        title="Reset North Heading"
        className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center text-xs font-bold shadow-md transition-colors"
      >
        <span className="text-rose-400 font-mono text-[11px]">▲ N</span>
      </button>

      {/* Zoom In */}
      <button
        onClick={handleZoomIn}
        title="Zoom In"
        className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>

      {/* Zoom Out */}
      <button
        onClick={handleZoomOut}
        title="Zoom Out"
        className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>

      {/* 3D Perspective Mode Toggle */}
      <button
        onClick={() => setIs3DMode(!is3DMode)}
        title="Toggle 3D Perspective Tilt"
        className={`w-8 h-8 rounded-lg backdrop-blur-md border text-xs font-bold transition-colors shadow-md ${
          is3DMode
            ? 'bg-teal-500 text-white border-teal-400 ring-2 ring-teal-400/40'
            : 'bg-black/80 border-white/20 text-white hover:bg-black'
        }`}
      >
        3D
      </button>

      {/* Full Bounds Fit */}
      <button
        onClick={handleFitBounds}
        title="Zoom to Fit All Cadastral Parcels"
        className="w-8 h-8 rounded-lg bg-black/80 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md transition-colors"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const GoogleCadastreMap: React.FC<GoogleCadastreMapProps> = ({
  parcels,
  selectedParcel,
  onSelectParcel,
  onOpenDeedModal,
  layers,
  isDarkMode,
}) => {
  // Read configured environment key or session fallback
  const envKey = (import.meta as unknown as { env?: { VITE_GOOGLE_MAPS_API_KEY?: string } }).env?.VITE_GOOGLE_MAPS_API_KEY || '';
  const [apiKey, setApiKey] = useState<string>(envKey);
  const [sessionKeyInput, setSessionKeyInput] = useState<string>('');
  const [showKeyBar, setShowKeyBar] = useState<boolean>(!envKey);

  // Map view controls
  const [mapType, setMapType] = useState<'hybrid' | 'satellite' | 'roadmap' | 'terrain'>('hybrid');
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [hoveredParcel, setHoveredParcel] = useState<CadastralParcel | null>(null);
  const [activeInfoWindowParcel, setActiveInfoWindowParcel] = useState<CadastralParcel | null>(null);

  // Wagholi, Haveli Taluka, Pune center coordinates
  const defaultCenter = useMemo(() => ({ lat: 18.5795, lng: 73.9820 }), []);

  // Infrastructure Corridors in Wagholi / Haveli corridor
  const highwayAlignment = useMemo(
    () => [
      { lat: 18.5720, lng: 73.9710 },
      { lat: 18.5750, lng: 73.9750 },
      { lat: 18.5785, lng: 73.9805 },
      { lat: 18.5808, lng: 73.9835 },
      { lat: 18.5840, lng: 73.9880 },
      { lat: 18.5880, lng: 73.9935 },
    ],
    []
  );

  const metroAlignment = useMemo(
    () => [
      { lat: 18.5710, lng: 73.9735 },
      { lat: 18.5745, lng: 73.9785 },
      { lat: 18.5775, lng: 73.9830 },
      { lat: 18.5810, lng: 73.9875 },
      { lat: 18.5850, lng: 73.9920 },
    ],
    []
  );

  // Wetland buffer center (Mula-Mutha tributary canal corridor)
  const wetlandCenter = useMemo(() => ({ lat: 18.5740, lng: 73.9850 }), []);

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Optional Quickstart banner if API key is not configured */}
      {showKeyBar && !envKey && (
        <div className="bg-slate-900/90 text-white text-xs px-3 py-2 border-b border-amber-500/40 flex flex-wrap items-center justify-between gap-2 z-30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-medium text-amber-200">
              Google Maps Platform Integration Active
            </span>
            <span className="text-slate-300 hidden sm:inline">
              (Set <code className="text-amber-300 font-mono">VITE_GOOGLE_MAPS_API_KEY</code> for custom quota or get a free Maps Demo Key)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-teal-300 hover:text-teal-200 underline inline-flex items-center gap-1"
            >
              Get Maps Demo Key <ExternalLink className="w-3 h-3" />
            </a>
            <input
              type="password"
              placeholder="Paste API Key..."
              value={sessionKeyInput}
              onChange={(e) => setSessionKeyInput(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-xs text-white placeholder-slate-400 w-32 focus:outline-none focus:border-teal-400"
            />
            {sessionKeyInput && (
              <button
                onClick={() => {
                  setApiKey(sessionKeyInput);
                  setShowKeyBar(false);
                }}
                className="px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-medium transition-colors"
              >
                Apply
              </button>
            )}
            <button
              onClick={() => setShowKeyBar(false)}
              className="text-slate-400 hover:text-white text-xs px-1"
              title="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Map Canvas with APIProvider */}
      <div className="w-full h-full min-h-[580px] relative flex-1">
        <APIProvider apiKey={apiKey}>
          {/* Top Floating Telemetry & Mode Bar */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white font-mono text-[11px] pointer-events-auto shadow-lg">
              <span className="text-teal-400 font-semibold">WGS-84</span>
              <span className="text-gray-400">|</span>
              <span>18°34'46.2"N, 73°58'55.2"E</span>
              <span className="text-gray-400 hidden sm:inline">|</span>
              <span className="hidden sm:inline">Elev: 568m AMSL</span>
              <span className="text-gray-400 hidden md:inline">|</span>
              <span className="hidden md:inline">Pune-Haveli Cadastre</span>
            </div>

            {/* Map Type Switcher */}
            <div className="flex items-center bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/20 pointer-events-auto shadow-lg">
              <button
                onClick={() => setMapType('hybrid')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  mapType === 'hybrid'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Satellite Hybrid
              </button>
              <button
                onClick={() => setMapType('roadmap')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  mapType === 'roadmap'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Cadastral Vector
              </button>
              <button
                onClick={() => setMapType('terrain')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  mapType === 'terrain'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Terrain
              </button>
            </div>
          </div>

          {/* Google Maps Base Instance */}
          <Map
            // Mandatory internal usage attribution ID per Google Maps Platform skills
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            // Mandatory mapId for AdvancedMarkerElement support
            mapId="DEMO_MAP_ID"
            defaultCenter={defaultCenter}
            defaultZoom={16}
            mapTypeId={mapType}
            gestureHandling="greedy"
            disableDefaultUI={true}
            style={{ width: '100%', height: '100%', minHeight: '580px' }}
          >
            {/* Custom Camera Controller for Zoom, 3D, and Bounds */}
            <MapCameraController
              selectedParcel={selectedParcel}
              is3DMode={is3DMode}
              setIs3DMode={setIs3DMode}
              parcels={parcels}
            />

            {/* Cadastral Parcels Layer */}
            {layers.cadastralParcels &&
              parcels.map((parcel) => {
                if (!parcel.geoCoordinates) return null;
                const isSelected = selectedParcel.id === parcel.id;
                const isHovered = hoveredParcel?.id === parcel.id;

                let strokeColor = '#059669'; // Emerald
                let fillColor = '#10B981';

                if (parcel.encumbrance.level === 'HIGH RISK') {
                  strokeColor = '#DC2626'; // Red
                  fillColor = '#EF4444';
                } else if (parcel.encumbrance.level === 'MEDIUM RISK') {
                  strokeColor = '#D97706'; // Amber
                  fillColor = '#F59E0B';
                }

                const opacityFactor = (layers.cadastralOpacity / 100);
                const fillOpacity = isSelected
                  ? Math.min(0.55, 0.4 * opacityFactor)
                  : isHovered
                  ? Math.min(0.4, 0.3 * opacityFactor)
                  : 0.22 * opacityFactor;

                return (
                  <React.Fragment key={parcel.id}>
                    {/* Cadastral Polygon Geometry Overlay */}
                    <Polygon
                      paths={parcel.geoCoordinates.polygon}
                      strokeColor={strokeColor}
                      strokeOpacity={isSelected ? 1.0 : 0.85}
                      strokeWeight={isSelected ? 3.5 : isHovered ? 2.5 : 1.8}
                      fillColor={fillColor}
                      fillOpacity={fillOpacity}
                      onClick={() => {
                        onSelectParcel(parcel);
                        setActiveInfoWindowParcel(parcel);
                      }}
                      onMouseOver={() => setHoveredParcel(parcel)}
                      onMouseOut={() => setHoveredParcel(null)}
                    />

                    {/* AdvancedMarker Pin for Parcel Identity */}
                    <AdvancedMarker
                      position={parcel.geoCoordinates.center}
                      title={`${parcel.plotNumber} - ${parcel.primaryTitleHolder}`}
                      onClick={() => {
                        onSelectParcel(parcel);
                        setActiveInfoWindowParcel(parcel);
                      }}
                    >
                      <Pin
                        background={
                          parcel.encumbrance.level === 'HIGH RISK'
                            ? '#DC2626'
                            : parcel.encumbrance.level === 'MEDIUM RISK'
                            ? '#D97706'
                            : '#059669'
                        }
                        borderColor="#FFFFFF"
                        glyphColor="#FFFFFF"
                        scale={isSelected ? 1.15 : 0.95}
                      >
                        <div className="text-[10px] font-bold font-mono px-0.5">
                          {parcel.plotNumber.replace('Plot No. ', '').replace('#', '')}
                        </div>
                      </Pin>
                    </AdvancedMarker>
                  </React.Fragment>
                );
              })}

            {/* Infrastructure Corridor: Pune-Nagar Highway (SH-27) */}
            <Polyline
              path={highwayAlignment}
              strokeColor="#FFFFFF"
              strokeOpacity={0.7}
              strokeWeight={4}
            />

            {/* Infrastructure Corridor: Metro Line 3 Corridor */}
            <Polyline
              path={metroAlignment}
              strokeColor="#F59E0B"
              strokeOpacity={0.8}
              strokeWeight={3}
            />

            {/* NGT 500m Wetland Buffer Zone */}
            {layers.waterBuffers && (
              <Circle
                center={wetlandCenter}
                radius={500}
                strokeColor="#06B6D4"
                strokeOpacity={0.9}
                strokeWeight={2}
                fillColor="#06B6D4"
                fillOpacity={0.18}
              />
            )}

            {/* Interactive InfoWindow on Active Parcel Pin */}
            {activeInfoWindowParcel && activeInfoWindowParcel.geoCoordinates && (
              <InfoWindow
                position={activeInfoWindowParcel.geoCoordinates.center}
                onCloseClick={() => setActiveInfoWindowParcel(null)}
              >
                <div className="p-1 max-w-[260px] text-gray-900 font-sans">
                  <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-1 mb-1.5">
                    <span className="text-xs font-bold font-mono text-teal-900">
                      {activeInfoWindowParcel.plotNumber}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                        activeInfoWindowParcel.encumbrance.level === 'HIGH RISK'
                          ? 'bg-rose-100 text-rose-700'
                          : activeInfoWindowParcel.encumbrance.level === 'MEDIUM RISK'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {activeInfoWindowParcel.encumbrance.level}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] leading-tight">
                    <p className="text-gray-600">
                      <strong>Holder:</strong> {activeInfoWindowParcel.primaryTitleHolder}
                    </p>
                    <p className="text-gray-600">
                      <strong>Area:</strong> {activeInfoWindowParcel.registeredAreaHectares} Ha ({activeInfoWindowParcel.registeredAreaAcres} Acres)
                    </p>
                    <p className="text-gray-600">
                      <strong>Zone:</strong> {activeInfoWindowParcel.landClassification}
                    </p>
                    {activeInfoWindowParcel.encumbrance.hasActiveEncumbrance && (
                      <p className="text-rose-600 font-medium">
                        ⚠️ {activeInfoWindowParcel.encumbrance.suitType}
                      </p>
                    )}
                  </div>

                  <div className="mt-2.5 pt-1.5 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenDeedModal(activeInfoWindowParcel)}
                      className="w-full py-1 px-2 rounded bg-teal-700 hover:bg-teal-800 text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Inspect 7/12 Cadastral Deed</span>
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Corridor Legend and Status Footnote */}
      <div className="absolute bottom-14 left-3 z-20 pointer-events-none hidden sm:flex items-center gap-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-[10px] text-white font-mono shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-white inline-block" />
          <span>SH-27 Highway</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-amber-400 inline-block" />
          <span>Metro Line 3</span>
        </div>
        {layers.waterBuffers && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-teal-400 bg-teal-500/30 inline-block" />
            <span>NGT 500m Buffer</span>
          </div>
        )}
      </div>
    </div>
  );
};

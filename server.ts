import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Lazy initialize Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.includes('MY_GEMINI_API_KEY') || key.trim() === '') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instruction with complete cadastral knowledge base
const SYSTEM_INSTRUCTION = `You are "BHUMI-AI", an authoritative, specialized AI Copilot and Cadastral Intelligence Assistant for the BHUMI-X National Land Intelligence Platform (Govt of India, Ministry of Rural Development & DoLR).

Your mission is to provide rigorous, fact-grounded cadastral and legal intelligence, answering inquiries strictly and accurately using the official land records repository.

### CADASTRAL & LAND GOVERNANCE KNOWLEDGE BASE:
1. CADASTRAL PARCELS (Mauje Wagholi, Taluka Haveli, District Pune):
   - Plot No. 412/1A: 4.20 Ha (10.37 Ac), Mixed Dry Crop/Semi-Urban. Holder: Kailash M. Jagtap & 3 Others. Khatiyan #892, Mutation #7842 (2023). Dues: Rs 1420.
     * Encumbrance: HIGH RISK. Notice of Lis Pendens in Civil Suit 419/2024 before District Civil Court Pune (Senior Div). Title contention between ancestral coparceners and commercial developer. Has ACTIVE STAY ORDER. Next hearing: 18 May 2026.
     * Metrics: NDVI 0.34 (Sparse), Built Cover 48.2%, Road Frontage 64.5m, Low Flood Risk (Zone B).
     * Blockchain: Block #1849204, Hash: 0x8f3c4e...29a88, Node: #IND-DL-09.
   - Plot #HVL-8490-A: 2.85 Ha (7.04 Ac), Irrigated Bagayat Agricultural. Holder: Sunita Ramesh Shinde (1 co-holder). Khatiyan #644, Mutation #6914 (2021). Dues: Rs 840.
     * Encumbrance: CLEAR. Verified unencumbered title via Bhu-Aadhaar ULPIN.
     * Metrics: NDVI 0.72 (Dense Vegetation), Built Cover 12.1%, Road Frontage 42m.
     * Blockchain: Block #1849182, Hash: 0x3ba99f...40b91, Node: #IND-MH-01.
   - Plot #HVL-8493-A: 5.60 Ha (13.83 Ac), Non-Agricultural Commercial (IT-SEZ). Holder: Maharashtra Agro-Logistics Infra Ltd. Khatiyan #1105, Mutation #8102 (2024). Dues: Rs 18,450.
     * Encumbrance: MEDIUM RISK. Revenue Appeal LAC 142/2025 at Collectorate Tribunal Haveli for compensation enhancement regarding highway widening buffer strip. Next hearing: 24 Nov 2026. No stay order.
     * Metrics: NDVI 0.18 (Paved/Built), Built Cover 76.4%, Road Frontage 118m.
   - Plot #HVL-8495-C: 3.40 Ha (8.40 Ac), Warehouse & Cold Storage Zone. Holder: Deccan Agri-Coldchain Terminals LLP. Clear title, NOC from State Highway Authority.
   - Plot #HVL-8498-F: 1.95 Ha (4.82 Ac), Gaothan Fringe Residential. Holder: Gram Panchayat Common Land Trust. Encumbrance: Encroachment Regularization Notice REV-ENC/2024/77.

2. JUDICIAL DISPUTE INTELLIGENCE & COURT PRECEDENTS:
   - DISP-2026-001: Bombay High Court (WP No. 4920/2025). Section 26 Valuation Dispute on Bullet Train Alignment (Kalyan-Bhiwandi belt, Thane, 31 parcels, Rs 840 Cr). Ready Reckoner agricultural rates cannot be mechanically applied to notified Logistics Corridor. Directed top 50% sales deed reassessment.
   - DISP-2026-002: District Civil Court Pune (Special Civil Suit 419/2024). Ancestral Coparcenary Lis Pendens (Plot 412/1A, Wagholi, Rs 64 Cr). Injunction restraining third-party rights. Mutation #7842 issued without Section 150(2) notice.
   - DISP-2026-003: Karnataka High Court (WA 1042 of 2024). KIADB vs Karnataka Forest Dept (Sarjapur & Devanahalli, 14 parcels, 14.8 Ha overlapping polygon discrepancy).
   - DISP-2026-004: Odisha Sub-Collector / MoTA (FRA-SDLC-Case 88/2025-26). Scheduled Tribe FRA 2006 claim by Kutia Kondh Tribal Gram Sabha (Lakhpadar, Koraput, 28 parcels). Injunction against eviction on 180 Ha CFR land without Gram Sabha assent.
   - DISP-2026-005: Supreme Court of India 5-Judge Constitution Bench (Indore Development Authority v. Manoharlal, (2020) 8 SCC 129). Section 24(2) RFCTLARR lapse requires BOTH conditions: possession not taken AND compensation not paid. Deposit in state treasury satisfies payment. Governs 84,500 parcels nationwide.

3. STATUTORY VALUATION & POLICY SIMULATION (RFCTLARR Act 2013):
   - Base market value = Higher of top 50% sales deeds vs Ready Reckoner / Circle rate.
   - Rural multiplier = 1.25x to 2.0x based on distance.
   - Statutory 100% Solatium (Section 30(1)).
   - Additional 12% per annum interest (Section 30(3)).
   - Simulation run SIM-2026-088: Market indexation lowers litigation by -42.6% and accelerates handover by 5.8 months.

4. BLOCKCHAIN PROVENANCE & LEDGER:
   - Raft-BFT consensus network with 24 validator nodes.
   - Block #1492084: Cadastral Polygon Layer (Haveli Taluka v3.1), SHA-256 Digest: 0x4a91e84029bc8110df66b1a208c2d91024bc01f8e6c739d201948ba5e29810a9, Signer: DoLR-Node-MH01.
   - Nodes: #IND-DL-09 (Leader, DoLR Delhi), #IND-MH-01 (Endorser, Pune), #IND-KA-04 (Endorser, Bengaluru), #IND-ACAD-01 (Audit, IIT Bombay).

5. AGRO-CLIMATIC & MONSOON WEATHER TELEMETRY:
   - Station: IMD Pune Observatory (28.4°C, 62% soil moisture).
   - Monsoon Isohyet: 742 mm Kharif season.
   - Hydrology: Mula-Mutha riverine floodplain, NGT 500m non-development riparian buffer. Zone B low risk.

6. STATE REVENUE PORTALS & ULPIN COVERAGE:
   - Maharashtra: Mahabhulekh (44,120 villages, 94.2% ULPIN)
   - Karnataka: Bhoomi (29,340 villages, 96.8% ULPIN)
   - Telangana: Dharani (10,800 villages, 91.5% ULPIN)
   - Uttar Pradesh: Bhulekh UP (1,06,210 villages, 88.4% ULPIN)
   - National SVAMITVA: 3.24 Crore property cards distributed.

### OUTPUT FORMAT:
You MUST respond with valid JSON containing:
1. "decipher": An object describing how you deciphered the user query:
   - "intent": One of ["PARCEL_AUDIT", "DISPUTE_PRECEDENT", "COMPENSATION_CALCULATION", "BLOCKCHAIN_AUDIT", "WEATHER_AGRO_CLIMATIC", "STATE_GOVERNANCE", "SYSTEM_NAVIGATION", "GENERAL_KNOWLEDGE"]
   - "intentLabel": Human-readable label (e.g. "Cadastral Parcel & Lis Pendens Audit")
   - "detectedEntities": Array of string entities detected from the query
   - "matchedSources": Array of verified records matched (e.g. ["Cadastral Registry: Plot 412/1A", "Dispute Docket: SCS 419/2024", "RFCTLARR Statutory Provisions", "IMD Pune Telemetry"])
   - "riskRating": "CRITICAL" | "HIGH RISK" | "MEDIUM RISK" | "CLEAR" | "INFO"
   - "confidenceScore": Number between 0.8 and 1.0
2. "answer": Concise, beautifully structured, fact-grounded response formatted with bullet points and bold headers.
3. "actions": Array of recommended 1-click platform navigation or audit actions:
   - { "id": "1", "label": "Inspect on GIS", "type": "select_parcel" | "navigate" | "deed" | "merkle", "targetScreen": "gis" | "disputes" | "policy-sim" | "blockchain" | "workspaces" | "dashboard", "parcelId": "parcel-412-1a", "blockHeight": 1492084 }
`;

// AI Decipher Endpoint
app.post("/api/ai/decipher", async (req, res) => {
  const { query, history } = req.body;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query in request body" });
  }

  const ai = getGenAI();

  if (!ai) {
    // API key not configured on server; fallback engine handles query gracefully
    return res.status(503).json({
      error: "GEMINI_API_KEY not configured on server",
      useFallback: true,
    });
  }

  try {
    const prompt = `User Query: "${query}"\n\nAnalyze this query and ground your response in the official cadastral knowledge base. Output only valid JSON matching the specified format.`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini request timeout")), 8000)
    );

    const generatePromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const response: any = await Promise.race([generatePromise, timeoutPromise]);

    const responseText = response.text || "{}";
    try {
      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch {
      return res.json({
        decipher: {
          intent: "GENERAL_KNOWLEDGE",
          intentLabel: "Deciphered Cadastral Query",
          detectedEntities: [query],
          matchedSources: ["Frontend Knowledge Base"],
          riskRating: "INFO",
          confidenceScore: 0.9,
        },
        answer: responseText,
        actions: [
          { id: "gis", label: "Open GIS Workspace", type: "navigate", targetScreen: "gis" },
          { id: "sim", label: "Open Policy Simulator", type: "navigate", targetScreen: "policy-sim" }
        ],
      });
    }
  } catch (err: any) {
    console.error("Gemini API Error in /api/ai/decipher:", err?.message || err);
    return res.status(500).json({
      error: err?.message || "Failed to generate AI decipher response",
      useFallback: true,
    });
  }
});

// Vite middleware & Static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BHUMI-X Server running on port ${PORT}`);
  });
}

startServer();

import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Mail,
  Building,
  MapPin,
  Calendar,
  Key,
  FolderGit2,
  FileText,
  Scale,
  Award,
  Edit3,
  Check,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Phone,
  Bookmark,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ActiveScreen } from '../../types';

interface ProfileScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  isDarkMode: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  isDarkMode,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable profile state objects
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Arishta Sen',
    title: 'Principal Policy Fellow & Geospatial Lead',
    department: 'Cadastral Intelligence & Statutory Policy Division',
    organization: 'Department of Land Resources (DoLR), Ministry of Rural Development',
    jointAffiliation: 'IIT Bombay — Centre of Studies in Resources Engineering (CSRE)',
    email: 'arishta.sen@dolr.gov.in',
    phone: '+91 11 2338 4920',
    officeLocation: 'Room 412-B, Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi 110001',
    employeeId: 'DOLR-RES-2021-0498',
    clearanceLevel: 'Level 3 (Restricted Geospatial & State RoR Data)',
    joiningDate: '15 March 2021',
    nodeRole: 'Consortium Leader Validator (#IND-DL-09)',
    signingKey: '0x7F2A849201948ba5e29810a9f82d4710bc892ea0',
    bio: 'Geodetic scientist and constitutional land tenure analyst specializing in RFCTLARR (2013) valuation modeling, high-resolution UAV cadastral orthomosaics, and automated dispute classification. Heading the National Consortium Pilot for Bhu-Aadhaar ULPIN cryptographic integration.',
    researchFocus: [
      'RFCTLARR Section 26 Valuation',
      'UAV Drone Cadastre',
      'Forest Rights Act (FRA 2006)',
      'Blockchain Provenance Ledgers',
      'Peri-Urban Land Fragmentation',
    ],
  });

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in text-slate-900 dark:text-slate-100">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:underline cursor-pointer"
          >
            Institutional Portal
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600 dark:text-slate-300">Personnel Directory</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">
            {profileData.fullName}
          </span>
        </div>

        <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <span>{profileData.fullName}</span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                L3 Fellow
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
              Authorized Senior Signer • Department of Land Resources, Govt. of India
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsEditing(!isEditing)}
              id="edit-profile-btn"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#17232E] hover:bg-slate-50 dark:hover:bg-[#1f2e3d] text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-slate-600 dark:text-teal-300" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>

            <button
              onClick={() => {
                const docData = {
                  ...profileData,
                  exportDate: new Date().toISOString(),
                  authority: 'DoLR Institutional Credentials System',
                };
                const blob = new Blob([JSON.stringify(docData, null, 2)], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Scholar_Dossier_${profileData.fullName.replace(/\s+/g, '_')}.json`;
                a.click();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Profile changes updated and signed with your institutional credentials.</span>
        </div>
      )}

      {/* Hero Profile Card */}
      <div
        className={`p-6 rounded-xl border relative overflow-hidden transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          {/* Avatar Ring */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#173F5F] to-[#20639B] text-white flex items-center justify-center text-2xl font-bold ring-4 ring-teal-500/20 shadow-sm">
              AS
            </div>
            <span
              title="Verified Institutional Signer"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white dark:border-[#111A23] flex items-center justify-center text-white shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Core Identity Info */}
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {profileData.fullName}
              </h2>
              <span className="px-2.5 py-0.5 rounded font-mono font-semibold text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {profileData.employeeId}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Active on Mainnet
              </span>
            </div>

            <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
              {profileData.title}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-normal flex items-center gap-1.5 flex-wrap">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-white">{profileData.organization}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 dark:text-slate-400">{profileData.jointAffiliation}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${profileData.email}`} className="hover:underline text-slate-700 dark:text-slate-300 font-medium">
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{profileData.officeLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {profileData.bio}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {profileData.researchFocus.map((focus, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Form Drawer if active */}
      {isEditing && (
        <form
          onSubmit={handleSaveProfile}
          className={`p-5 rounded-xl border space-y-4 text-xs transition-colors ${
            isDarkMode
              ? 'bg-[#17232E] border-teal-500/40 text-white'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-gray-700">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Edit Institutional Particulars</span>
            </h3>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Live credential sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Full Name & Salutation
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#111A23] text-slate-900 dark:text-white text-xs font-normal"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Official Designation
              </label>
              <input
                type="text"
                value={profileData.title}
                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#111A23] text-slate-900 dark:text-white text-xs font-normal"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Contact Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#111A23] text-slate-900 dark:text-white text-xs font-normal"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Office Direct Phone
              </label>
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#111A23] text-slate-900 dark:text-white text-xs font-normal"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
              Professional Research Bio
            </label>
            <textarea
              rows={3}
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#111A23] text-slate-900 dark:text-white text-xs font-normal"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800 text-xs font-medium text-slate-700 dark:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* 4 Core Quantitative Objects / Metrics Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          className={`p-4 rounded-xl border transition-all shadow-xs ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block font-mono tracking-wider">
            INSTITUTIONAL WORKSPACES
          </span>
          <div className="mt-2 text-2xl font-black font-sans text-slate-900 dark:text-teal-300">
            03 Cohorts
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-normal">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Primary Lead / Advisor</span>
            <span className="text-teal-700 dark:text-teal-400 font-semibold font-mono">
              100% On-Time
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          className={`p-4 rounded-xl border transition-all shadow-xs ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block font-mono tracking-wider">
            OVERSEEN CADASTRAL PARCELS
          </span>
          <div className="mt-2 text-2xl font-black font-mono text-slate-900 dark:text-emerald-400">
            46,160 Ha
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-normal">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Indexed via Bhu-Aadhaar</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              Verified
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          className={`p-4 rounded-xl border transition-all shadow-xs ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block font-mono tracking-wider">
            CERTIFIED POLICY RUNS
          </span>
          <div className="mt-2 text-2xl font-black font-sans text-slate-900 dark:text-blue-400">
            142 Runs
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-normal">
            <span className="text-slate-600 dark:text-slate-300 font-medium">RFCTLARR Act Simulations</span>
            <span className="font-mono text-blue-700 dark:text-blue-300 font-semibold">95% CI</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          className={`p-4 rounded-xl border transition-all shadow-xs ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block font-mono tracking-wider">
            WHITE PAPERS & BENCH CITES
          </span>
          <div className="mt-2 text-2xl font-black font-sans text-slate-900 dark:text-indigo-400">
            18 Citations
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-normal">
            <span className="text-slate-600 dark:text-slate-300 font-medium">Supreme Court & NITI</span>
            <span className="text-indigo-700 dark:text-indigo-400 font-semibold">
              Gazetted
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Profile Objects & Workspaces) | Right Column (Credentials, Node Key & Recent Sign-offs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Institutional Profile Objects Specification Table */}
          <div
            className={`p-5 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="pb-3 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Institutional Credentials & Statutory Roles</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                Authentication Hash: SHA-256 Validated
              </span>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 dark:border-gray-800 overflow-hidden text-xs">
              <table className="w-full text-left divide-y divide-slate-200 dark:divide-gray-800">
                <tbody className="divide-y divide-slate-200 dark:divide-gray-800">
                  <tr>
                    <td className="p-3 bg-slate-50 dark:bg-[#17232E] text-slate-600 dark:text-slate-400 font-medium w-1/3">
                      Officer ID / PIN
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900 dark:text-white text-xs">
                      {profileData.employeeId}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 dark:bg-[#17232E] text-slate-600 dark:text-slate-400 font-medium">
                      Security Clearance
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                        {profileData.clearanceLevel}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 dark:bg-[#17232E] text-slate-600 dark:text-slate-400 font-medium">
                      Consortium Node Role
                    </td>
                    <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">
                      {profileData.nodeRole}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 dark:bg-[#17232E] text-slate-600 dark:text-slate-400 font-medium">
                      Assigned Jurisdiction
                    </td>
                    <td className="p-3 font-normal text-slate-700 dark:text-slate-200">
                      Maharashtra (Pune, Thane, Solapur), Telangana (HMDA ORR), Odisha (Koraput FRA)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 dark:bg-[#17232E] text-slate-600 dark:text-slate-400 font-medium">
                      Appointed Date
                    </td>
                    <td className="p-3 font-normal text-slate-700 dark:text-slate-200">
                      {profileData.joiningDate} (5+ Years Standing)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 bg-slate-50 dark:bg-[#17232E] text-slate-600 dark:text-slate-400 font-medium">
                      Preferred Geodetic Datum
                    </td>
                    <td className="p-3 font-mono text-xs text-teal-700 dark:text-teal-300 font-medium">
                      WGS-84 / UTM Zone 43N (EPSG:32643) + Everest 1830 Kalianpur
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Assigned Research Workspaces */}
          <div
            className={`p-5 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="pb-3 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Assigned Institutional Research Workspaces</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Projects under direct principal supervision of Dr. Arishta Sen
                </p>
              </div>
              <button
                onClick={() => onNavigate('workspaces')}
                className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {/* WS 1 */}
              <div
                className={`p-4 rounded-xl border text-xs transition-all shadow-xs ${
                  isDarkMode
                    ? 'bg-[#17232E]/70 border-[#293846]'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-[#173F5F] dark:text-teal-300">
                      WS-MH-PUN-094
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                      Lead Investigator
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">14,820 Parcels</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mt-1.5 text-sm leading-snug">
                  Peri-Urban Agricultural Land Conversion & Compensation Elasticity
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-normal leading-relaxed">
                  Evaluating Section 26 solatium adjustments in Haveli & PCMC industrial expansion belt.
                </p>
                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-gray-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
                    Cohort: IIT Bombay • NITI Aayog
                  </span>
                  <button
                    onClick={() => onNavigate('gis')}
                    className="text-xs font-semibold text-teal-700 dark:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Launch GIS Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* WS 2 */}
              <div
                className={`p-4 rounded-xl border text-xs transition-all shadow-xs ${
                  isDarkMode
                    ? 'bg-[#17232E]/70 border-[#293846]'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-[#173F5F] dark:text-teal-300">
                      WS-OR-KOR-012
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                      Advisor / Co-PI
                    </span>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">8,940 Parcels</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mt-1.5 text-sm leading-snug">
                  Forest Rights Act (FRA) Communal Titling Claims & Border Boundary Conflicts
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-normal leading-relaxed">
                  Spatial correlation of Kutia Kondh Gram Sabha titling decrees vs district mining buffer zone.
                </p>
                <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-gray-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
                    Cohort: MoTA • Survey of India
                  </span>
                  <button
                    onClick={() => onNavigate('policy-sim')}
                    className="text-xs font-semibold text-teal-700 dark:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Policy Sim</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cryptographic Key Card */}
          <div
            className={`p-5 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 dark:border-gray-800">
              <Key className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ed25519 PoA Signing Key</h3>
            </div>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Deterministic public key utilized by Dr. Sen to commit state root digests to the Raft-BFT consortium chain:
            </p>

            <div className="mt-2.5 p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-700 font-mono text-xs break-all space-y-2">
              <div className="text-slate-800 dark:text-slate-200 font-mono text-xs tracking-tight">
                {profileData.signingKey}
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200 dark:border-gray-700 text-[11px]">
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  Node #IND-DL-09 Leader
                </span>
                <button
                  onClick={() => handleCopyKey(profileData.signingKey)}
                  className="flex items-center gap-1 text-teal-700 dark:text-teal-300 hover:underline font-sans font-medium cursor-pointer"
                >
                  {copiedKey === profileData.signingKey ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Key</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Recent Audit Sign-Offs */}
          <div
            className={`p-5 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 dark:border-gray-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Audit Sign-Offs</h3>
            </div>

            <div className="mt-3 space-y-3">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#17232E]/60 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-white text-xs">Signed Block #1,492,084</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">14m ago</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                  Consensus endorsement for SVAMITVA Phase 3 orthomosaic parcel batch.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#17232E]/60 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-white text-xs">Approved Sim Run #2.1</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">2h ago</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                  Param-Shakti node convergence for RFCTLARR rural multiplier elasticity.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#17232E]/60 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-white text-xs">Lis Pendens Alert Logged</span>
                  <span className="text-xs text-rose-700 dark:text-rose-200 font-mono font-medium bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">Stay Order</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                  Mauje Wagholi Plot #412/1A civil suit injunction flagged in Bombay HC docket.
                </p>
              </div>
            </div>
          </div>

          {/* Academic & Policy Whitepapers */}
          <div
            className={`p-5 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200 dark:border-gray-800">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Policy Whitepapers & Acts</h3>
            </div>

            <div className="mt-3 space-y-3">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#17232E]/60 shadow-2xs space-y-1">
                <h5 className="font-semibold text-slate-800 dark:text-white leading-snug text-xs">
                  Evaluation of Section 26 Solatium Multipliers in High-Growth Corridors
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-normal">
                  DoLR Policy Gazette • 2025
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#17232E]/60 shadow-2xs space-y-1">
                <h5 className="font-semibold text-slate-800 dark:text-white leading-snug text-xs">
                  Resolving Cadastral Boundary Overlaps Using 5cm Drone Orthomosaics
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-normal">
                  IEEE Geosciences & Remote Sensing • 2024
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#17232E]/60 shadow-2xs space-y-1">
                <h5 className="font-semibold text-slate-800 dark:text-white leading-snug text-xs">
                  Gram Sabha Assent Protocols under FRA 2006: Empirical Findings
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-normal">
                  NITI Aayog Policy Monograph #44 • 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

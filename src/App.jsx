import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LearningDashboard from './pages/LearningDashboard';
import CtfArenaHome from './pages/CtfArenaHome';

// Academy Modul 1 Hardware Imports
import IntroHardware from './pages/academy/stage1-fundamental/modul1-hardware/IntroHardware';
import CpuDanRam from './pages/academy/stage1-fundamental/modul1-hardware/CpuDanRam';
import StorageDanMobo from './pages/academy/stage1-fundamental/modul1-hardware/StorageDanMobo';
import KesimpulanHardware from './pages/academy/stage1-fundamental/modul1-hardware/KesimpulanHardware';

// Academy Modul 2 Networking Imports
import IntroNetworking from './pages/academy/stage1-fundamental/modul2-networking/IntroNetworking';
import IpDanMac from './pages/academy/stage1-fundamental/modul2-networking/IpDanMac';
import PortDanProtokol from './pages/academy/stage1-fundamental/modul2-networking/PortDanProtokol';
import KesimpulanNetworking from './pages/academy/stage1-fundamental/modul2-networking/KesimpulanNetworking';

// Academy Modul 3 Troubleshooting Imports
import IntroTroubleshoot from './pages/academy/stage1-fundamental/modul3-troubleshooting/IntroTroubleshoot';
import IsolasiMasalah from './pages/academy/stage1-fundamental/modul3-troubleshooting/IsolasiMasalah';
import MembacaLog from './pages/academy/stage1-fundamental/modul3-troubleshooting/MembacaLog';
import KesimpulanTroubleshoot from './pages/academy/stage1-fundamental/modul3-troubleshooting/KesimpulanTroubleshoot';

// Academy Modul 4 Office Imports
import IntroOffice from './pages/academy/stage1-fundamental/modul4-office/IntroOffice';
import BahayaMacro from './pages/academy/stage1-fundamental/modul4-office/BahayaMacro';
import ExcelTarget from './pages/academy/stage1-fundamental/modul4-office/ExcelTarget';
import KesimpulanOffice from './pages/academy/stage1-fundamental/modul4-office/KesimpulanOffice';

// Academy Stage 2 OS Basics Imports
import IntroOS from './pages/academy/stage2-os/modul1-basics/IntroOS';
import KarakterWindows from './pages/academy/stage2-os/modul1-basics/KarakterWindows';
import KekuatanLinux from './pages/academy/stage2-os/modul1-basics/KekuatanLinux';
import KesimpulanOS from './pages/academy/stage2-os/modul1-basics/KesimpulanOS';

// Academy Stage 2 - Modul 2 (Installation & Troubleshooting)
import IntroInstalasi from './pages/academy/stage2-os/modul2-install/IntroInstalasi';
import ProsesBooting from './pages/academy/stage2-os/modul2-install/ProsesBooting';
import TroubleshootOS from './pages/academy/stage2-os/modul2-install/TroubleshootOS';
import KesimpulanInstall from './pages/academy/stage2-os/modul2-install/KesimpulanInstall';

// Stage 2 - Modul 3: CLI
import IntroCli from './pages/academy/stage2-os/modul3-cli/IntroCli';
import PerintahPing from './pages/academy/stage2-os/modul3-cli/PerintahPing';
import PerintahIpconfig from './pages/academy/stage2-os/modul3-cli/PerintahIpconfig';
import KesimpulanCli from './pages/academy/stage2-os/modul3-cli/KesimpulanCli';

// Stage 2 - Modul 4: Virtualization
import IntroVirtualisasi from './pages/academy/stage2-os/modul4-virtualization/IntroVirtualisasi';
import SoftwareVm from './pages/academy/stage2-os/modul4-virtualization/SoftwareVm';
import KeajaibanSnapshot from './pages/academy/stage2-os/modul4-virtualization/KeajaibanSnapshot';
import KesimpulanVirtualisasi from './pages/academy/stage2-os/modul4-virtualization/KesimpulanVirtualisasi';

// Stage 3 - Networking Knowledge
import IntroOsi from './pages/academy/stage3-networking/modul1-osi/IntroOsi';
import UpperLayers from './pages/academy/stage3-networking/modul1-osi/UpperLayers';
import LowerLayers from './pages/academy/stage3-networking/modul1-osi/LowerLayers';
import KesimpulanOsi from './pages/academy/stage3-networking/modul1-osi/KesimpulanOsi';

// Stage 3 - Modul 2: Common Ports & Protocols
import IntroPorts from './pages/academy/stage3-networking/modul2-ports/IntroPorts';
import WebProtocols from './pages/academy/stage3-networking/modul2-ports/WebProtocols';
import AdminProtocols from './pages/academy/stage3-networking/modul2-ports/AdminProtocols';
import KesimpulanPorts from './pages/academy/stage3-networking/modul2-ports/KesimpulanPorts';

// Stage 3 - Modul 3: Network Topologies
import IntroTopology from './pages/academy/stage3-networking/modul3-topologies/IntroTopology';
import StarBusRing from './pages/academy/stage3-networking/modul3-topologies/StarBusRing';
import MeshTree from './pages/academy/stage3-networking/modul3-topologies/MeshTree';
import KesimpulanTopology from './pages/academy/stage3-networking/modul3-topologies/KesimpulanTopology';

// Stage 3 - Modul 4: IP, MAC, DHCP & DNS
import IntroIpMac from './pages/academy/stage3-networking/modul4-ipdns/IntroIpMac';
import DhcpServer from './pages/academy/stage3-networking/modul4-ipdns/DhcpServer';
import DnsResolution from './pages/academy/stage3-networking/modul4-ipdns/DnsResolution';
import KesimpulanIpDns from './pages/academy/stage3-networking/modul4-ipdns/KesimpulanIpDns';

// Stage 3 - Modul 5: NAS & SAN Basics
import IntroStorage from './pages/academy/stage3-networking/modul5-nassan/IntroStorage';
import DeepDiveNas from './pages/academy/stage3-networking/modul5-nassan/DeepDiveNas';
import DeepDiveSan from './pages/academy/stage3-networking/modul5-nassan/DeepDiveSan';
import KesimpulanNasSan from './pages/academy/stage3-networking/modul5-nassan/KesimpulanNasSan';

// Stage 4 - Security Skills Imports
import IntroAuth from './pages/academy/stage4-security/modul1-auth/IntroAuth';
import TigaPilarMfa from './pages/academy/stage4-security/modul1-auth/TigaPilarMfa';
import SingleSignOn from './pages/academy/stage4-security/modul1-auth/SingleSignOn';
import KesimpulanAuth from './pages/academy/stage4-security/modul1-auth/KesimpulanAuth';

// Academy Stage 4 - Modul 2: Cryptography & Hashing
import IntroCrypto from './pages/academy/stage4-security/modul2-crypto/IntroCrypto';
import SymmetricAsymmetric from './pages/academy/stage4-security/modul2-crypto/SymmetricAsymmetric';
import HashingGilingan from './pages/academy/stage4-security/modul2-crypto/HashingGilingan';
import KesimpulanCrypto from './pages/academy/stage4-security/modul2-crypto/KesimpulanCrypto';

// Academy Stage 4 - Modul 3: Common Attacks
import IntroPhishing from './pages/academy/stage4-security/modul3-attacks/IntroPhishing';
import SqlInjection from './pages/academy/stage4-security/modul3-attacks/SqlInjection';
import CrossSiteScripting from './pages/academy/stage4-security/modul3-attacks/CrossSiteScripting';
import KesimpulanAttacks from './pages/academy/stage4-security/modul3-attacks/KesimpulanAttacks';

// Academy Stage 4 - Modul 4: Incident Response Tools
import IntroIrTools from './pages/academy/stage4-security/modul4-tools/IntroIrTools';
import NmapScanner from './pages/academy/stage4-security/modul4-tools/NmapScanner';
import WiresharkSniffer from './pages/academy/stage4-security/modul4-tools/WiresharkSniffer';
import KesimpulanTools from './pages/academy/stage4-security/modul4-tools/KesimpulanTools';

// Academy Stage 4 - Modul 5: Security Frameworks
import IntroFrameworks from './pages/academy/stage4-security/modul5-frameworks/IntroFrameworks';
import NistFramework from './pages/academy/stage4-security/modul5-frameworks/NistFramework';
import MitreAttack from './pages/academy/stage4-security/modul5-frameworks/MitreAttack';
import KesimpulanTahap4 from './pages/academy/stage4-security/modul5-frameworks/KesimpulanTahap4';

import { Terminal, ShieldAlert } from 'lucide-react';

import MainLayout from './components/MainLayout';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/academy" element={<LearningDashboard />} />
        <Route path="/ctf-arena" element={<CtfArenaHome />} />
        
        {/* Academy Modul 1 Hardware Routes */}
        <Route path="/academy/stage-1/modul-1/intro" element={<IntroHardware />} />
        <Route path="/academy/stage-1/modul-1/cpu-ram" element={<CpuDanRam />} />
        <Route path="/academy/stage-1/modul-1/storage-mobo" element={<StorageDanMobo />} />
        <Route path="/academy/stage-1/modul-1/kesimpulan" element={<KesimpulanHardware />} />

        {/* Academy Modul 2 Networking Routes */}
        <Route path="/academy/stage-1/modul-2/intro" element={<IntroNetworking />} />
        <Route path="/academy/stage-1/modul-2/ip-mac" element={<IpDanMac />} />
        <Route path="/academy/stage-1/modul-2/port-protokol" element={<PortDanProtokol />} />
        <Route path="/academy/stage-1/modul-2/kesimpulan" element={<KesimpulanNetworking />} />

        {/* Academy Modul 3 Troubleshooting Routes */}
        <Route path="/academy/stage-1/modul-3/intro" element={<IntroTroubleshoot />} />
        <Route path="/academy/stage-1/modul-3/isolasi-masalah" element={<IsolasiMasalah />} />
        <Route path="/academy/stage-1/modul-3/membaca-log" element={<MembacaLog />} />
        <Route path="/academy/stage-1/modul-3/kesimpulan" element={<KesimpulanTroubleshoot />} />

        {/* Academy Modul 4 Office Routes */}
        <Route path="/academy/stage-1/modul-4/intro" element={<IntroOffice />} />
        <Route path="/academy/stage-1/modul-4/bahaya-macro" element={<BahayaMacro />} />
        <Route path="/academy/stage-1/modul-4/excel-target" element={<ExcelTarget />} />
        <Route path="/academy/stage-1/modul-4/kesimpulan" element={<KesimpulanOffice />} />

        {/* Academy Stage 2 OS Basics Routes */}
        <Route path="/academy/stage-2/modul-1/intro" element={<IntroOS />} />
        <Route path="/academy/stage-2/modul-1/windows-matic" element={<KarakterWindows />} />
        <Route path="/academy/stage-2/modul-1/linux-manual" element={<KekuatanLinux />} />
        <Route path="/academy/stage-2/modul-1/kesimpulan" element={<KesimpulanOS />} />

        {/* Stage 2 - Modul 2 (Installation & Troubleshooting) */}
        <Route path="/academy/stage-2/modul-2/intro" element={<IntroInstalasi />} />
        <Route path="/academy/stage-2/modul-2/booting-bios" element={<ProsesBooting />} />
        <Route path="/academy/stage-2/modul-2/troubleshooting" element={<TroubleshootOS />} />
        <Route path="/academy/stage-2/modul-2/kesimpulan" element={<KesimpulanInstall />} />
        
        {/* Stage 2 - Modul 3: CLI */}
        <Route path="/academy/stage-2/modul-3/intro" element={<IntroCli />} />
        <Route path="/academy/stage-2/modul-3/perintah-ping" element={<PerintahPing />} />
        <Route path="/academy/stage-2/modul-3/perintah-ipconfig" element={<PerintahIpconfig />} />
          <Route path="/academy/stage-2/modul-3/kesimpulan" element={<KesimpulanCli />} />
          
          {/* Stage 2 - Modul 4: Virtualization */}
          <Route path="/academy/stage-2/modul-4/intro" element={<IntroVirtualisasi />} />
          <Route path="/academy/stage-2/modul-4/software-vm" element={<SoftwareVm />} />
          <Route path="/academy/stage-2/modul-4/snapshot" element={<KeajaibanSnapshot />} />
          <Route path="/academy/stage-2/modul-4/kesimpulan" element={<KesimpulanVirtualisasi />} />
          
          {/* Stage 3 - Networking Knowledge */}
          <Route path="/academy/stage-3/modul-1" element={<IntroOsi />} />
          <Route path="/academy/stage-3/modul-1/upper-layers" element={<UpperLayers />} />
          <Route path="/academy/stage-3/modul-1/lower-layers" element={<LowerLayers />} />
          <Route path="/academy/stage-3/modul-1/kesimpulan" element={<KesimpulanOsi />} />

          {/* Stage 3 - Modul 2: Common Ports & Protocols */}
          <Route path="/academy/stage-3/modul-2" element={<IntroPorts />} />
          <Route path="/academy/stage-3/modul-2/web-protocols" element={<WebProtocols />} />
          <Route path="/academy/stage-3/modul-2/admin-protocols" element={<AdminProtocols />} />
          <Route path="/academy/stage-3/modul-2/kesimpulan" element={<KesimpulanPorts />} />

          {/* Stage 3 - Modul 3: Network Topologies */}
          <Route path="/academy/stage-3/modul-3/intro" element={<IntroTopology />} />
          <Route path="/academy/stage-3/modul-3/star-bus-ring" element={<StarBusRing />} />
          <Route path="/academy/stage-3/modul-3/mesh-tree" element={<MeshTree />} />
          <Route path="/academy/stage-3/modul-3/kesimpulan" element={<KesimpulanTopology />} />

          {/* Stage 3 - Modul 4: IP, MAC, DHCP & DNS Routes */}
          <Route path="/academy/stage-3/modul-4/intro" element={<IntroIpMac />} />
          <Route path="/academy/stage-3/modul-4/dhcp" element={<DhcpServer />} />
          <Route path="/academy/stage-3/modul-4/dns" element={<DnsResolution />} />
          <Route path="/academy/stage-3/modul-4/kesimpulan" element={<KesimpulanIpDns />} />

          {/* Stage 3 - Modul 5: NAS & SAN Basics Routes */}
          <Route path="/academy/stage-3/modul-5/intro-storage" element={<IntroStorage />} />
          <Route path="/academy/stage-3/modul-5/nas-deep-dive" element={<DeepDiveNas />} />
          <Route path="/academy/stage-3/modul-5/san-deep-dive" element={<DeepDiveSan />} />
          <Route path="/academy/stage-3/modul-5/kesimpulan-storage" element={<KesimpulanNasSan />} />

          {/* Stage 4 - Security Skills Routes */}
          <Route path="/academy/stage-4/modul-1/intro" element={<IntroAuth />} />
          <Route path="/academy/stage-4/modul-1/tiga-pilar" element={<TigaPilarMfa />} />
          <Route path="/academy/stage-4/modul-1/sso" element={<SingleSignOn />} />
          <Route path="/academy/stage-4/modul-1/kesimpulan" element={<KesimpulanAuth />} />

        {/* Stage 4 - Modul 2: Cryptography & Hashing Routes */}
        <Route path="/academy/stage-4/modul-2/intro" element={<IntroCrypto />} />
        <Route path="/academy/stage-4/modul-2/symmetric-asymmetric" element={<SymmetricAsymmetric />} />
        <Route path="/academy/stage-4/modul-2/hashing-gilingan" element={<HashingGilingan />} />
        <Route path="/academy/stage-4/modul-2/kesimpulan" element={<KesimpulanCrypto />} />

        {/* Stage 4 - Modul 3: Common Attacks Routes */}
        <Route path="/academy/stage-4/modul-3/intro-phishing" element={<IntroPhishing />} />
        <Route path="/academy/stage-4/modul-3/sql-injection" element={<SqlInjection />} />
        <Route path="/academy/stage-4/modul-3/xss" element={<CrossSiteScripting />} />
        <Route path="/academy/stage-4/modul-3/kesimpulan" element={<KesimpulanAttacks />} />

        {/* Stage 4 - Modul 4: Incident Response Tools Routes */}
        <Route path="/academy/stage-4/modul-4/intro" element={<IntroIrTools />} />
        <Route path="/academy/stage-4/modul-4/nmap-scanner" element={<NmapScanner />} />
        <Route path="/academy/stage-4/modul-4/wireshark-sniffer" element={<WiresharkSniffer />} />
        <Route path="/academy/stage-4/modul-4/kesimpulan" element={<KesimpulanTools />} />

        {/* Stage 4 - Modul 5: Security Frameworks Routes */}
        <Route path="/academy/stage-4/modul-5/intro" element={<IntroFrameworks />} />
        <Route path="/academy/stage-4/modul-5/nist-framework" element={<NistFramework />} />
        <Route path="/academy/stage-4/modul-5/mitre-attack" element={<MitreAttack />} />
        <Route path="/academy/stage-4/modul-5/kesimpulan" element={<KesimpulanTahap4 />} />
        </Routes>
    </AnimatePresence>
  );
}

// Navigation Components
import FloatingBackButton from './components/FloatingBackButton';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FloatingBackButton />
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;

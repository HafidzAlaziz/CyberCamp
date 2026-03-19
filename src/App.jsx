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

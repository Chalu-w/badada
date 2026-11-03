import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { Gallery } from './components/Gallery';
import { FamilyTree } from './components/FamilyTree';
import { Tributes } from './components/Tributes';
import { CandleSection } from './components/CandleSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { BiographySection } from './types';

const MainContent: React.FC = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<BiographySection | null>(null);

  const handleEditSection = (section: BiographySection) => {
    setEditingSection(section);
    setAdminModalOpen(true);
  };

  const handleCloseAdmin = () => {
    setAdminModalOpen(false);
    setEditingSection(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2421]">
      {/* Navigation Header */}
      <Header
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenCandleModal={() => {
          const el = document.getElementById('candle-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenCandleModal={() => {
            const el = document.getElementById('candle-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Virtual Candle Lighting Section */}
        <div id="candle-section">
          <CandleSection />
        </div>

        {/* 13-Chapter Comprehensive Biography */}
        <Biography onEditSection={handleEditSection} />

        {/* Real Family Photo Gallery */}
        <Gallery />

        {/* Family Lineage & Ancestry Tree */}
        <FamilyTree />

        {/* Yaadannoo fi Dhaamsa Jireenyaa (Memorial Tributes) */}
        <Tributes />
      </main>

      {/* Memorial Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Admin Authentication & Control Dashboard */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={handleCloseAdmin}
        initialEditSection={editingSection}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <AuthProvider>
          <MainContent />
        </AuthProvider>
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;

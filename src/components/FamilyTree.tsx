import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  GitFork, 
  Plus, 
  Trash2, 
  Edit, 
  Heart, 
  Award, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';
import { FamilyMember } from '../types';

export const FamilyTree: React.FC = () => {
  const { language, t } = useLanguage();
  const { family, addFamilyMember, deleteFamilyMember } = useData();
  const { isAdmin } = useAuth();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newRelationship, setNewRelationship] = useState('');
  const [newGeneration, setNewGeneration] = useState<1 | 2 | 3>(2);
  const [newBirthYear, setNewBirthYear] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const gen1 = family.filter((m) => m.generation === 1);
  const gen2 = family.filter((m) => m.generation === 2);
  const gen3 = family.filter((m) => m.generation === 3);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim()) return;

    await addFamilyMember({
      fullName: newFullName.trim(),
      relationship: newRelationship.trim() || 'Maatii',
      generation: newGeneration,
      birthYear: newBirthYear.trim(),
      notes: newNotes.trim(),
    });

    setNewFullName('');
    setNewRelationship('');
    setNewBirthYear('');
    setNewNotes('');
    setShowAddModal(false);
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Miseensa maatii kana balleessuu barbaadduu?')) {
      await deleteFamilyMember(id);
    }
  };

  return (
    <section id="family" className="py-20 bg-white text-[#1A2421] border-b border-[#C5A059]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0F2E23] text-[#F3E5AB] text-xs font-serif tracking-widest uppercase">
            <Users className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Hidda Dhalootaa • Lineage & Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0F2E23] tracking-tight">
            {t.familyHeading}
          </h2>

          <p className="max-w-2xl mx-auto text-base text-[#5C6D66] font-sans">
            {t.familySubheading}
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mt-4"></div>
        </div>

        {/* Admin Add Family Member Button */}
        {isAdmin && (
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F2E23] text-[#F3E5AB] text-xs font-bold shadow hover:bg-[#16423C]"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" />
              <span>Miseensa Maatii Dabali (Add Family Member)</span>
            </button>
          </div>
        )}

        {/* Tree Visual Flowchart / Layout */}
        <div className="space-y-12">
          
          {/* GENERATION 1: The Patriarch & Matriarch */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-xs font-serif font-bold text-[#0F2E23] uppercase tracking-wider">
                {t.familyGeneration1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {gen1.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-b from-[#0F2E23] to-[#081712] text-white p-6 rounded-3xl border-2 border-[#C5A059] shadow-xl text-center relative group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#16423C] border-2 border-[#C5A059] mx-auto mb-3 flex items-center justify-center shadow-gold-glow">
                    <img 
                      src="/logo-tree.svg" 
                      alt="Crest" 
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F3E5AB]">
                    {item.fullName}
                  </h3>
                  <p className="text-xs text-[#C5A059] font-semibold mt-1">
                    {item.relationship}
                  </p>

                  {item.birthYear && (
                    <span className="inline-block mt-2 text-[11px] font-mono bg-black/40 px-2.5 py-0.5 rounded-full text-gray-300 border border-[#C5A059]/30">
                      {item.birthYear}
                    </span>
                  )}

                  {item.notes && (
                    <p className="mt-3 text-xs text-gray-300 leading-relaxed italic">
                      "{item.notes}"
                    </p>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteMember(item.id)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Connecting Tree Stem */}
            <div className="w-0.5 h-10 bg-[#C5A059] mx-auto"></div>
          </div>

          {/* GENERATION 2: Children */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-xs font-serif font-bold text-[#0F2E23] uppercase tracking-wider">
                {t.familyGeneration2}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gen2.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DFC9] shadow-sm hover:shadow-memorial transition-all relative group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold flex items-center justify-center flex-shrink-0 border border-[#C5A059]/40">
                      {item.fullName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-lg font-bold text-[#0F2E23]">
                        {item.fullName}
                      </h4>
                      <p className="text-xs text-[#C5A059] font-semibold">
                        {item.relationship}
                      </p>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteMember(item.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {item.notes && (
                    <p className="mt-4 text-xs text-[#5C6D66] leading-relaxed">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Connecting Tree Stem */}
            <div className="w-0.5 h-10 bg-[#C5A059] mx-auto"></div>
          </div>

          {/* GENERATION 3: Grandchildren */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-[#FAF7F2] border border-[#C5A059] text-xs font-serif font-bold text-[#0F2E23] uppercase tracking-wider">
                {t.familyGeneration3}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gen3.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#E8DFC9] shadow-sm relative group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#16423C] text-[#F3E5AB] flex items-center justify-center font-bold text-sm">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-serif text-base font-bold text-[#0F2E23]">
                        {item.fullName}
                      </h5>
                      <p className="text-[11px] text-[#5C6D66]">
                        {item.relationship}
                      </p>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteMember(item.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {item.notes && (
                    <p className="mt-3 text-xs text-[#5C6D66]">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Add Member Modal */}
        {showAddModal && (
          <div
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#C5A059]/40 space-y-4"
            >
              <h3 className="font-serif text-xl font-bold text-[#0F2E23]">
                Miseensa Maatii Dabali
              </h3>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Maqaa Guutuu (Full Name) *
                  </label>
                  <input
                    type="text"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="fkn: Tolasaa Badhaadhaa"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Walitti Dhufeenya (Relationship)
                  </label>
                  <input
                    type="text"
                    value={newRelationship}
                    onChange={(e) => setNewRelationship(e.target.value)}
                    placeholder="fkn: Ilma, Intala, Akaakayyuu"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Dhaloota (Generation)
                  </label>
                  <select
                    value={newGeneration}
                    onChange={(e) => setNewGeneration(Number(e.target.value) as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-sm bg-white"
                  >
                    <option value={1}>Dhaloota 1ffaa (Abbaa/Haadha)</option>
                    <option value={2}>Dhaloota 2ffaa (Ijoollee)</option>
                    <option value={3}>Dhaloota 3ffaa (Akaakayyuulee)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2E23] mb-1">
                    Yaadannoo / Ibsa (Notes)
                  </label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Ibsa gabaabaa..."
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CAAF] text-sm"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#0F2E23] text-[#F3E5AB] font-serif font-bold text-xs"
                  >
                    Galmeessi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


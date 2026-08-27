import React from 'react';
import Link from 'next/link';
import { Microscope, Activity, Dna, ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Forensic Science & Medical Evidence of Eucharistic Miracles | Encounter Christ',
  description: 'Examine the medical investigations, histopathological studies, and blind laboratory tests by Columbia University and WHO pathologists on Eucharistic Miracles.',
};

export default function SciencePage() {
  const comparisonData = [
    {
      miracle: 'Lanciano, Italy',
      year: '750 AD',
      analyst: 'Prof. Dr. Odoardo Linoli (Arezzo) & WHO/UN',
      bloodType: 'AB Positive',
      tissue: 'Myocardium & Endocardium (Heart)',
      state: 'Living human blood proteins intact after 1,250 years',
    },
    {
      miracle: 'Buenos Aires, Argentina',
      year: '1996',
      analyst: 'Dr. Frederic Zugibe (Columbia Univ. Pathologist)',
      bloodType: 'AB Positive',
      tissue: 'Left Ventricle Myocardium (Heart Muscle)',
      state: 'Living heart muscle under severe trauma with active leukocytes',
    },
    {
      miracle: 'Sokółka, Poland',
      year: '2008',
      analyst: 'Prof. Sobaniec-Łotowska & Prof. Sulkowski',
      bloodType: 'AB Positive',
      tissue: 'Myocardium intertwined with wheat flour',
      state: 'Inseparable cellular fusion between bread and human heart',
    },
    {
      miracle: 'Legnica, Poland',
      year: '2013',
      analyst: 'Pomeranian Medical University Forensics',
      bloodType: 'AB Positive',
      tissue: 'Striated Muscle (Heart Tissue)',
      state: 'Alterations characteristic of human agony and severe distress',
    },
    {
      miracle: 'Tixtla, Mexico',
      year: '2006',
      analyst: 'Dr. Ricardo Castañón Gómez & Int\'l Team',
      bloodType: 'AB Positive',
      tissue: 'Myocardium with active leukocytes',
      state: 'Blood emanated internally with active white blood cells',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold">
          <Microscope className="w-3.5 h-3.5 text-amber-700" /> Peer-Reviewed Histopathology
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          The Forensic Science of the Eucharist
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          When independent forensic pathologists, medical schools, and cardiologists conducted blind laboratory testing on Eucharistic miracles across multiple continents and centuries, the physical results revealed an astonishing identical biological reality.
        </p>
      </div>

      {/* The 4 Universal Biological Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Finding 1 */}
        <div className="sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-red-300 bg-white shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600 shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            1. Universal AB+ Blood Type
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            In every analyzed Eucharistic miracle where blood typing was performed (Lanciano, Buenos Aires, Tixtla), the blood group was conclusively determined to be <strong>AB Positive</strong>.
          </p>
          <p className="text-xs text-stone-600 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <strong>Key Insight:</strong> AB+ is the universal recipient blood group—the blood type of one who can receive from anyone. Remarkably, this exact blood group is found on the Shroud of Turin and the Sudarium of Oviedo.
          </p>
        </div>

        {/* Finding 2 */}
        <div className="sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-amber-300 bg-white shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-sm">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            2. Left-Ventricular Myocardium
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            Pathological examinations repeatedly show the flesh is <strong>human cardiac tissue (myocardium)</strong> specifically taken from the left ventricle—the vital muscular chamber responsible for pumping life-giving blood to the entire body.
          </p>
          <p className="text-xs text-stone-600 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <strong>Key Insight:</strong> Jesus did not give random tissue; He gave the muscle of His very Heart, which beats with infinite love for humanity.
          </p>
        </div>

        {/* Finding 3 */}
        <div className="sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-emerald-300 bg-white shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            3. Active White Blood Cells & Agony
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            In dead tissue, white blood cells (leukocytes) disintegrate within 15 to 45 minutes. Yet in the samples from Buenos Aires, Legnica, and Tixtla, intact white blood cells were actively infiltrating the cardiac muscle.
          </p>
          <p className="text-xs text-stone-600 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <strong>Key Insight:</strong> Pathologist Dr. Frederic Zugibe affirmed this proves the heart was <em>alive and undergoing intense psychological/physical trauma and agony</em> at the moment the sample was obtained.
          </p>
        </div>

        {/* Finding 4 */}
        <div className="sacred-glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-blue-300 bg-white shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 shadow-sm">
            <Dna className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">
            4. Microscopic Cellular Intertwining
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            In the Polish miracle of Sokółka, electron microscope scans showed cardiac fibers deeply interwoven into the unleavened wheat matrix at the cellular level.
          </p>
          <p className="text-xs text-stone-600 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <strong>Key Insight:</strong> Even with modern nanotechnology, it is impossible for human hands or laboratories to interlock biological cardiac fibers with baked flour structure in this manner.
          </p>
        </div>
      </div>

      {/* Cross-Miracle Comparative Table */}
      <div className="sacred-glass-card rounded-3xl p-6 sm:p-10 space-y-6 border border-amber-300 shadow-xl bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Comparative Medical Dossier Matrix
            </h3>
            <p className="text-xs text-stone-600">
              Cross-examination of histological data across 5 major recognized miracles.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto shadow-sm">
            100% Concordance on AB+ & Myocardium
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-amber-200 text-stone-600 font-mono font-bold bg-amber-50/50">
                <th className="py-3 px-4">Miracle & Location</th>
                <th className="py-3 px-4">Investigating Pathologists</th>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Tissue Identification</th>
                <th className="py-3 px-4">Forensic Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 text-stone-800">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-amber-50/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-stone-900">
                    <div>{row.miracle}</div>
                    <div className="text-[10px] text-amber-700 font-mono">{row.year}</div>
                  </td>
                  <td className="py-4 px-4 text-stone-700 font-medium">{row.analyst}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
                      {row.bloodType}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-amber-900">{row.tissue}</td>
                  <td className="py-4 px-4 text-stone-600 font-medium">{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Box */}
      <div className="sacred-glass rounded-3xl p-8 sm:p-12 text-center border border-amber-300 space-y-6 shadow-xl bg-gradient-to-b from-amber-50 to-[#FFFDF5]">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          From Scientific Truth to Personal Encounter
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed font-medium">
          The scientific data confirms what the Catholic Church has proclaimed for 2,000 years: Jesus Christ is truly, really, and physically present in the Eucharist.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/return-home"
            className="gold-button px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            <span>Begin Your Journey Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/miracles"
            className="px-6 py-3.5 rounded-xl text-xs font-bold text-amber-950 bg-white border border-amber-300 hover:bg-amber-100 transition-colors shadow-sm"
          >
            <span>Explore All Miracles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

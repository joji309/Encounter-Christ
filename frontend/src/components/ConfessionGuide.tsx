'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, HeartHandshake, Shield, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface ExaminationItem {
  commandment: string;
  questions: string[];
}

export default function ConfessionGuide() {
  const [activeTab, setActiveTab] = useState<'EXAMINATION' | 'STEP_BY_STEP' | 'ACT_OF_CONTRITION'>('STEP_BY_STEP');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (q: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(q)) next.delete(q);
      else next.add(q);
      return next;
    });
  };

  const examinationData: ExaminationItem[] = [
    {
      commandment: "1. Love the Lord your God with all your heart",
      questions: [
        "Have I neglected daily prayer or put money, career, or technology before God?",
        "Have I engaged in occult practices, horoscopes, or superstitious activities?",
        "Have I harbored resentment or anger against God during difficult trials?"
      ]
    },
    {
      commandment: "2. Do not take the Name of the Lord in vain",
      questions: [
        "Have I used the Holy Name of Jesus or God carelessly, in anger, or as a curse word?",
        "Have I made false promises or sworn oaths in God's name?"
      ]
    },
    {
      commandment: "3. Keep holy the Sabbath Day",
      questions: [
        "Have I missed Holy Mass on Sundays or Holy Days of Obligation through my own fault?",
        "Have I engaged in unnecessary servile work or distractions on Sunday instead of resting in God?"
      ]
    },
    {
      commandment: "4. Honor your father and mother",
      questions: [
        "Have I shown disrespect, bitterness, or neglect toward my parents or elders?",
        "Have I neglected my duties to care for and love my family members?"
      ]
    },
    {
      commandment: "5. You shall not kill / Anger and Hatred",
      questions: [
        "Have I harbored hatred, unforgiveness, or grudges in my heart against anyone?",
        "Have I harmed myself or others through substance abuse, violence, or reckless anger?",
        "Have I supported or encouraged abortion or euthanasia?"
      ]
    },
    {
      commandment: "6 & 9. Purity of Body and Mind",
      questions: [
        "Have I viewed pornography, indulged in unchaste thoughts, or engaged in sexual activity outside of Holy Matrimony?",
        "Have I treated others as objects rather than children of God?"
      ]
    },
    {
      commandment: "7 & 10. Honesty, Integrity and Contentment",
      questions: [
        "Have I stolen, cheated in business or school, or failed to repay debts?",
        "Have I been consumed by jealousy, envy, or greed over what others possess?"
      ]
    },
    {
      commandment: "8. Truth and Charity in Speech",
      questions: [
        "Have I lied, gossiped, spread rumors, or damaged someone's reputation?",
        "Have I been hypocritical or failed to defend the truth when needed?"
      ]
    }
  ];

  return (
    <div className="sacred-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-amber-300 shadow-xl bg-white/95">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left border-b border-amber-200 pb-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
          <HeartHandshake className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Reconciliation & Examination of Conscience
          </h3>
          <p className="text-xs text-stone-600 font-medium">
            &ldquo;Though your sins are like scarlet, they shall be as white as snow.&rdquo; — Isaiah 1:18
          </p>
        </div>
      </div>

      {/* Navigation Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-amber-50 rounded-2xl border border-amber-200">
        <button
          onClick={() => setActiveTab('STEP_BY_STEP')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'STEP_BY_STEP'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-stone-700 hover:text-amber-900'
          }`}
        >
          1. Step-by-Step Confession Guide
        </button>
        <button
          onClick={() => setActiveTab('EXAMINATION')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'EXAMINATION'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-stone-700 hover:text-amber-900'
          }`}
        >
          2. Interactive Examination ({checkedItems.size} reflected)
        </button>
        <button
          onClick={() => setActiveTab('ACT_OF_CONTRITION')}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ACT_OF_CONTRITION'
              ? 'bg-amber-500 text-white shadow-md'
              : 'text-stone-700 hover:text-amber-900'
          }`}
        >
          3. Act of Contrition Prayer
        </button>
      </div>

      {/* Tab 1: Step by step walkthrough for returning Catholics */}
      {activeTab === 'STEP_BY_STEP' && (
        <div className="space-y-6">
          <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-5 text-xs text-amber-950 leading-relaxed font-medium">
            <span className="font-bold text-amber-900 block mb-1">Been away from church for 5, 10, or 20+ years?</span>
            Do not be afraid! The priest will not judge or be angry with you. In fact, priests celebrate when someone returns home. Simply tell him at the start: <em>&ldquo;Father, it has been many years since my last confession, and I need you to help me through.&rdquo;</em> He will guide you every step of the way.
          </div>

          <div className="space-y-4">
            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
              <span className="text-amber-700 font-mono text-xs font-bold tracking-wider">STEP 1: ENTER & GREETING</span>
              <p className="text-xs text-stone-800 leading-relaxed">
                Enter the confessional or reconciliation room. You can choose to kneel behind the privacy screen or sit face-to-face. Make the Sign of the Cross:
              </p>
              <div className="p-3 bg-white rounded-xl text-amber-900 font-serif text-xs border border-amber-200 shadow-sm font-semibold">
                &ldquo;In the Name of the Father, and of the Son, and of the Holy Spirit. Amen. Bless me Father, for I have sinned. It has been [weeks/months/years] since my last confession.&rdquo;
              </div>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
              <span className="text-amber-700 font-mono text-xs font-bold tracking-wider">STEP 2: CONFESS YOUR SINS SINCERELY</span>
              <p className="text-xs text-stone-800 leading-relaxed">
                State your sins simply, honestly, and without holding anything back in fear. You don&apos;t need lengthy explanations; just state the kind of sin and approximate frequency (e.g., &ldquo;I missed Sunday Mass several times&rdquo;, &ldquo;I struggled with anger and unchaste thoughts&rdquo;).
              </p>
              <p className="text-xs text-stone-600">
                End with: <em>&ldquo;For these and all the sins of my past life that I cannot remember, I am truly sorry.&rdquo;</em>
              </p>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
              <span className="text-amber-700 font-mono text-xs font-bold tracking-wider">STEP 3: COUNSEL & PENANCE</span>
              <p className="text-xs text-stone-800 leading-relaxed">
                The priest may give words of encouragement and will give you a penance (often a few prayers like an Our Father or Hail Mary, or an act of charity).
              </p>
            </div>

            <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
              <span className="text-amber-700 font-mono text-xs font-bold tracking-wider">STEP 4: ACT OF CONTRITION & ABSOLUTION</span>
              <p className="text-xs text-stone-800 leading-relaxed">
                The priest will ask you to recite an Act of Contrition (see Tab 3). He will then extend his hand and speak the words of Absolution:
              </p>
              <div className="p-3 bg-white rounded-xl text-emerald-800 font-serif text-xs border border-emerald-300 shadow-sm font-semibold">
                &ldquo;...And I absolve you from your sins in the name of the Father, and of the Son, and of the Holy Spirit.&rdquo;
              </div>
              <p className="text-xs text-stone-700">
                You respond: <strong className="text-amber-700">&ldquo;Amen!&rdquo;</strong> You walk out completely washed clean, forgiven, and restored in God&apos;s grace.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Examination */}
      {activeTab === 'EXAMINATION' && (
        <div className="space-y-6">
          <p className="text-xs text-stone-700 font-medium">
            Read through the prompts below in prayerful reflection. You can click on the checkboxes as a personal reminder of what you wish to bring to the Lord in Confession.
          </p>

          <div className="space-y-4">
            {examinationData.map((item, idx) => (
              <div key={idx} className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-3">
                <h4 className="font-serif font-bold text-sm text-amber-900">
                  {item.commandment}
                </h4>
                <div className="space-y-2">
                  {item.questions.map((q, qIdx) => {
                    const isChecked = checkedItems.has(q);
                    return (
                      <button
                        key={qIdx}
                        onClick={() => toggleCheck(q)}
                        className="w-full flex items-start gap-3 text-left p-2 rounded-xl hover:bg-white transition-colors"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-xs leading-relaxed ${isChecked ? 'text-amber-900 font-bold' : 'text-stone-700'}`}>
                          {q}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Act of Contrition */}
      {activeTab === 'ACT_OF_CONTRITION' && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-300 space-y-4">
            <h4 className="font-serif font-bold text-base text-amber-800">
              Traditional Act of Contrition
            </h4>
            <p className="font-serif text-sm text-stone-900 leading-loose italic font-medium">
              &ldquo;O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, Who art all-good and deserving of all my love.
              <br /><br />
              I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.&rdquo;
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-3 shadow-sm">
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Alternative Short Act of Contrition
            </h4>
            <p className="font-serif text-xs text-stone-700 leading-relaxed italic">
              &ldquo;Lord Jesus, Son of the Living God, have mercy on me, a sinner. Wash me clean, heal my soul, and lead me in Your holy way. Amen.&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

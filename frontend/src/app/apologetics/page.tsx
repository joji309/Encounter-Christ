import React from 'react';
import { BookOpen, Sparkles, Scroll, Quote, CheckCircle2, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Catholic Faith Answers & The Real Presence in Scripture | Encounter Christ',
  description: 'Explore biblical apologetics, Church Fathers quotes from 100 AD to 400 AD, and answers to common questions about the Eucharist and Confession.',
};

export default function ApologeticsPage() {
  const topics = [
    {
      question: 'Is the Eucharist merely a symbol or the Real Presence of Jesus?',
      category: 'The Real Presence',
      badge: 'Biblical & Patristic',
      answer: 'The Catholic Church teaches dogmatically that Jesus Christ is truly, really, and substantially present—Body, Blood, Soul, and Divinity—under the appearances of bread and wine.',
      biblicalPassages: [
        'John 6:51-58: "My flesh is true food, and my blood is true drink... Whoever feeds on this bread will live forever."',
        'Matthew 26:26-28: "Take, eat; this IS my body... Drink of it, all of you, for this IS my blood of the covenant."',
        '1 Corinthians 10:16: "The cup of blessing that we bless, is it not a participation in the blood of Christ? The bread that we break, is it not a participation in the body of Christ?"',
        '1 Corinthians 11:27: "Whoever, therefore, eats the bread or drinks the cup of the Lord in an unworthy manner will be guilty concerning the body and blood of the Lord."'
      ],
      churchFather: {
        saint: 'St. Ignatius of Antioch (AD 110)',
        context: 'Disciple of St. John the Apostle and Bishop of Antioch',
        quote: 'They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again.'
      }
    },
    {
      question: 'Why do Catholics confess their sins to a priest instead of praying directly to God?',
      category: 'The Sacraments',
      badge: 'Biblical Institution',
      answer: 'Because Jesus Christ explicitly instituted this sacrament on Easter Sunday night, breathing the Holy Spirit upon His Apostles and investing them with His authority to forgive or retain sins in His Name.',
      biblicalPassages: [
        'John 20:22-23: "Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained."',
        'James 5:16: "Therefore, confess your sins to one another and pray for one another, that you may be healed."',
        '2 Corinthians 5:18-20: "All this is from God, who through Christ reconciled us to himself and gave us the ministry of reconciliation."'
      ],
      churchFather: {
        saint: 'St. Cyprian of Carthage (AD 250)',
        context: 'Early North African Bishop and Martyr',
        quote: 'Let each one confess his fault while he is still in this world, while his confession can be admitted, while the satisfaction and remission made through the priests are pleasing before the Lord.'
      }
    },
    {
      question: 'What did the earliest Christians believe about the Holy Mass in the 1st and 2nd centuries?',
      category: 'Early Church History',
      badge: 'Apostolic Tradition',
      answer: 'Every recorded document of the Early Church—from Rome to Antioch, Egypt, and Gaul—proves that the early Christians celebrated the exact liturgical structure of the Mass (Scripture readings, homily, intercessions, Eucharistic prayer of consecration, and distribution of the Real Body and Blood).',
      biblicalPassages: [
        'Acts 2:42: "And they devoted themselves to the apostles\' teaching and the fellowship, to the breaking of bread and the prayers."',
        'Malachi 1:11: "For from the rising of the sun to its setting my name will be great among the nations, and in every place incense will be offered to my name, and a pure offering."'
      ],
      churchFather: {
        saint: 'St. Justin Martyr (AD 155)',
        context: 'Philosopher and Martyr in Rome, writing to the Roman Emperor Antoninus Pius',
        quote: 'For not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Saviour, having been made flesh by the Word of God... we have been taught that the food which is blessed by the prayer of His word is the flesh and blood of that Jesus who was made flesh.'
      }
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" /> Scripture & Sacred Tradition
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Catholic Faith & Apologetics
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
          Discover why 2,000 years of Catholic teaching on the Real Presence of Jesus Christ is rooted in Holy Scripture and corroborated by the earliest disciples of the Apostles.
        </p>
      </div>

      {/* Topics List */}
      <div className="space-y-8">
        {topics.map((topic, idx) => (
          <div key={idx} className="sacred-glass-card rounded-3xl p-6 sm:p-10 space-y-6 border border-amber-300 shadow-xl bg-white">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
                {topic.category}
              </span>
              <span className="text-[11px] font-mono text-stone-500 font-bold">
                {topic.badge}
              </span>
            </div>

            {/* Question */}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {topic.question}
            </h2>

            {/* Answer */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
              {topic.answer}
            </div>

            {/* Biblical Citations */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-xs text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Biblical Foundations
              </h4>
              <div className="space-y-2">
                {topic.biblicalPassages.map((verse, vIdx) => (
                  <div key={vIdx} className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200 text-xs text-stone-800 font-serif italic font-medium">
                    {verse}
                  </div>
                ))}
              </div>
            </div>

            {/* Early Church Father Quote */}
            <div className="bg-amber-100/70 border border-amber-300 p-5 rounded-2xl space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-amber-900 font-bold">
                <Quote className="w-4 h-4 text-amber-700" />
                <span>Voice of the Early Church: {topic.churchFather.saint}</span>
              </div>
              <p className="text-[11px] text-amber-800 font-mono font-semibold">
                {topic.churchFather.context}
              </p>
              <blockquote className="font-serif italic text-xs sm:text-sm text-stone-900 leading-relaxed pt-1 font-medium">
                &ldquo;{topic.churchFather.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

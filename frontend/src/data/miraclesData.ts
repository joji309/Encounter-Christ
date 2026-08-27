export interface Miracle {
  id: number;
  title: string;
  slug: string;
  category_name?: string;
  location_city: string;
  location_country: string;
  year_occurred: string;
  century: string;
  latitude?: number;
  longitude?: number;
  cover_image_url: string;
  relic_image_url?: string;
  summary: string;
  full_story?: string;
  scientific_summary: string;
  blood_type: string;
  tissue_type: string;
  white_blood_cells_present: boolean;
  forensic_lead_scientist?: string;
  scientific_notes?: string;
  church_approval: 'VATICAN' | 'DIOCESAN' | 'HISTORICAL';
  key_spiritual_message?: string;
  scripture_verse?: string;
  is_featured: boolean;
  views_count?: number;
}

export interface PrayerIntention {
  id: number;
  name: string;
  location?: string;
  category: string;
  category_display?: string;
  intention_text: string;
  is_candle_lit: boolean;
  prayers_count: number;
  created_at: string;
}

export interface DailyReflection {
  id: number;
  date: string;
  title: string;
  scripture_reference: string;
  scripture_text: string;
  saint_name: string;
  saint_feast_or_title?: string;
  saint_quote: string;
  reflection_body: string;
  closing_prayer: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  category: string;
  category_display?: string;
  is_published?: boolean;
}

export interface ApologeticsTopic {
  id: number;
  question: string;
  slug: string;
  category: string;
  category_display?: string;
  short_answer: string;
  detailed_explanation: string;
  scripture_citations?: string;
  church_fathers_quote?: string;
}

export const INITIAL_MIRACLES: Miracle[] = [
  {
    id: 1,
    title: "Eucharistic Miracle of Buenos Aires",
    slug: "buenos-aires-argentina-1996",
    category_name: "Forensically Analyzed",
    location_city: "Buenos Aires",
    location_country: "Argentina",
    year_occurred: "1996",
    century: "20th Century (1996)",
    latitude: -34.603722,
    longitude: -58.381592,
    cover_image_url: "https://images.unsplash.com/photo-1548625361-195fe578b871?auto=format&fit=crop&w=1200&q=80",
    summary: "A discarded host in the Church of Santa Maria turned into living heart tissue under the oversight of Cardinal Jorge Bergoglio (now Pope Francis). Blind testing at Columbia University confirmed living cardiac muscle.",
    full_story: "On August 18, 1996, at 7:00 PM, at the parish church of Santa Maria in Buenos Aires, a consecrated Host was found discarded at the back of the church. The priest placed it in a vessel of water and placed it in the tabernacle. Eight days later, when opened, the Host had transformed into bleeding flesh that had grown significantly. Cardinal Jorge Bergoglio commissioned high-precision photographs and later authorized scientific testing. In 1999, Dr. Ricardo Castañón took samples to New York for blind analysis without disclosing their origin.",
    scientific_summary: "Blind analysis by world-renowned cardiologist and forensic pathologist Dr. Frederic Zugibe (Columbia University) identified the sample as human myocardium (left ventricle) that was alive at the moment of sampling, showing active white blood cell infiltration characteristic of severe cardiac trauma.",
    blood_type: "AB Positive",
    tissue_type: "Left Ventricular Myocardium (Heart Muscle)",
    white_blood_cells_present: true,
    forensic_lead_scientist: "Dr. Frederic Zugibe (Columbia University) & Dr. Ricardo Castañón",
    scientific_notes: 'Dr. Zugibe noted: "The analyzed material is a fragment of the heart muscle taken from the wall of the left ventricle close to the valves... The white blood cells had penetrated the tissue, which indicates the heart was living and under severe trauma when the sample was taken."',
    church_approval: "VATICAN",
    key_spiritual_message: "Christ presents His very heart, beaten and suffering out of love for humanity, alive within the Sacrament.",
    scripture_verse: "John 6:51 - 'I am the living bread that came down from heaven. If anyone eats of this bread, he will live forever.'",
    is_featured: true,
    views_count: 1420
  },
  {
    id: 2,
    title: "Eucharistic Miracle of Lanciano",
    slug: "lanciano-italy-750-ad",
    category_name: "Ancient & Medieval",
    location_city: "Lanciano",
    location_country: "Italy",
    year_occurred: "750 AD",
    century: "8th Century (750 AD)",
    latitude: 42.2289,
    longitude: 14.3905,
    cover_image_url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
    summary: "The oldest and most thoroughly examined Eucharistic miracle. A Basilian monk doubting the Real Presence saw the Host turn to visible flesh and the wine into five clots of blood. Over 1,250 years later, the flesh and blood remain uncorrupted without preservatives.",
    full_story: "In the 8th century in Lanciano, Italy, a monk of the Order of St. Basil experienced severe doubts about whether the bread and wine truly became the Body and Blood of Jesus Christ during Mass. While celebrating, after pronouncing the words of consecration, he saw the bread visibly transform into living Flesh, and the wine into five distinct clots of Blood. The weeping priest showed the congregation the miracle, preserved to this day.",
    scientific_summary: "In 1970–1971, Dr. Odoardo Linoli, Professor of Anatomy and Pathological Histology, conducted complete scientific examinations. He concluded the flesh is authentic cardiac muscular tissue (myocardium) containing blood proteins in the exact proportions of fresh human blood.",
    blood_type: "AB Positive",
    tissue_type: "Endocardium and Myocardium (Human Heart)",
    white_blood_cells_present: true,
    forensic_lead_scientist: "Prof. Dr. Odoardo Linoli & Prof. Ruggero Bertelli (Univ. of Siena)",
    scientific_notes: "A scientific commission appointed by the World Health Organization (WHO) and United Nations in 1973 conducted 500 laboratory examinations over 15 months and completely confirmed Prof. Linoli's findings.",
    church_approval: "VATICAN",
    key_spiritual_message: "The eternal continuity of Christ's sacrifice—flesh and blood preserved across 13 centuries without chemical preservatives.",
    scripture_verse: "Luke 22:19 - 'This is my body which is given for you. Do this in remembrance of me.'",
    is_featured: true,
    views_count: 2890
  },
  {
    id: 3,
    title: "Eucharistic Miracle of Legnica",
    slug: "legnica-poland-2013",
    category_name: "21st Century Miracles",
    location_city: "Legnica",
    location_country: "Poland",
    year_occurred: "2013",
    century: "21st Century (2013)",
    latitude: 51.2070,
    longitude: 16.1550,
    cover_image_url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80",
    summary: "On Christmas Day 2013, a consecrated host fell during communion at St. Hyacinth Church. Placed in water, it developed red stains. Forensics verified human myocardial tissue with alterations characteristic of agony.",
    full_story: "On December 25, 2013, at the Church of Saint Hyacinth in Legnica, Poland, a Host fell during Holy Communion. Placed in water in accordance with church rubrics, red discolorations appeared shortly afterward. In 2014, samples were sent to the Department of Forensic Medicine in Szczecin and Wrocław.",
    scientific_summary: 'The Department of Forensic Medicine officially reported: "In the histopathological image, the fragments of tissue have been found containing the fragmented parts of the cross-striated muscle... The whole image is most similar to the heart muscle with alterations that often appear during the agony."',
    blood_type: "AB Positive",
    tissue_type: "Human Heart Muscle (Agonizing State)",
    white_blood_cells_present: true,
    forensic_lead_scientist: "Department of Forensic Medicine, Pomeranian Medical University",
    scientific_notes: "Genetic testing determined the DNA was of human origin. Bishop Zbigniew Kiernikowski approved the public veneration of the relic in April 2016.",
    church_approval: "VATICAN",
    key_spiritual_message: "Christ's agony on Calvary is mystically and truly present in every Holy Mass.",
    scripture_verse: "1 Corinthians 11:24 - 'This is my body, which is for you; do this in remembrance of me.'",
    is_featured: true,
    views_count: 1870
  },
  {
    id: 4,
    title: "Eucharistic Miracle of Sokółka",
    slug: "sokolka-poland-2008",
    category_name: "21st Century Miracles",
    location_city: "Sokółka",
    location_country: "Poland",
    year_occurred: "2008",
    century: "21st Century (2008)",
    latitude: 53.4072,
    longitude: 23.5033,
    cover_image_url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
    summary: "At St. Anthony of Padua Church in Sokółka, a dropped host developed a bright red clot. Two leading histopathologists confirmed that the heart muscle fibers were inextricably woven into the bread structure on a microscopic level—a physical impossibility through human manipulation.",
    full_story: "On October 12, 2008, during Mass at Saint Anthony's parish church in Sokółka, a dropped Host placed in water developed an intensely red clot. Two world-respected specialists in pathological anatomy carried out independent histological investigations.",
    scientific_summary: "Microscopic examination revealed that the cardiac muscle fibers and the structure of the wheat flour host were deeply intertwined and bonded together at the cellular level. No known scientific technique or adhesive can interlace living heart fibers with bread in this manner.",
    blood_type: "AB Positive",
    tissue_type: "Myocardium (Cardiac Muscle intertwined with wheat matrix)",
    white_blood_cells_present: true,
    forensic_lead_scientist: "Prof. Maria Sobaniec-Łotowska & Prof. Stanisław Sulkowski",
    scientific_notes: "Both professors independently affirmed that the tissue was living human myocardial tissue showing signs of pre-mortem spasms and suffering.",
    church_approval: "DIOCESAN",
    key_spiritual_message: "The Holy Eucharist is not a symbol; it is the real, loving Heart of our Redeemer beating for our salvation.",
    scripture_verse: "John 6:55 - 'For my flesh is true food, and my blood is true drink.'",
    is_featured: true,
    views_count: 2130
  },
  {
    id: 5,
    title: "Eucharistic Miracle of Tixtla",
    slug: "tixtla-mexico-2006",
    category_name: "Forensically Analyzed",
    location_city: "Tixtla",
    location_country: "Mexico",
    year_occurred: "2006",
    century: "21st Century (2006)",
    latitude: 17.5684,
    longitude: -99.3986,
    cover_image_url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80",
    summary: "During a parish retreat in Tixtla, Mexico, a host began exuding a reddish liquid. Multi-year forensic analysis by international scientific teams showed that the blood emanated from the interior of the host and contained intact, living cells.",
    full_story: "On October 21, 2006, during a parish retreat at Saint Martin of Tours in Tixtla, a nun noticed that one Host in the ciborium had begun effusing a reddish fluid. Bishop Alejo Zavala Castro initiated an ecclesiastical commission to assemble an international scientific team.",
    scientific_summary: "Forensic pathology revealed human blood of group AB with intact red and white blood cells and pulsating cardiac tissue originating from the interior of the Host.",
    blood_type: "AB Positive",
    tissue_type: "Myocardium with active leukocytes",
    white_blood_cells_present: true,
    forensic_lead_scientist: "Dr. Ricardo Castañón Gómez & International Forensic Team",
    scientific_notes: "Immunohistochemical testing showed that the blood originated from within the host rather than being applied externally. Living white blood cells were active despite years in ambient storage.",
    church_approval: "DIOCESAN",
    key_spiritual_message: "Jesus is truly with us in our contemporary world, calling every soul to repentance and divine intimacy.",
    scripture_verse: "Matthew 28:20 - 'And behold, I am with you always, until the end of the age.'",
    is_featured: false,
    views_count: 980
  }
];

export const INITIAL_PRAYERS: PrayerIntention[] = [
  {
    id: 1,
    name: "Maria S.",
    location: "Texas, USA",
    category: "FAITH_RETURN",
    category_display: "Return to Faith & Family",
    intention_text: "Please pray for my son Michael who stopped going to church after college. May he encounter Jesus in the Blessed Sacrament and return to the fullness of the Catholic faith.",
    is_candle_lit: true,
    prayers_count: 42,
    created_at: "2 hours ago"
  },
  {
    id: 2,
    name: "David & Grace",
    location: "London, UK",
    category: "FAMILY",
    category_display: "Marriage & Family Peace",
    intention_text: "For reconciliation and healing in our marriage, and for our children to grow up loving the Holy Eucharist.",
    is_candle_lit: true,
    prayers_count: 28,
    created_at: "5 hours ago"
  },
  {
    id: 3,
    name: "Sister Clara",
    location: "Kerala, India",
    category: "VOCATIONS",
    category_display: "Priesthood & Religious Life",
    intention_text: "For young men and women discerning holy vocations to the priesthood and religious life, that they may say 'Yes' to Christ's call.",
    is_candle_lit: true,
    prayers_count: 67,
    created_at: "1 day ago"
  },
  {
    id: 4,
    name: "John P.",
    location: "Sydney, Australia",
    category: "HEALING",
    category_display: "Physical & Mental Healing",
    intention_text: "For my father fighting stage 4 cancer. May Jesus, the Divine Physician present in the Holy Eucharist, grant him comfort and healing.",
    is_candle_lit: true,
    prayers_count: 95,
    created_at: "2 days ago"
  }
];

export const INITIAL_DAILY_REFLECTION: DailyReflection = {
  id: 1,
  date: "Today's Sacred Meditation",
  title: "The Living Heart in the Monstrance",
  scripture_reference: "John 6:35",
  scripture_text: "Jesus said to them, 'I am the bread of life; whoever comes to me shall not hunger, and whoever believes in me shall never thirst.'",
  saint_name: "St. Peter Julian Eymard",
  saint_feast_or_title: "Apostle of the Holy Eucharist",
  saint_quote: "How kind is our Sacramental Jesus! He welcomes you at any hour of the day or night. His Love knows no exhaustion. He is always in the tabernacle, waiting with open arms to heal your heart.",
  reflection_body: "When we kneel before the Blessed Sacrament, we are not looking at a metaphor. We are in the physical, living presence of the Creator of the Universe, who loved us to the point of giving His life on the Cross and remaining with us in humble bread until the end of time. When doubts cloud your heart, look at the scientific realities of Lanciano and Buenos Aires—Christ's heart still beats with boundless mercy for you.",
  closing_prayer: "O Jesus, Present in the Most Blessed Sacrament, I believe in You, I adore You, I hope in You, and I love You with all my heart. Draw me close to Your Sacred Heart today. Amen."
};

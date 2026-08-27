import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Category, Miracle, PrayerIntention, Testimony, DailyReflection, ApologeticsTopic, Event


class Command(BaseCommand):
    help = 'Seeds initial Eucharistic Miracles, apologetics, reflections, and prayers'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting database seeding...")

        # 1. Categories
        cat_scientific, _ = Category.objects.get_or_create(
            slug='forensically-analyzed',
            defaults={
                'name': 'Forensically Analyzed',
                'description': 'Miracles subjected to rigorous 20th and 21st century laboratory and histological testing.',
                'icon': 'Microscope'
            }
        )
        cat_ancient, _ = Category.objects.get_or_create(
            slug='ancient-miracles',
            defaults={
                'name': 'Ancient & Medieval',
                'description': 'Historical miracles preserved over centuries, venerated by millions of saints and popes.',
                'icon': 'Scroll'
            }
        )
        cat_modern, _ = Category.objects.get_or_create(
            slug='modern-miracles',
            defaults={
                'name': '21st Century Miracles',
                'description': 'Recent Eucharistic transformations in Poland, Mexico, and South America.',
                'icon': 'Sparkles'
            }
        )

        # 2. Miracles
        miracles_data = [
            {
                'title': 'Eucharistic Miracle of Buenos Aires',
                'slug': 'buenos-aires-argentina-1996',
                'category': cat_scientific,
                'location_city': 'Buenos Aires',
                'location_country': 'Argentina',
                'year_occurred': '1996',
                'century': '20th Century (1996)',
                'latitude': -34.603722,
                'longitude': -58.381592,
                'cover_image_url': 'https://images.unsplash.com/photo-1548625361-195fe578b871?auto=format&fit=crop&w=1200&q=80',
                'summary': 'A discarded host in the Church of Santa Maria turned into living heart tissue under the oversight of Cardinal Jorge Bergoglio (now Pope Francis). Blind testing at Columbia University confirmed living cardiac muscle.',
                'full_story': """On August 18, 1996, at 7:00 PM, at the parish church of Santa Maria in Buenos Aires, a consecrated Host was found discarded at the back of the church. The priest placed it in a vessel of water and placed it in the tabernacle.

Eight days later, on August 26, when the tabernacle was opened, the Host had transformed into a fragment of bleeding flesh that had grown significantly. The incident was reported to Cardinal Jorge Bergoglio (now Pope Francis), who commissioned high-precision photographs and later authorized forensic investigation.

In 1999, Dr. Ricardo Castañón Gómez took samples to New York for blind analysis without disclosing their origin to researchers.""",
                'scientific_summary': 'Blind analysis by world-renowned cardiologist and forensic pathologist Dr. Frederic Zugibe (Columbia University) identified the sample as human myocardium (left ventricle) that was alive at the moment of sampling, showing active white blood cell infiltration characteristic of severe cardiac trauma.',
                'blood_type': 'AB Positive',
                'tissue_type': 'Left Ventricular Myocardium (Heart Muscle)',
                'white_blood_cells_present': True,
                'forensic_lead_scientist': 'Dr. Frederic Zugibe (Columbia University) & Dr. Ricardo Castañón',
                'scientific_notes': 'Dr. Zugibe noted: "The analyzed material is a fragment of the heart muscle taken from the wall of the left ventricle close to the valves... The white blood cells had penetrated the tissue, which indicates the heart was living and under severe trauma when the sample was taken."',
                'church_approval': 'VATICAN',
                'key_spiritual_message': 'Christ presents His very heart, beaten and suffering out of love for humanity, alive within the Sacrament.',
                'scripture_verse': 'John 6:51 - "I am the living bread that came down from heaven. If anyone eats of this bread, he will live forever."',
                'is_featured': True,
            },
            {
                'title': 'Eucharistic Miracle of Lanciano',
                'slug': 'lanciano-italy-750-ad',
                'category': cat_ancient,
                'location_city': 'Lanciano',
                'location_country': 'Italy',
                'year_occurred': '750 AD',
                'century': '8th Century (750 AD)',
                'latitude': 42.2289,
                'longitude': 14.3905,
                'cover_image_url': 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
                'summary': 'The oldest and most thoroughly examined Eucharistic miracle. A Basilian monk doubting the Real Presence saw the Host turn to visible flesh and the wine into five clots of blood. Over 1,250 years later, the flesh and blood remain uncorrupted without preservatives.',
                'full_story': """In the 8th century in Lanciano, Italy, a monk of the Order of St. Basil experienced severe doubts about whether the bread and wine truly became the Body and Blood of Jesus Christ during the Holy Sacrifice of the Mass.

One morning, while celebrating Mass, after pronouncing the words of consecration, he saw the bread visibly transform into living Flesh, and the wine into five distinct clots of Blood. The trembling priest wept with joy and called the congregation to witness the miracle.""",
                'scientific_summary': 'In 1970–1971, Dr. Odoardo Linoli, Professor of Anatomy and Pathological Histology, conducted a complete scientific examination. He concluded the flesh is authentic cardiac muscular tissue (myocardium) containing blood proteins in the exact proportions of fresh human blood.',
                'blood_type': 'AB Positive',
                'tissue_type': 'Endocardium and Myocardium (Human Heart)',
                'white_blood_cells_present': True,
                'forensic_lead_scientist': 'Prof. Dr. Odoardo Linoli (Chief Physician of Arezzo Hospital) & Prof. Ruggero Bertelli (Univ. of Siena)',
                'scientific_notes': 'A scientific commission appointed by the World Health Organization (WHO) and United Nations in 1973 conducted 500 laboratory examinations over 15 months and completely confirmed Prof. Linoli’s findings.',
                'church_approval': 'VATICAN',
                'key_spiritual_message': 'The eternal continuity of Christ\'s sacrifice—flesh and blood preserved across 13 centuries without chemical preservatives.',
                'scripture_verse': 'Luke 22:19 - "This is my body which is given for you. Do this in remembrance of me."',
                'is_featured': True,
            },
            {
                'title': 'Eucharistic Miracle of Legnica',
                'slug': 'legnica-poland-2013',
                'category': cat_modern,
                'location_city': 'Legnica',
                'location_country': 'Poland',
                'year_occurred': '2013',
                'century': '21st Century (2013)',
                'latitude': 51.2070,
                'longitude': 16.1550,
                'cover_image_url': 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=1200&q=80',
                'summary': 'On Christmas Day 2013, a consecrated host fell during communion at St. Hyacinth Church. Placed in water, it developed red stains. Forensic medicine departments found striated heart muscle in agony.',
                'full_story': """On December 25, 2013, at the Church of Saint Hyacinth in Legnica, Poland, a Host fell on the floor during the distribution of Holy Communion. In accordance with church rubrics, the priest picked it up and placed it in a container with water.

Shortly afterward, red discolorations appeared. In January 2014, the Bishop formed a special commission to study the phenomenon. Samples were sent to the Department of Forensic Medicine in Szczecin and Wrocław.""",
                'scientific_summary': 'The Department of Forensic Medicine officially reported: "In the histopathological image, the fragments of tissue have been found containing the fragmented parts of the cross-striated muscle... The whole image is most similar to the heart muscle with alterations that often appear during the agony."',
                'blood_type': 'AB Positive',
                'tissue_type': 'Human Heart Muscle (Agonizing State)',
                'white_blood_cells_present': True,
                'forensic_lead_scientist': 'Department of Forensic Medicine, Pomeranian Medical University',
                'scientific_notes': 'Genetic testing determined the DNA was of human origin. Bishop Zbigniew Kiernikowski approved the public veneration of the relic in April 2016 following Vatican notification.',
                'church_approval': 'VATICAN',
                'key_spiritual_message': 'Christ\'s agony on Calvary is mystically and truly present in every Holy Mass.',
                'scripture_verse': '1 Corinthians 11:24 - "This is my body, which is for you; do this in remembrance of me."',
                'is_featured': True,
            },
            {
                'title': 'Eucharistic Miracle of Sokółka',
                'slug': 'sokolka-poland-2008',
                'category': cat_modern,
                'location_city': 'Sokółka',
                'location_country': 'Poland',
                'year_occurred': '2008',
                'century': '21st Century (2008)',
                'latitude': 53.4072,
                'longitude': 23.5033,
                'cover_image_url': 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
                'summary': 'At St. Anthony of Padua Church in Sokółka, a dropped host developed a bright red clot. Two leading histopathologists confirmed that the heart muscle fibers were inextricably woven into the bread structure on a microscopic level—a physical impossibility through human manipulation.',
                'full_story': """On October 12, 2008, during Mass at Saint Anthony’s parish church in Sokółka, a priest dropped a consecrated Host. It was picked up and placed into a small container of water in the sacristy safe.

On October 19, when Sister Julia Dubowska opened the safe, she discovered that the Host was partially dissolved, with an intensely red, blood-like clot in the center.

Two world-respected specialists in pathological anatomy—Prof. Maria Sobaniec-Łotowska and Prof. Stanisław Sulkowski of the Medical University of Białystok—carried out independent histological investigations.""",
                'scientific_summary': 'Microscopic examination revealed that the cardiac muscle fibers and the structure of the wheat flour host were deeply intertwined and bonded together at the cellular level. No known scientific technique or adhesive can interlace living heart fibers with bread in this manner.',
                'blood_type': 'AB Positive',
                'tissue_type': 'Myocardium (Cardiac Muscle intertwined with wheat matrix)',
                'white_blood_cells_present': True,
                'forensic_lead_scientist': 'Prof. Maria Sobaniec-Łotowska & Prof. Stanisław Sulkowski',
                'scientific_notes': 'Both professors independently affirmed that the tissue was living human myocardial tissue showing signs of pre-mortem spasms and suffering.',
                'church_approval': 'DIOCESAN',
                'key_spiritual_message': 'The Holy Eucharist is not a symbol; it is the real, loving Heart of our Redeemer beating for our salvation.',
                'scripture_verse': 'John 6:55 - "For my flesh is true food, and my blood is true drink."',
                'is_featured': True,
            },
            {
                'title': 'Eucharistic Miracle of Tixtla',
                'slug': 'tixtla-mexico-2006',
                'category': cat_scientific,
                'location_city': 'Tixtla',
                'location_country': 'Mexico',
                'year_occurred': '2006',
                'century': '21st Century (2006)',
                'latitude': 17.5684,
                'longitude': -99.3986,
                'cover_image_url': 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
                'summary': 'During a parish retreat in Tixtla, Mexico, a host began exuding a reddish liquid. Multi-year forensic analysis by international scientific teams showed that the blood emanated from the interior of the host and contained intact, living cells.',
                'full_story': """On October 21, 2006, during a parish retreat at Saint Martin of Tours in Tixtla, Diocese of Chilpancingo-Chilapa, a nun was distributing communion when she noticed that one Host in the ciborium had begun effusing a reddish fluid.

Bishop Alejo Zavala Castro initiated an ecclesiastical commission and invited Dr. Ricardo Castañón Gómez to assemble a multidisciplinary scientific team to study the phenomenon.""",
                'scientific_summary': 'Forensic pathology revealed that the reddish substance was human blood of group AB. Microscopic analysis showed the presence of intact red and white blood cells and pulsating cardiac tissue. DNA testing revealed human genetic profiles.',
                'blood_type': 'AB Positive',
                'tissue_type': 'Myocardium with active leukocytes',
                'white_blood_cells_present': True,
                'forensic_lead_scientist': 'Dr. Ricardo Castañón Gómez & International Forensic Team',
                'scientific_notes': 'Immunohistochemical testing showed that the blood originated from within the host rather than being applied externally. Living white blood cells were active despite years in ambient storage.',
                'church_approval': 'DIOCESAN',
                'key_spiritual_message': 'Jesus is truly with us in our contemporary world, calling every soul to repentance and divine intimacy.',
                'scripture_verse': 'Matthew 28:20 - "And behold, I am with you always, until the end of the age."',
                'is_featured': False,
            }
        ]

        for m_data in miracles_data:
            miracle, created = Miracle.objects.update_or_create(
                slug=m_data['slug'],
                defaults=m_data
            )
            self.stdout.write(f"Miracle: {miracle.slug} ({'Created' if created else 'Updated'})")

        # 3. Apologetics Topics
        apologetics = [
            {
                'question': 'Is the Eucharist merely a symbol or the Real Presence of Jesus?',
                'slug': 'eucharist-symbol-or-real-presence',
                'category': 'EUCHARIST',
                'short_answer': 'The Catholic Church teaches dogmatically that Jesus Christ is truly, really, and substantially present—Body, Blood, Soul, and Divinity—in the Eucharist.',
                'detailed_explanation': """In John chapter 6 (The Bread of Life Discourse), Jesus repeatedly emphasizes: "Unless you eat the flesh of the Son of Man and drink his blood, you have no life in you" (v. 53). When His disciples grumbled that this was a hard saying, Jesus did not say "I am speaking figuratively." Instead, He let those who disbelieved walk away, and turned to the Twelve asking if they also wished to leave.

Furthermore, at the Last Supper, Jesus held up the bread and said, "This IS my body" (Matthew 26:26), not "This represents my body."

Modern scientific studies of Eucharistic Miracles (Lanciano, Buenos Aires, Legnica, Sokółka) consistently reveal living left-ventricle human heart tissue with AB+ blood type—giving tangible, physical witness to Christ's living presence.""",
                'scripture_citations': 'John 6:48-66, Matthew 26:26-28, 1 Corinthians 10:16, 1 Corinthians 11:27-29',
                'church_fathers_quote': 'St. Ignatius of Antioch (AD 110, disciple of St. John the Apostle): "They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Saviour Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again."',
                'order': 1
            },
            {
                'question': 'Why do Catholics confess sins to a priest instead of directly to God?',
                'slug': 'why-confess-to-a-priest',
                'category': 'CONFESSION',
                'short_answer': 'Because Jesus explicitly instituted this sacrament on Easter Sunday and gave His Apostles the divine authority to forgive or retain sins in His Name.',
                'detailed_explanation': """On the evening of His Resurrection, Jesus breathed on the Apostles and said to them: "Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained" (John 20:22-23).

To forgive or retain a sin, the minister of God must hear the confession. While we can and should pray to God for forgiveness at all times, Christ established the Sacrament of Reconciliation as the ordinary, tangible means to receive certainty of absolution, spiritual healing, and restoration with the Church.""",
                'scripture_citations': 'John 20:21-23, James 5:16, 2 Corinthians 5:18-20, Matthew 16:19',
                'church_fathers_quote': 'St. Augustine (AD 354–430): "Let us not listen to those who deny that the Church of God has power to forgive all sins... Let no one say to himself: I do penance secretly before God. Did Christ then say in vain: Whatsoever you shall loose on earth shall be loosed in heaven?"',
                'order': 2
            },
            {
                'question': 'How do I return to the Catholic Church after years or decades away?',
                'slug': 'how-to-return-to-catholic-church',
                'category': 'RETURNING',
                'short_answer': 'You are warmly welcomed home! Returning is as simple as making a sincere, good Confession and stepping back into the Holy Sacrifice of the Mass.',
                'detailed_explanation': """No matter how long you have been away, or what has happened in your life, Jesus is waiting for you with open arms like the Father in the Parable of the Prodigal Son (Luke 15).

Steps to return home:
1. Pray quietly and thank God for the desire in your heart to return.
2. Review an Examination of Conscience (we provide a guided tool on this site).
3. Go to Confession at your local parish. You can simply tell the priest: "Bless me Father, for I have sinned. It has been [number] years since my last confession, and I need help." The priest will gently guide you through every step.
4. Receive the gift of the Eucharist in a state of grace at Holy Mass.""",
                'scripture_citations': 'Luke 15:11-32 (The Prodigal Son), 1 John 1:9, Isaiah 1:18',
                'church_fathers_quote': 'St. John Chrysostom: "The Church is a hospital for sinners, not a museum for saints. Do not be ashamed to return."',
                'order': 3
            },
            {
                'question': 'What did the earliest Christians (Church Fathers) believe about the Eucharist?',
                'slug': 'early-church-fathers-eucharist',
                'category': 'CHURCH_FATHERS',
                'short_answer': 'The early Church Fathers universally and unanimously taught the Real Presence of Jesus Christ in the Eucharist without exception.',
                'detailed_explanation': """From the 1st through the 8th centuries across Rome, Greece, Antioch, Alexandria, and Gaul, every single recorded Christian father taught that the bread and wine become the actual Body and Blood of Jesus Christ through the invocation of the Holy Spirit during the Eucharistic liturgy.

There is not a single Church Father who taught that the Eucharist is merely a symbolic ritual or empty memorial.""",
                'scripture_citations': 'Acts 2:42, 1 Corinthians 10:16-17',
                'church_fathers_quote': 'St. Justin Martyr (AD 155, First Apology): "For not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Saviour, having been made flesh by the Word of God... we have been taught that the food which is blessed by the prayer of His word is the flesh and blood of that Jesus who was made flesh."',
                'order': 4
            }
        ]

        for a_data in apologetics:
            ApologeticsTopic.objects.update_or_create(
                slug=a_data['slug'],
                defaults=a_data
            )
            self.stdout.write(f"Apologetics topic: {a_data['question'][:40]}...")

        # 4. Daily Reflections
        today = timezone.now().date()
        reflections = [
            {
                'date': today,
                'title': 'The Living Heart in the Monstrance',
                'scripture_reference': 'John 6:35',
                'scripture_text': 'Jesus said to them, "I am the bread of life; whoever comes to me shall not hunger, and whoever believes in me shall never thirst."',
                'saint_name': 'St. Peter Julian Eymard',
                'saint_feast_or_title': 'Apostle of the Holy Eucharist',
                'saint_quote': '"How kind is our Sacramental Jesus! He welcomes you at any hour of the day or night. His Love knows no exhaustion. He is always in the tabernacle, waiting with open arms to heal your heart."',
                'reflection_body': 'When we kneel before the Blessed Sacrament, we are not looking at a metaphor. We are in the physical, living presence of the Creator of the Universe, who loved us to the point of giving His life on the Cross and remaining with us in humble bread until the end of time. When doubts cloud your heart, look at the scientific realities of Lanciano and Buenos Aires—Christ’s heart still beats with boundless mercy for you.',
                'closing_prayer': 'O Jesus, Present in the Most Blessed Sacrament, I believe in You, I adore You, I hope in You, and I love You with all my heart. Draw me close to Your Sacred Heart today. Amen.'
            },
            {
                'date': today + datetime.timedelta(days=1),
                'title': 'Divine Mercy from the Tabernacle',
                'scripture_reference': 'Matthew 11:28',
                'scripture_text': 'Come to me, all who labor and are heavy laden, and I will give you rest.',
                'saint_name': 'St. Faustina Kowalska',
                'saint_feast_or_title': 'Secretary of Divine Mercy',
                'saint_quote': '"All the good that is in me is due to Holy Communion. I owe everything to it. I feel that this holy fire has transformed me completely."',
                'reflection_body': 'The Holy Eucharist is the fountainhead of Divine Mercy. Whenever you feel overwhelmed by the trials of life, remember that the King of Kings awaits your visit in the silence of the tabernacle. Pour out your burdens before Him; He understands every sigh and every tear.',
                'closing_prayer': 'Lord Jesus Christ, King of Mercy, I place all my trust in You. Transform my soul as I gaze upon Your Eucharistic face. Amen.'
            }
        ]

        for r_data in reflections:
            DailyReflection.objects.update_or_create(
                date=r_data['date'],
                defaults=r_data
            )
            self.stdout.write(f"Reflection for: {r_data['date']}")

        # 5. Public event calendar (editable from the admin panel)
        event_start = timezone.now().replace(hour=18, minute=30, second=0, microsecond=0)
        events_seed = [
            {
                'title': 'Holy Hour of Eucharistic Adoration',
                'description': 'A quiet hour before the Blessed Sacrament with Scripture, silence, and Benediction.',
                'event_date': event_start + datetime.timedelta(days=7),
                'location': 'Parish Adoration Chapel',
                'category': 'ADORATION',
            },
            {
                'title': 'Feast of the Exaltation of the Holy Cross',
                'description': 'Join the parish community in celebrating the Cross of Christ and the gift of redemption.',
                'event_date': event_start + datetime.timedelta(days=18),
                'location': 'St. Joseph Parish',
                'category': 'FEAST',
            },
            {
                'title': 'Community Rosary for the Real Presence',
                'description': 'Pray together for deeper love and reverence for Jesus in the Holy Eucharist.',
                'event_date': event_start + datetime.timedelta(days=27),
                'location': 'Online prayer room',
                'category': 'PRAYER',
            },
        ]
        for e_data in events_seed:
            Event.objects.update_or_create(title=e_data['title'], defaults=e_data)

        # 6. Prayer Intentions
        prayers_seed = [
            {
                'name': 'Maria S.',
                'location': 'Texas, USA',
                'category': 'FAITH_RETURN',
                'intention_text': 'Please pray for my son Michael who stopped going to church after college. May he encounter Jesus in the Blessed Sacrament and return to the fullness of the Catholic faith.',
                'is_candle_lit': True,
                'prayers_count': 42
            },
            {
                'name': 'David & Grace',
                'location': 'London, UK',
                'category': 'FAMILY',
                'intention_text': 'For reconciliation and healing in our marriage, and for our children to grow up loving the Holy Eucharist.',
                'is_candle_lit': True,
                'prayers_count': 28
            },
            {
                'name': 'Sister Clara',
                'location': 'Kerala, India',
                'category': 'VOCATIONS',
                'intention_text': 'For young men and women discerning holy vocations to the priesthood and religious life, that they may say "Yes" to Christ\'s call.',
                'is_candle_lit': True,
                'prayers_count': 67
            },
            {
                'name': 'John P.',
                'location': 'Sydney, Australia',
                'category': 'HEALING',
                'intention_text': 'For my father fighting stage 4 cancer. May Jesus, the Divine Physician present in the Holy Eucharist, grant him comfort and healing.',
                'is_candle_lit': True,
                'prayers_count': 95
            }
        ]

        for p_data in prayers_seed:
            PrayerIntention.objects.get_or_create(
                intention_text=p_data['intention_text'],
                defaults=p_data
            )

        # 7. Testimonies
        testimonies_seed = [
            {
                'title': 'From Atheist Scientist to Daily Communicant',
                'author_name': 'Dr. Anthony M.',
                'author_location': 'Boston, USA',
                'story': 'I was a skeptical biologist for over 15 years. When a Catholic colleague introduced me to the forensic research on the Eucharistic Miracles of Lanciano and Buenos Aires—specifically the cardiac tissue exhibiting trauma and living white blood cells—my intellectual defenses collapsed. I went to a Catholic church, knelt before the tabernacle for the first time, and wept as I encountered the living Christ. Today, I am home in the Catholic Church.',
                'is_approved': True
            },
            {
                'title': '12 Years Away, Returned Home in Confession',
                'author_name': 'Sarah K.',
                'author_location': 'Toronto, Canada',
                'story': 'I had drifted away from the Church for over 12 years, carrying deep guilt and emptiness. Seeing the evidence of Eucharistic miracles broke through my hardness of heart. I finally gathered courage and went to Confession on a Saturday afternoon. The priest received me with such tenderness and kindness. As the words of absolution were spoken, a weight of 12 years was lifted from my soul.',
                'is_approved': True
            }
        ]

        for t_data in testimonies_seed:
            Testimony.objects.get_or_create(
                title=t_data['title'],
                defaults=t_data
            )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully with authentic Eucharistic miracles, apologetics, prayers, and reflections!"))

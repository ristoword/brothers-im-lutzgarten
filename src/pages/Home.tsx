import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Star, MapPin, Clock, Leaf, Award, Heart, ArrowRight, Users } from 'lucide-react'
import { useRestaurantStore } from '../store/restaurantStore'
import { useTranslation } from 'react-i18next'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const { t } = useTranslation()

  const { menuItems, feedbacks, events } = useRestaurantStore()
  const approvedFeedbacks = feedbacks.filter(f => f.approved).slice(0, 3)
  const featuredMenu = menuItems.filter(m => m.badge === 'chef' || m.badge === 'popular').slice(0, 3)
  const upcomingEvents = events.slice(0, 2)

  return (
    <div className="bg-[#faf6ef]">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90"
            alt="Brothers im Lutzgarten"
            className="w-full h-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f2218]/90" />
        </motion.div>

        <div className="absolute top-1/4 left-10 w-64 h-64 border border-[#c8a96e]/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 border border-[#c8a96e]/10 rounded-full pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-16 bg-[#c8a96e]" />
            <span className="text-[#c8a96e] text-sm tracking-[0.4em] uppercase font-light">
              {t('hero.subtitle')}
            </span>
            <div className="h-px w-16 bg-[#c8a96e]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-6xl md:text-8xl text-white font-bold leading-tight mb-6"
          >
            {t('hero.title1')}<br />
            <span className="text-gold-gradient italic">{t('hero.title2')}</span> {t('hero.title3')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/prenotazione"
              className="bg-[#c8a96e] hover:bg-[#e8c98e] text-[#1a3a2a] font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#c8a96e]/40 hover:-translate-y-1"
            >
              {t('hero.cta_reserve')}
            </Link>
            <Link
              to="/menu"
              className="border border-white/40 hover:border-[#c8a96e] text-white hover:text-[#c8a96e] font-medium px-10 py-4 rounded-full text-lg transition-all duration-300 backdrop-blur-sm"
            >
              {t('hero.cta_menu')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#1a3a2a] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: '1705', label: t('stats.founded'), icon: Award },
              { value: '150+', label: t('stats.seats'), icon: Users },
              { value: '98%', label: t('stats.satisfaction'), icon: Heart },
              { value: '100%', label: t('stats.ingredients'), icon: Leaf },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center gap-2">
                <stat.icon size={20} className="text-[#c8a96e]" />
                <div className="font-serif text-3xl text-white font-bold">{stat.value}</div>
                <div className="text-white/50 text-xs tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-sm tracking-widest uppercase">{t('story.label')}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl text-[#1a3a2a] font-bold mb-6 leading-tight">
              {t('story.title1')}<br />
              <span className="italic text-[#c8a96e]">{t('story.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('story.p1') }} />
            <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed mb-10">
              {t('story.p2')}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contatto"
                className="inline-flex items-center gap-2 text-[#1a3a2a] font-semibold hover:text-[#c8a96e] transition-colors group"
              >
                {t('story.link')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" alt="Il Lutzgarten" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-xl overflow-hidden border-4 border-white shadow-xl z-20">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" alt="Biergarten" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 bg-[#1a3a2a] text-white p-6 rounded-2xl shadow-xl z-20">
              <div className="font-serif text-4xl font-bold text-[#c8a96e]">4.9</div>
              <div className="flex gap-1 my-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-[#c8a96e] fill-[#c8a96e]" />)}
              </div>
              <div className="text-white/60 text-xs">Google Reviews</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="py-24 bg-[#1a3a2a] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-sm tracking-widest uppercase">{t('featured.label')}</span>
              <div className="h-px w-12 bg-[#c8a96e]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl text-white font-bold">{t('featured.title')}</motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mt-4 max-w-lg mx-auto">{t('featured.subtitle')}</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMenu.map((item) => (
              <motion.div key={item.id} variants={fadeUp} className="card-hover">
                <div className="bg-white/5 backdrop-blur rounded-2xl overflow-hidden border border-white/10 hover:border-[#c8a96e]/30 transition-all">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#2d5a3d] to-[#1a3a2a] relative flex items-center justify-center">
                    <div className="text-6xl">🍝</div>
                    {item.badge && (
                      <div className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold ${
                        item.badge === 'chef' ? 'bg-[#c8a96e] text-[#1a3a2a]' : 'bg-[#8b1a1a] text-white'
                      }`}>
                        {item.badge === 'chef' ? '👨‍🍳 Chef' : '⭐ Top'}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-[#c8a96e] text-xs tracking-widest uppercase mb-2">{item.category}</div>
                    <h3 className="font-serif text-xl text-white font-bold mb-2">{item.name}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{item.description}</p>
                    <span className="text-[#c8a96e] text-2xl font-bold font-serif">€{item.price.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center gap-2 border border-[#c8a96e] text-[#c8a96e] hover:bg-[#c8a96e] hover:text-[#1a3a2a] font-semibold px-8 py-3 rounded-full transition-all duration-300">
              {t('featured.cta')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BIERGARTEN */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=80" alt="Biergarten" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a2a]/90 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-sm tracking-widest uppercase">{t('biergarten.label')}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl text-white font-bold mb-6">
              {t('biergarten.title1')}<br /><span className="text-[#c8a96e] italic">{t('biergarten.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed mb-8">{t('biergarten.description')}</motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-white/60">
              <MapPin size={16} className="text-[#c8a96e]" />
              <span className="text-sm">Großreuth bei Schweinau 2, Nürnberg</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-[#c8a96e]" />
                <span className="text-[#c8a96e] text-sm tracking-widest uppercase">{t('upcoming.label')}</span>
              </div>
              <h2 className="font-serif text-5xl text-[#1a3a2a] font-bold">
                {t('upcoming.title1')} <span className="italic text-[#c8a96e]">{t('upcoming.title2')}</span>
              </h2>
            </div>
            <Link to="/eventi" className="hidden md:flex items-center gap-2 text-[#1a3a2a] font-semibold hover:text-[#c8a96e] transition-colors">
              {t('upcoming.all')} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <motion.div key={event.id} variants={fadeUp} className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="flex">
                  <div className="w-24 bg-[#1a3a2a] flex flex-col items-center justify-center p-4 text-center flex-shrink-0">
                    <div className="text-[#c8a96e] text-3xl font-bold font-serif">{new Date(event.date).getDate()}</div>
                    <div className="text-white/60 text-xs uppercase tracking-wide">{new Date(event.date).toLocaleDateString('it-IT', { month: 'short' })}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#c8a96e] text-xs mb-2">
                      <Clock size={12} />
                      <span>{event.time} Uhr</span>
                      {event.price && <span>· €{event.price} p.P.</span>}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#1a3a2a] mb-2">{event.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#faf6ef] relative">
        <div className="absolute inset-0 bg-pattern" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-sm tracking-widest uppercase">{t('testimonials.label')}</span>
              <div className="h-px w-12 bg-[#c8a96e]" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl text-[#1a3a2a] font-bold">{t('testimonials.title')}</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approvedFeedbacks.map((fb) => (
              <motion.div key={fb.id} variants={fadeUp} className="card-hover bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(fb.rating)].map((_, i) => <Star key={i} size={16} className="text-[#c8a96e] fill-[#c8a96e]" />)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic font-cormorant text-lg">"{fb.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a3a2a] rounded-full flex items-center justify-center text-white font-bold text-sm">{fb.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-[#1a3a2a] text-sm">{fb.name}</div>
                    <div className="text-gray-400 text-xs">{fb.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/feedback" className="inline-flex items-center gap-2 text-[#1a3a2a] font-semibold hover:text-[#c8a96e] transition-colors">
              {t('testimonials.cta')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA RESERVATION */}
      <section className="py-24 bg-[#1a3a2a] relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#c8a96e]/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="w-16 h-16 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-2xl">{t('cta.wine')}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif text-5xl md:text-6xl text-white font-bold mb-6">
              {t('cta.title1')}<br /><span className="text-[#c8a96e] italic">{t('cta.title2')}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-xl mb-10 leading-relaxed">{t('cta.description')}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prenotazione" className="bg-[#c8a96e] hover:bg-[#e8c98e] text-[#1a3a2a] font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {t('cta.reserve')}
              </Link>
              <a href="tel:+49911XXXXXX" className="border border-white/30 hover:border-[#c8a96e] text-white hover:text-[#c8a96e] font-medium px-10 py-4 rounded-full text-lg transition-all duration-300">
                +49 (0)911 XXX XXXX
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Clock, Users, Euro, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRestaurantStore } from '../store/restaurantStore'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = { visible: { transition: { staggerChildren: 0.15 } } }

export default function Events() {
  const { events } = useRestaurantStore()
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getMonthYear = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
  }

  const months = [...new Set(sorted.map(e => getMonthYear(e.date)))]

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=80"
          alt="Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a]/70 to-[#1a3a2a]/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-xs tracking-widest uppercase">Serate speciali</span>
            </div>
            <h1 className="font-serif text-6xl text-white font-bold">Events</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Intro */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-20"
        >
          <motion.p variants={fadeUp} className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Dalle serate di degustazione vini alle cene romantiche, dalle serate di cucina ai buffet natalizi —
            ogni evento da Brothers è un'esperienza unica e indimenticabile.
          </motion.p>
        </motion.div>

        {/* Events by month */}
        {months.map(month => {
          const monthEvents = sorted.filter(e => getMonthYear(e.date) === month)
          return (
            <div key={month} className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <h2 className="font-serif text-2xl text-[#1a3a2a] font-bold capitalize">{month}</h2>
                <div className="flex-1 h-px bg-[#c8a96e]/30" />
              </motion.div>

              <div className="space-y-6">
                {monthEvents.map((event, i) => {
                  const date = new Date(event.date)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#c8a96e]/30"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Date column */}
                        <div className="bg-[#1a3a2a] text-white p-8 flex flex-col items-center justify-center min-w-[120px] md:min-w-[140px]">
                          <div className="font-serif text-5xl font-bold text-[#c8a96e] leading-none">
                            {date.getDate()}
                          </div>
                          <div className="text-white/60 text-sm uppercase tracking-wider mt-2">
                            {date.toLocaleDateString('de-DE', { month: 'short' })}
                          </div>
                          <div className="text-white/40 text-xs mt-1">
                            {date.toLocaleDateString('de-DE', { weekday: 'short' })}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1">
                          <h3 className="font-serif text-2xl font-bold text-[#1a3a2a] mb-4">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-[#c8a96e]" />
                              <span>{event.time} Uhr</span>
                            </div>
                            {event.maxGuests && (
                              <div className="flex items-center gap-2">
                                <Users size={14} className="text-[#c8a96e]" />
                                <span>Max {event.maxGuests} Gäste</span>
                              </div>
                            )}
                            {event.price && (
                              <div className="flex items-center gap-2">
                                <Euro size={14} className="text-[#c8a96e]" />
                                <span>{event.price} € pro Person</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="p-8 flex items-center">
                          <Link
                            to="/prenotazione"
                            className="flex items-center gap-2 bg-[#c8a96e] hover:bg-[#1a3a2a] text-[#1a3a2a] hover:text-[#c8a96e] font-bold px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap"
                          >
                            Anmelden <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Private events */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#1a3a2a] rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="font-serif text-4xl text-white font-bold mb-4">
              Evento privato?
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Organizziamo compleanni, anniversari, cene aziendali e matrimoni.
              I nostri spazi possono accogliere fino a 150 ospiti.
            </p>
            <Link
              to="/contatto"
              className="inline-flex items-center gap-2 bg-[#c8a96e] hover:bg-[#e8c98e] text-[#1a3a2a] font-bold px-10 py-4 rounded-full transition-all"
            >
              Anfrage senden <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

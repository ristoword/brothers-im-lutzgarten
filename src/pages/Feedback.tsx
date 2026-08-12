import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'
import { useRestaurantStore } from '../store/restaurantStore'
import toast from 'react-hot-toast'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Feedback() {
  const { feedbacks, addFeedback } = useRestaurantStore()
  const approved = feedbacks.filter(f => f.approved)

  const [form, setForm] = useState({ name: '', rating: 0, comment: '' })
  const [hoverRating, setHoverRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.rating) return toast.error('Per favore seleziona una valutazione!')
    if (!form.comment.trim()) return toast.error('Scrivi un commento!')
    addFeedback({ name: form.name || 'Ospite Anonimo', rating: form.rating, comment: form.comment })
    setSubmitted(true)
    toast.success('Grazie per la tua recensione! Verrà pubblicata dopo la nostra verifica.')
  }

  const avgRating = approved.length > 0
    ? (approved.reduce((sum, f) => sum + f.rating, 0) / approved.length).toFixed(1)
    : '5.0'

  const ratingCounts = [5, 4, 3, 2, 1].map(r => ({
    stars: r,
    count: approved.filter(f => f.rating === r).length,
    pct: approved.length ? Math.round((approved.filter(f => f.rating === r).length / approved.length) * 100) : 0
  }))

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1920&q=80"
          alt="Reviews"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a]/60 to-[#1a3a2a]/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-xs tracking-widest uppercase">Cosa pensano di noi</span>
            </div>
            <h1 className="font-serif text-6xl text-white font-bold">Reviews</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Stats + Form */}
          <div className="lg:col-span-1 space-y-8">
            {/* Rating overview */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-[#1a3a2a] rounded-2xl p-8 text-white"
            >
              <div className="text-center mb-6">
                <div className="font-serif text-7xl font-bold text-[#c8a96e]">{avgRating}</div>
                <div className="flex justify-center gap-1 my-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < Math.round(Number(avgRating)) ? 'text-[#c8a96e] fill-[#c8a96e]' : 'text-white/20'} />
                  ))}
                </div>
                <div className="text-white/60 text-sm">{approved.length} recensioni verificate</div>
              </div>

              <div className="space-y-2">
                {ratingCounts.map(({ stars, count, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-white/60 text-sm w-3">{stars}</span>
                    <Star size={12} className="text-[#c8a96e] fill-[#c8a96e]" />
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-[#c8a96e] rounded-full"
                      />
                    </div>
                    <span className="text-white/40 text-xs w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="font-serif text-2xl font-bold text-[#1a3a2a] mb-6">
                Lascia la tua recensione
              </h3>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <p className="text-[#1a3a2a] font-semibold text-lg mb-2">Grazie mille!</p>
                  <p className="text-gray-500 text-sm">
                    La tua recensione è stata inviata e verrà pubblicata dopo la nostra verifica.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Il tuo nome (opzionale)
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Mario Rossi"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valutazione *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          <Star
                            size={28}
                            className={`transition-all ${
                              star <= (hoverRating || form.rating)
                                ? 'text-[#c8a96e] fill-[#c8a96e] scale-110'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      La tua esperienza *
                    </label>
                    <textarea
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      rows={5}
                      placeholder="Raccontaci della tua visita..."
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c8a96e] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Invia recensione
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif text-3xl font-bold text-[#1a3a2a] mb-8"
            >
              Cosa dicono i nostri ospiti
            </motion.h2>

            <div className="space-y-6">
              {approved.map((fb, i) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 card-hover"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#1a3a2a] rounded-full flex items-center justify-center text-[#c8a96e] font-bold text-lg font-serif">
                        {fb.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1a3a2a]">{fb.name}</div>
                        <div className="text-gray-400 text-xs">{fb.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          className={j < fb.rating ? 'text-[#c8a96e] fill-[#c8a96e]' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-cormorant text-lg italic">
                    "{fb.comment}"
                  </p>
                </motion.div>
              ))}

              {approved.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Star size={48} className="mx-auto mb-4 opacity-30" />
                  <p>Sii il primo a lasciare una recensione!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

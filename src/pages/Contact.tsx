import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return toast.error('Compila tutti i campi obbligatori')
    setSent(true)
    toast.success('Messaggio inviato! Ti risponderemo presto.')
  }

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1920&q=80"
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a]/70 to-[#1a3a2a]/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-xs tracking-widest uppercase">Siamo qui per te</span>
            </div>
            <h1 className="font-serif text-6xl text-white font-bold">Kontakt</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 variants={fadeUp} className="font-serif text-4xl font-bold text-[#1a3a2a] mb-6">
              Vieni a trovarci
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed mb-12">
              Che tu voglia fare una prenotazione, organizzare un evento privato o semplicemente 
              saperne di più su di noi — siamo sempre felici di sentirti.
            </motion.p>

            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: 'Indirizzo',
                  lines: ['Großreuth bei Schweinau 2', '90431 Nürnberg, Deutschland']
                },
                {
                  icon: Phone,
                  title: 'Telefono',
                  lines: ['+49 (0)911 XXX XXXX']
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['info@brothersimlutzgarten.de']
                },
                {
                  icon: Clock,
                  title: 'Öffnungszeiten',
                  lines: [
                    'Mo, Mi–Fr: 11:30–14:30 & 17:30–22:30',
                    'Sa: 12:00–23:00 · So: 12:00–22:00',
                    'Di: Ruhetag'
                  ]
                }
              ].map(({ icon: Icon, title, lines }) => (
                <motion.div key={title} variants={fadeUp} className="flex gap-5">
                  <div className="w-12 h-12 bg-[#1a3a2a] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#c8a96e]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a3a2a] mb-1">{title}</div>
                    {lines.map((line, i) => (
                      <div key={i} className="text-gray-600 text-sm">{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map embed */}
            <motion.div variants={fadeUp} className="mt-10 rounded-2xl overflow-hidden shadow-lg h-64 bg-[#1a3a2a]/10 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-400">
                <MapPin size={40} className="mx-auto mb-3 text-[#c8a96e]" />
                <p className="font-medium text-[#1a3a2a]">Großreuth bei Schweinau 2</p>
                <p className="text-sm">90431 Nürnberg</p>
                <a
                  href="https://maps.google.com/?q=Großreuth+bei+Schweinau+2+Nürnberg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[#c8a96e] text-sm hover:underline"
                >
                  In Google Maps öffnen →
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <h3 className="font-serif text-3xl font-bold text-[#1a3a2a] mb-8">
                Schreib uns
              </h3>

              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle size={60} className="text-green-500 mx-auto mb-6" />
                  <h4 className="font-serif text-2xl font-bold text-[#1a3a2a] mb-3">Grazie!</h4>
                  <p className="text-gray-500">
                    Ti risponderemo entro 24 ore all'indirizzo {form.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nome *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Mario Rossi"
                        required
                        className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="mario@esempio.com"
                        required
                        className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Oggetto</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors bg-white"
                    >
                      <option value="">Seleziona un argomento</option>
                      <option value="prenotazione">Prenotazione</option>
                      <option value="evento">Evento privato</option>
                      <option value="collaborazione">Collaborazione</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Messaggio *</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={6}
                      placeholder="Scrivi il tuo messaggio..."
                      required
                      className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    <Send size={18} /> Messaggio inviare
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

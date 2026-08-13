import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, CheckCircle, Phone, Mail } from 'lucide-react'
import { useRestaurantStore } from '../store/restaurantStore'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

const timeSlots = ['11:30','12:00','12:30','13:00','13:30','14:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30']
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, '9+']

export default function Reservation() {
  const { addReservation } = useRestaurantStore()
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'en' ? 'en-US' : 'it-IT'
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ date: '', time: '', guests: 2, name: '', email: '', phone: '', message: '' })

  const handleNext = () => {
    if (step === 1) {
      if (!form.date) return toast.error(t('reservation_page.error_date'))
      if (!form.time) return toast.error(t('reservation_page.error_time'))
    }
    if (step === 2) {
      if (!form.name.trim()) return toast.error(t('reservation_page.error_name'))
      if (!form.email.trim()) return toast.error(t('reservation_page.error_email'))
    }
    setStep(s => s + 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addReservation({ name: form.name, email: form.email, phone: form.phone, date: form.date, time: form.time, guests: Number(form.guests), message: form.message })
    setSubmitted(true)
    toast.success(t('reservation_page.success_toast'))
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      <div className="relative h-72 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="Reservierung" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a]/70 to-[#1a3a2a]/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-xs tracking-widest uppercase">{t('reservation_page.label')}</span>
            </div>
            <h1 className="font-serif text-6xl text-white font-bold">{t('reservation_page.title')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-16 shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"><CheckCircle size={40} className="text-green-500" /></div>
            <h2 className="font-serif text-4xl font-bold text-[#1a3a2a] mb-4">{t('reservation_page.success_title')}</h2>
            <p className="text-gray-600 text-lg mb-2">{t('reservation_page.success_msg', { name: form.name })}</p>
            <div className="bg-[#faf6ef] rounded-2xl p-6 mt-8 text-left space-y-3">
              <div className="flex items-center gap-3 text-gray-600"><Calendar size={18} className="text-[#c8a96e]" /><span>{new Date(form.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              <div className="flex items-center gap-3 text-gray-600"><Clock size={18} className="text-[#c8a96e]" /><span>{form.time}</span></div>
              <div className="flex items-center gap-3 text-gray-600"><Users size={18} className="text-[#c8a96e]" /><span>{form.guests} {Number(form.guests) === 1 ? t('reservation_page.person') : t('reservation_page.people')}</span></div>
            </div>
            <p className="text-gray-400 text-sm mt-8">{t('reservation_page.success_email', { email: form.email })} <a href="tel:+49911XXXXXX" className="text-[#c8a96e] font-medium">+49 (0)911 XXX XXXX</a></p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-[#1a3a2a] p-6">
              <div className="flex items-center justify-between">
                {[t('reservation_page.step1'), t('reservation_page.step2'), t('reservation_page.step3')].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > i + 1 ? 'bg-[#c8a96e] text-[#1a3a2a]' : step === i + 1 ? 'bg-[#c8a96e] text-[#1a3a2a]' : 'bg-white/10 text-white/40'}`}>{step > i + 1 ? '✓' : i + 1}</div>
                    <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-[#c8a96e]' : 'text-white/40'}`}>{label}</span>
                    {i < 2 && <div className="flex-1 h-px bg-white/10 min-w-8 mx-2 hidden sm:block" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-serif text-3xl font-bold text-[#1a3a2a] mb-8">{t('reservation_page.when')}</h2>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3"><Calendar size={16} className="inline mr-2 text-[#c8a96e]" />{t('reservation_page.date')}</label>
                      <input type="date" min={minDate} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 text-base outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3"><Clock size={16} className="inline mr-2 text-[#c8a96e]" />{t('reservation_page.time')}</label>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {timeSlots.map(time => (
                          <button key={time} onClick={() => setForm({ ...form, time })} className={`py-2.5 px-2 rounded-lg text-sm font-medium border-2 transition-all ${form.time === time ? 'bg-[#1a3a2a] border-[#1a3a2a] text-[#c8a96e]' : 'border-gray-200 hover:border-[#c8a96e] text-gray-600'}`}>{time}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3"><Users size={16} className="inline mr-2 text-[#c8a96e]" />{t('reservation_page.guests')}</label>
                      <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                        {guestOptions.map(g => (
                          <button key={g} onClick={() => setForm({ ...form, guests: Number(g) || 9 })} className={`py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${form.guests === (Number(g) || 9) ? 'bg-[#1a3a2a] border-[#1a3a2a] text-[#c8a96e]' : 'border-gray-200 hover:border-[#c8a96e] text-gray-600'}`}>{g}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={handleNext} className="mt-10 w-full bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold py-4 rounded-xl transition-all duration-300 text-lg">{t('reservation_page.next')}</button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-serif text-3xl font-bold text-[#1a3a2a] mb-8">{t('reservation_page.your_data')}</h2>
                  <div className="space-y-5">
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('reservation_page.name')}</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5"><Mail size={14} className="inline mr-1 text-[#c8a96e]" />{t('reservation_page.email')}</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5"><Phone size={14} className="inline mr-1 text-[#c8a96e]" />{t('reservation_page.phone')}</label><input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('reservation_page.special')}</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} placeholder={t('reservation_page.special_placeholder')} className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none transition-colors resize-none" /></div>
                  </div>
                  <div className="flex gap-4 mt-10">
                    <button onClick={() => setStep(1)} className="w-full border-2 border-gray-200 hover:border-[#c8a96e] text-gray-600 hover:text-[#1a3a2a] font-bold py-4 rounded-xl transition-all">{t('reservation_page.back')}</button>
                    <button onClick={handleNext} className="w-full bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold py-4 rounded-xl transition-all duration-300">{t('reservation_page.next')}</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="font-serif text-3xl font-bold text-[#1a3a2a] mb-8">{t('reservation_page.confirm_title')}</h2>
                  <div className="bg-[#faf6ef] rounded-2xl p-6 space-y-4 mb-8">
                    <h3 className="font-semibold text-[#1a3a2a] text-sm uppercase tracking-wide mb-4">{t('reservation_page.summary')}</h3>
                    {[
                      { icon: Calendar, label: t('reservation_page.date'), value: new Date(form.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                      { icon: Clock, label: t('reservation_page.time'), value: form.time },
                      { icon: Users, label: t('reservation_page.guests'), value: form.guests },
                      { icon: Mail, label: t('reservation_page.name'), value: form.name },
                      { icon: Phone, label: t('reservation_page.email'), value: form.email },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3"><Icon size={16} className="text-[#c8a96e]" /><span className="text-gray-500 text-sm min-w-20">{label}:</span><span className="font-medium text-[#1a3a2a] text-sm">{value}</span></div>
                    ))}
                    {form.message && <div className="pt-3 border-t border-gray-200"><p className="text-gray-500 text-sm">{form.message}</p></div>}
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(2)} className="w-full border-2 border-gray-200 hover:border-[#c8a96e] text-gray-600 font-bold py-4 rounded-xl transition-all">{t('reservation_page.back')}</button>
                      <button type="submit" className="w-full bg-[#c8a96e] hover:bg-[#1a3a2a] text-[#1a3a2a] hover:text-[#c8a96e] font-bold py-4 rounded-xl transition-all duration-300 text-lg">{t('reservation_page.book_now')}</button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center border border-gray-100">
            <Phone size={24} className="text-[#c8a96e] mx-auto mb-3" />
            <div className="font-semibold text-[#1a3a2a]">{t('reservation_page.by_phone')}</div>
            <a href="tel:+49911XXXXXX" className="text-gray-600 text-sm hover:text-[#c8a96e] transition-colors">+49 (0)911 XXX XXXX</a>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md text-center border border-gray-100">
            <Mail size={24} className="text-[#c8a96e] mx-auto mb-3" />
            <div className="font-semibold text-[#1a3a2a]">{t('reservation_page.by_email')}</div>
            <a href="mailto:info@brothersimlutzgarten.de" className="text-gray-600 text-sm hover:text-[#c8a96e] transition-colors">info@brothersimlutzgarten.de</a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, UtensilsCrossed, CalendarDays, Images, MessageSquare,
  BookOpen, Plus, Trash2, Edit3, Check, X, Eye, Upload,
  Users, Star, Clock, LogOut, ChevronRight, AlertCircle
} from 'lucide-react'
import { useRestaurantStore } from '../store/restaurantStore'
import type { MenuItem, Event, GalleryPhoto } from '../store/restaurantStore'
import toast from 'react-hot-toast'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'brothers2026'

type Tab = 'overview' | 'menu' | 'events' | 'gallery' | 'feedback' | 'reservations'

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      toast.success('Benvenuto nel pannello admin!')
    } else {
      toast.error('Password errata')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#1a3a2a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1a3a2a] rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={28} className="text-[#c8a96e]" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1a3a2a]">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-2">Brothers im Lutzgarten</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full border-2 border-gray-200 focus:border-[#c8a96e] rounded-xl px-4 py-3 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold py-3 rounded-xl transition-all"
            >
              Accedi
            </button>
          </form>
          <p className="text-center text-gray-400 text-xs mt-6">Accesso riservato al proprietario</p>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Panoramica', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'gallery', label: 'Galleria', icon: Images },
    { id: 'feedback', label: 'Recensioni', icon: MessageSquare },
    { id: 'reservations', label: 'Prenotazioni', icon: BookOpen },
  ] as const

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a3a2a] min-h-screen flex flex-col fixed left-0 top-0 z-30">
        <div className="p-6 border-b border-white/10">
          <div className="font-serif text-white text-lg font-bold">Brothers</div>
          <div className="text-[#c8a96e] text-[10px] tracking-widest uppercase">Admin Dashboard</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#c8a96e] text-[#1a3a2a]'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'menu' && <MenuTab />}
            {activeTab === 'events' && <EventsTab />}
            {activeTab === 'gallery' && <GalleryTab />}
            {activeTab === 'feedback' && <FeedbackTab />}
            {activeTab === 'reservations' && <ReservationsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── OVERVIEW ─── */
function OverviewTab() {
  const store = useRestaurantStore()
  const pendingRes = store.reservations.filter(r => r.status === 'pending').length
  const pendingFb = store.feedbacks.filter(f => !f.approved).length

  const stats = [
    { label: 'Piatti nel menu', value: store.menuItems.length, icon: UtensilsCrossed, color: 'bg-green-50 text-green-700' },
    { label: 'Events attivi', value: store.events.length, icon: CalendarDays, color: 'bg-blue-50 text-blue-700' },
    { label: 'Foto in galleria', value: store.gallery.length, icon: Images, color: 'bg-purple-50 text-purple-700' },
    { label: 'Prenotazioni pendenti', value: pendingRes, icon: BookOpen, color: 'bg-orange-50 text-orange-700' },
    { label: 'Recensioni da approvare', value: pendingFb, icon: MessageSquare, color: 'bg-red-50 text-red-700' },
    { label: 'Recensioni pubblicate', value: store.feedbacks.filter(f => f.approved).length, icon: Star, color: 'bg-yellow-50 text-yellow-700' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Buongiorno! 👋</h1>
        <p className="text-gray-500 mt-1">Ecco una panoramica del tuo ristorante</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={22} />
            </div>
            <div className="text-3xl font-bold text-gray-800 font-serif">{stat.value}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent reservations */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-[#c8a96e]" /> Ultime prenotazioni
        </h3>
        {store.reservations.length === 0 ? (
          <p className="text-gray-400 text-sm">Nessuna prenotazione ancora.</p>
        ) : (
          <div className="space-y-3">
            {store.reservations.slice(-5).reverse().map(r => (
              <div key={r.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <div className="font-medium text-gray-800">{r.name}</div>
                  <div className="text-gray-400 text-sm">{r.date} · {r.time} · {r.guests} pax</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  r.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── MENU ─── */
function MenuTab() {
  const store = useRestaurantStore()
  const [editing, setEditing] = useState<MenuItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<MenuItem>>({
    category: 'Antipasti', name: '', nameIt: '', description: '', price: 0
  })

  const categories = ['Antipasti', 'Primi', 'Pizze', 'Secondi', 'Dolci', 'Vini']

  const handleSave = () => {
    if (!form.name || !form.price) return toast.error('Compila i campi obbligatori')
    if (editing) {
      store.updateMenuItem(editing.id, form)
      toast.success('Piatto aggiornato!')
    } else {
      store.addMenuItem(form as Omit<MenuItem, 'id'>)
      toast.success('Piatto aggiunto!')
    }
    setShowForm(false)
    setEditing(null)
    setForm({ category: 'Antipasti', name: '', nameIt: '', description: '', price: 0 })
  }

  const startEdit = (item: MenuItem) => {
    setEditing(item)
    setForm(item)
    setShowForm(true)
  }

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = store.menuItems.filter(m => m.category === cat)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">Gestione Menu</h1>
          <p className="text-gray-500 mt-1">{store.menuItems.length} piatti nel menu</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ category: 'Antipasti', name: '', nameIt: '', description: '', price: 0 }) }}
          className="flex items-center gap-2 bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold px-6 py-3 rounded-xl transition-all"
        >
          <Plus size={18} /> Aggiungi piatto
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-[#c8a96e]/30 overflow-hidden"
          >
            <h3 className="font-semibold text-gray-700 mb-4">
              {editing ? 'Modifica piatto' : 'Nuovo piatto'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Categoria *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e] bg-white"
                >
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Badge</label>
                <select
                  value={form.badge || ''}
                  onChange={e => setForm({ ...form, badge: e.target.value as MenuItem['badge'] || undefined })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e] bg-white"
                >
                  <option value="">Nessuno</option>
                  <option value="chef">Chef Consigliato</option>
                  <option value="popular">Popolare</option>
                  <option value="new">Nuovo</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Nome piatto *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value, nameIt: e.target.value })}
                  placeholder="Tagliatelle al Ragù"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Descrizione</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  placeholder="Descrizione del piatto..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Prezzo (€) *</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} className="flex items-center gap-2 bg-[#1a3a2a] text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#c8a96e] hover:text-[#1a3a2a] transition-all">
                <Check size={14} /> Salva
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="flex items-center gap-2 bg-gray-100 text-gray-600 font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-gray-200 transition-all">
                <X size={14} /> Annulla
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu list by category */}
      {categories.map(cat => {
        const items = grouped[cat]
        if (!items?.length) return null
        return (
          <div key={cat} className="mb-8">
            <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
              {cat}
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{items.length}</span>
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {items.map((item, i) => (
                <div key={item.id} className={`flex items-center gap-4 p-4 ${i > 0 ? 'border-t border-gray-50' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          item.badge === 'chef' ? 'bg-[#c8a96e]/20 text-[#8b7040]' : 'bg-red-100 text-red-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5 truncate">{item.description}</div>
                  </div>
                  <div className="font-bold text-[#1a3a2a] font-serif">€{item.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(item)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors">
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => { store.deleteMenuItem(item.id); toast.success('Piatto rimosso') }}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── EVENTS ─── */
function EventsTab() {
  const store = useRestaurantStore()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState<Partial<Event>>({
    title: '', date: '', time: '19:00', description: '', maxGuests: 30, price: 0
  })

  const handleSave = () => {
    if (!form.title || !form.date || !form.description) return toast.error('Compila i campi obbligatori')
    if (editing) {
      store.updateEvent(editing.id, form)
      toast.success('Evento aggiornato!')
    } else {
      store.addEvent(form as Omit<Event, 'id'>)
      toast.success('Evento aggiunto!')
    }
    setShowForm(false)
    setEditing(null)
    setForm({ title: '', date: '', time: '19:00', description: '', maxGuests: 30, price: 0 })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">Gestione Events</h1>
          <p className="text-gray-500 mt-1">{store.events.length} eventi in programma</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null) }}
          className="flex items-center gap-2 bg-[#1a3a2a] hover:bg-[#c8a96e] text-white hover:text-[#1a3a2a] font-bold px-6 py-3 rounded-xl transition-all"
        >
          <Plus size={18} /> Nuovo evento
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-[#c8a96e]/30 overflow-hidden"
          >
            <h3 className="font-semibold text-gray-700 mb-4">{editing ? 'Modifica evento' : 'Nuovo evento'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Titolo *</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Serata della Vendemmia"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Data *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Orario</label>
                <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Max ospiti</label>
                <input type="number" value={form.maxGuests} onChange={e => setForm({ ...form, maxGuests: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Prezzo (€/persona)</label>
                <input type="number" step="5" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Descrizione *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} placeholder="Descrivi l'evento..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e] resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSave} className="flex items-center gap-2 bg-[#1a3a2a] text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#c8a96e] hover:text-[#1a3a2a] transition-all">
                <Check size={14} /> Salva
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="flex items-center gap-2 bg-gray-100 text-gray-600 font-medium px-5 py-2.5 rounded-lg text-sm">
                <X size={14} /> Annulla
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {store.events.map(event => (
          <div key={event.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-5">
            <div className="bg-[#1a3a2a] text-white rounded-xl p-4 text-center min-w-[72px]">
              <div className="font-serif text-2xl font-bold text-[#c8a96e]">{new Date(event.date).getDate()}</div>
              <div className="text-white/60 text-xs uppercase">{new Date(event.date).toLocaleDateString('it-IT', { month: 'short' })}</div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{event.title}</div>
              <div className="text-gray-400 text-sm mt-1 flex items-center gap-4">
                <span className="flex items-center gap-1"><Clock size={12} />{event.time}</span>
                {event.maxGuests && <span className="flex items-center gap-1"><Users size={12} />{event.maxGuests} max</span>}
                {event.price && <span>€{event.price}/p.P.</span>}
              </div>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{event.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(event); setForm(event); setShowForm(true) }} className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors">
                <Edit3 size={16} />
              </button>
              <button onClick={() => { store.deleteEvent(event.id); toast.success('Evento eliminato') }} className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── GALLERY ─── */
function GalleryTab() {
  const store = useRestaurantStore()
  const [form, setForm] = useState<Partial<GalleryPhoto>>({ url: '', caption: '', category: 'piatti' })
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, url: reader.result as string }))
    reader.readAsDataURL(file)
  }

  const handleAdd = () => {
    if (!form.url) return toast.error('Seleziona una foto!')
    store.addGalleryPhoto(form as Omit<GalleryPhoto, 'id'>)
    setForm({ url: '', caption: '', category: 'piatti' })
    toast.success('Foto aggiunta alla galleria!')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800">Gestione Galleria</h1>
          <p className="text-gray-500 mt-1">{store.gallery.length} foto pubblicate</p>
        </div>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <Upload size={18} className="text-[#c8a96e]" /> Carica nuova foto
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            <input type="file" ref={fileRef} onChange={handleFile} accept="image/*" className="hidden" />
            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                form.url ? 'border-[#c8a96e] bg-[#c8a96e]/5' : 'border-gray-300 hover:border-[#c8a96e] hover:bg-gray-50'
              }`}
            >
              {form.url ? (
                <div>
                  <img src={form.url} alt="Preview" className="h-32 object-cover rounded-lg mx-auto mb-2" />
                  <p className="text-[#c8a96e] text-sm font-medium">Foto caricata ✓</p>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Clicca per caricare una foto</p>
                  <p className="text-gray-300 text-xs mt-1">JPG, PNG, WEBP — Max 10MB</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">O URL immagine</label>
            <input type="url" value={form.url?.startsWith('data:') ? '' : form.url} onChange={e => setForm({ ...form, url: e.target.value })}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Didascalia</label>
            <input type="text" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })}
              placeholder="La nostra sala..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Categoria</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as GalleryPhoto['category'] })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c8a96e] bg-white">
              <option value="piatti">Piatti</option>
              <option value="ambiente">Ambiente</option>
              <option value="biergarten">Biergarten</option>
              <option value="eventi">Events</option>
            </select>
          </div>
        </div>
        <button onClick={handleAdd} className="mt-4 flex items-center gap-2 bg-[#1a3a2a] text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-[#c8a96e] hover:text-[#1a3a2a] transition-all">
          <Plus size={16} /> Aggiungi alla galleria
        </button>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {store.gallery.map(photo => (
          <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2">
              <button
                onClick={() => { store.deleteGalleryPhoto(photo.id); toast.success('Foto rimossa') }}
                className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full transition-all hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
              <p className="opacity-0 group-hover:opacity-100 text-white text-xs text-center px-2">{photo.caption}</p>
            </div>
            <div className="absolute top-2 left-2">
              <span className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full capitalize">{photo.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── FEEDBACK ─── */
function FeedbackTab() {
  const store = useRestaurantStore()
  const pending = store.feedbacks.filter(f => !f.approved)
  const approved = store.feedbacks.filter(f => f.approved)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Gestione Recensioni</h1>
        <p className="text-gray-500 mt-1">{pending.length} da approvare · {approved.length} pubblicate</p>
      </div>

      {pending.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 text-orange-600 font-semibold mb-4">
            <AlertCircle size={18} />
            Recensioni da approvare ({pending.length})
          </div>
          <div className="space-y-4">
            {pending.map(fb => (
              <div key={fb.id} className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-gray-800">{fb.name}</div>
                    <div className="flex gap-1 my-1">
                      {[...Array(fb.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-[#c8a96e] fill-[#c8a96e]" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm italic">"{fb.comment}"</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { store.approveFeedback(fb.id); toast.success('Recensione approvata!') }}
                      className="flex items-center gap-1 bg-green-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-all">
                      <Eye size={14} /> Pubblica
                    </button>
                    <button onClick={() => { store.deleteFeedback(fb.id); toast.success('Recensione eliminata') }}
                      className="flex items-center gap-1 bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="font-semibold text-gray-600 mb-4">Pubblicate ({approved.length})</div>
        <div className="space-y-3">
          {approved.map(fb => (
            <div key={fb.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start justify-between gap-4">
              <div>
                <div className="font-medium text-gray-800 text-sm">{fb.name}</div>
                <div className="flex gap-1 my-1">
                  {[...Array(fb.rating)].map((_, i) => <Star key={i} size={10} className="text-[#c8a96e] fill-[#c8a96e]" />)}
                </div>
                <p className="text-gray-500 text-xs line-clamp-1">"{fb.comment}"</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { store.deleteFeedback(fb.id); toast.success('Rimossa') }}
                  className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── RESERVATIONS ─── */
function ReservationsTab() {
  const store = useRestaurantStore()
  const sorted = [...store.reservations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Prenotazioni</h1>
        <p className="text-gray-500 mt-1">{store.reservations.length} prenotazioni totali</p>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
          <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">Nessuna prenotazione ancora.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Nome', 'Data', 'Orario', 'Ospiti', 'Email', 'Stato', 'Azioni'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((r, i) => (
                  <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-800 text-sm">{r.name}</div>
                      {r.message && <div className="text-gray-400 text-xs mt-0.5 line-clamp-1">{r.message}</div>}
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-sm">{r.date}</td>
                    <td className="px-5 py-4 text-gray-600 text-sm">{r.time}</td>
                    <td className="px-5 py-4 text-gray-600 text-sm">{r.guests} pax</td>
                    <td className="px-5 py-4 text-gray-600 text-sm">{r.email}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        r.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { store.updateReservationStatus(r.id, 'confirmed'); toast.success('Confermata!') }}
                          disabled={r.status !== 'pending'}
                          className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 disabled:opacity-30 transition-colors"
                          title="Conferma"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => { store.updateReservationStatus(r.id, 'cancelled'); toast('Prenotazione annullata', { icon: '⚠️' }) }}
                          disabled={r.status === 'cancelled'}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 disabled:opacity-30 transition-colors"
                          title="Annulla"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

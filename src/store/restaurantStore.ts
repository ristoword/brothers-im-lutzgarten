import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface MenuItem {
  id: string
  category: string
  name: string
  nameIt: string
  description: string
  price: number
  image?: string
  badge?: 'chef' | 'new' | 'popular'
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  description: string
  image?: string
  maxGuests?: number
  price?: number
}

export interface GalleryPhoto {
  id: string
  url: string
  caption: string
  category: 'ambiente' | 'piatti' | 'eventi' | 'biergarten'
}

export interface Feedback {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  approved: boolean
}

export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  message: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

interface RestaurantStore {
  menuItems: MenuItem[]
  events: Event[]
  gallery: GalleryPhoto[]
  feedbacks: Feedback[]
  reservations: Reservation[]

  addMenuItem: (item: Omit<MenuItem, 'id'>) => void
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void

  addEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void

  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void
  deleteGalleryPhoto: (id: string) => void

  addFeedback: (feedback: Omit<Feedback, 'id' | 'date' | 'approved'>) => void
  approveFeedback: (id: string) => void
  deleteFeedback: (id: string) => void

  addReservation: (res: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => void
  updateReservationStatus: (id: string, status: Reservation['status']) => void
}

const defaultMenu: MenuItem[] = [
  { id: '1', category: 'Antipasti', name: 'Bruschetta al Pomodoro', nameIt: 'Bruschetta al Pomodoro', description: 'Pane tostato con pomodori freschi, aglio, basilico e olio d\'oliva extravergine', price: 8.50, badge: 'popular' },
  { id: '2', category: 'Antipasti', name: 'Carpaccio di Manzo', nameIt: 'Carpaccio di Manzo', description: 'Sottili fette di manzo crudo con rucola, parmigiano e limone', price: 14.90 },
  { id: '3', category: 'Antipasti', name: 'Burrata con Prosciutto', nameIt: 'Burrata con Prosciutto', description: 'Cremosa burrata pugliese con prosciutto crudo DOP e rucola selvatica', price: 13.50, badge: 'chef' },
  { id: '4', category: 'Primi', name: 'Tagliatelle al Ragù', nameIt: 'Tagliatelle al Ragù Bolognese', description: 'Pasta fresca all\'uovo con ragù di carne alla bolognese cotto 4 ore', price: 16.50, badge: 'popular' },
  { id: '5', category: 'Primi', name: 'Risotto ai Funghi Porcini', nameIt: 'Risotto ai Porcini', description: 'Risotto cremoso con porcini freschi, parmigiano e tartufo nero', price: 18.90, badge: 'chef' },
  { id: '6', category: 'Primi', name: 'Cacio e Pepe', nameIt: 'Spaghetti Cacio e Pepe', description: 'La ricetta originale romana con pecorino romano DOP e pepe nero macinato fresco', price: 14.50 },
  { id: '7', category: 'Pizze', name: 'Margherita Napoletana', nameIt: 'Margherita', description: 'Pomodoro San Marzano, fior di latte, basilico fresco, olio EVO', price: 11.50, badge: 'popular' },
  { id: '8', category: 'Pizze', name: 'Diavola', nameIt: 'Diavola', description: 'Pomodoro, mozzarella, salame piccante calabrese, peperoncino fresco', price: 13.50 },
  { id: '9', category: 'Pizze', name: 'Quattro Stagioni', nameIt: 'Quattro Stagioni', description: 'Pomodoro, mozzarella, prosciutto, carciofi, funghi, olive', price: 14.50 },
  { id: '10', category: 'Secondi', name: 'Tagliata di Manzo', nameIt: 'Tagliata di Manzo al Rosmarino', description: 'Entrecôte grigliata al rosmarino con rucola, cherry e scaglie di parmigiano', price: 28.90, badge: 'chef' },
  { id: '11', category: 'Secondi', name: 'Branzino al Cartoccio', nameIt: 'Branzino al Cartoccio', description: 'Branzino fresco al forno con erbe aromatiche, olive taggiasche e capperi', price: 24.50 },
  { id: '12', category: 'Dolci', name: 'Tiramisù della Casa', nameIt: 'Tiramisù', description: 'La nostra ricetta tradizionale con mascarpone, savoiardi e caffè espresso', price: 7.50, badge: 'popular' },
  { id: '13', category: 'Dolci', name: 'Panna Cotta', nameIt: 'Panna Cotta ai Frutti di Bosco', description: 'Vellutata panna cotta con coulis di frutti di bosco freschi', price: 7.00 },
  { id: '14', category: 'Vini', name: 'Chianti Classico DOCG', nameIt: 'Chianti Classico', description: 'Toscana – Sangiovese – Corpo pieno, sentori di ciliegia e spezie', price: 28.00 },
  { id: '15', category: 'Vini', name: 'Pinot Grigio delle Venezie', nameIt: 'Pinot Grigio', description: 'Veneto – Fresco, floreale, ideale con pesce e antipasti', price: 24.00 },
]

const defaultEvents: Event[] = [
  { id: '1', title: 'Serata della Vendemmia', date: '2026-09-20', time: '19:00', description: 'Una serata speciale dedicata ai vini italiani più pregiati. Degustazione guidata di 6 etichette selezionate da sommelier certificato, accompagnate da tagliere di salumi e formaggi DOP.', maxGuests: 30, price: 65 },
  { id: '2', title: 'Notte della Pasta Fresca', date: '2026-10-05', time: '18:30', description: 'Workshop di cucina: impara a fare la pasta fresca all\'uovo con il nostro chef. Cenerete con quello che avrete preparato! Un\'esperienza unica e autentica.', maxGuests: 20, price: 55 },
  { id: '3', title: 'Cena di San Valentino', date: '2026-02-14', time: '19:00', description: 'La serata più romantica dell\'anno. Menu speciale a 4 portate con vino incluso, petali di rosa e musica dal vivo. Prenotazione obbligatoria.', maxGuests: 40, price: 89 },
]

const defaultGallery: GalleryPhoto[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', caption: 'La nostra sala principale', category: 'ambiente' },
  { id: '2', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', caption: 'Il Biergarten in estate', category: 'biergarten' },
  { id: '3', url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', caption: 'Tagliatelle al ragù della casa', category: 'piatti' },
  { id: '4', url: 'https://images.unsplash.com/photo-1551183053-bf91798d416a?w=800&q=80', caption: 'Pizza Margherita napoletana', category: 'piatti' },
  { id: '5', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', caption: 'Antipasto del giorno', category: 'piatti' },
  { id: '6', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', caption: 'Serata speciale eventi', category: 'eventi' },
  { id: '7', url: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80', caption: 'Atmosfera serale', category: 'ambiente' },
  { id: '8', url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80', caption: 'Il nostro Biergarten', category: 'biergarten' },
  { id: '9', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', caption: 'Risotto ai porcini dello chef', category: 'piatti' },
  { id: '10', url: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&q=80', caption: 'Dettaglio della sala', category: 'ambiente' },
  { id: '11', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80', caption: 'Selezione di vini italiani', category: 'eventi' },
  { id: '12', url: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&q=80', caption: 'Tiramisù della casa', category: 'piatti' },
]

const defaultFeedbacks: Feedback[] = [
  { id: '1', name: 'Marco B.', rating: 5, comment: 'Esperienza indimenticabile! La pasta fresca è come quella di mia nonna in Toscana. Il personale è caloroso e professionale. Torneremo sicuramente!', date: '2026-07-15', approved: true },
  { id: '2', name: 'Sabine K.', rating: 5, comment: 'Endlich ein echtes italienisches Restaurant in Nürnberg! Das Risotto war perfekt, der Wein hervorragend. Der Biergarten ist einfach wunderbar. Sehr empfehlenswert!', date: '2026-07-22', approved: true },
  { id: '3', name: 'Luca F.', rating: 5, comment: 'Sono italiano e posso dire con certezza: qui si mangia come in Italia. La pizza è autentica, napoletana. Complimenti allo chef!', date: '2026-08-01', approved: true },
  { id: '4', name: 'Anna M.', rating: 5, comment: 'Il Biergarten è magico la sera. Abbiamo festeggiato il nostro anniversario qui e non poteva andare meglio. Grazie a tutto lo staff!', date: '2026-08-05', approved: true },
  { id: '5', name: 'Thomas W.', rating: 4, comment: 'Sehr gutes Restaurant mit authentischer italienischer Küche. Das Carpaccio war fantastisch, die Atmosphäre wunderschön. Komme gerne wieder!', date: '2026-08-10', approved: true },
  { id: '6', name: 'Giulia R.', rating: 5, comment: 'Un angolo d\'Italia nel cuore di Norimberga. La burrata era cremosa e freschissima. Il servizio impeccabile. Un posto da non perdere!', date: '2026-08-12', approved: true },
]

export const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set) => ({
      menuItems: defaultMenu,
      events: defaultEvents,
      gallery: defaultGallery,
      feedbacks: defaultFeedbacks,
      reservations: [],

      addMenuItem: (item) => set((state) => ({
        menuItems: [...state.menuItems, { ...item, id: Date.now().toString() }]
      })),
      updateMenuItem: (id, item) => set((state) => ({
        menuItems: state.menuItems.map(m => m.id === id ? { ...m, ...item } : m)
      })),
      deleteMenuItem: (id) => set((state) => ({
        menuItems: state.menuItems.filter(m => m.id !== id)
      })),

      addEvent: (event) => set((state) => ({
        events: [...state.events, { ...event, id: Date.now().toString() }]
      })),
      updateEvent: (id, event) => set((state) => ({
        events: state.events.map(e => e.id === id ? { ...e, ...event } : e)
      })),
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter(e => e.id !== id)
      })),

      addGalleryPhoto: (photo) => set((state) => ({
        gallery: [...state.gallery, { ...photo, id: Date.now().toString() }]
      })),
      deleteGalleryPhoto: (id) => set((state) => ({
        gallery: state.gallery.filter(p => p.id !== id)
      })),

      addFeedback: (feedback) => set((state) => ({
        feedbacks: [...state.feedbacks, {
          ...feedback,
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          approved: false
        }]
      })),
      approveFeedback: (id) => set((state) => ({
        feedbacks: state.feedbacks.map(f => f.id === id ? { ...f, approved: true } : f)
      })),
      deleteFeedback: (id) => set((state) => ({
        feedbacks: state.feedbacks.filter(f => f.id !== id)
      })),

      addReservation: (res) => set((state) => ({
        reservations: [...state.reservations, {
          ...res,
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString()
        }]
      })),
      updateReservationStatus: (id, status) => set((state) => ({
        reservations: state.reservations.map(r => r.id === id ? { ...r, status } : r)
      })),
    }),
    { name: 'brothers-restaurant-storage' }
  )
)

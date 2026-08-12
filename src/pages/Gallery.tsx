import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRestaurantStore } from '../store/restaurantStore'
import type { GalleryPhoto } from '../store/restaurantStore'

const categories = [
  { id: 'all', label: 'Tutti' },
  { id: 'ambiente', label: 'Ambiente' },
  { id: 'piatti', label: 'I nostri piatti' },
  { id: 'biergarten', label: 'Biergarten' },
  { id: 'eventi', label: 'Events' },
]

export default function Gallery() {
  const { gallery } = useRestaurantStore()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightbox, setLightbox] = useState<{ photo: GalleryPhoto; index: number } | null>(null)

  const filtered = activeCategory === 'all'
    ? gallery
    : gallery.filter(p => p.category === activeCategory)

  const openLightbox = (photo: GalleryPhoto, index: number) => setLightbox({ photo, index })

  const closeLightbox = () => setLightbox(null)

  const navigate = (dir: number) => {
    if (!lightbox) return
    const newIndex = (lightbox.index + dir + filtered.length) % filtered.length
    setLightbox({ photo: filtered[newIndex], index: newIndex })
  }

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=80"
          alt="Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a2a]/60 to-[#1a3a2a]/85" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c8a96e]" />
              <span className="text-[#c8a96e] text-xs tracking-widest uppercase">Momenti indimenticabili</span>
            </div>
            <h1 className="font-serif text-6xl text-white font-bold">Gallerie</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#1a3a2a] text-[#c8a96e] shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#1a3a2a]/10 border border-gray-200'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => openLightbox(photo, i)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#1a3a2a]/0 group-hover:bg-[#1a3a2a]/50 transition-all duration-300 flex items-end">
                    <div className="p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-sm font-medium">{photo.caption}</p>
                      <p className="text-[#c8a96e] text-xs capitalize">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">Nessuna foto in questa categoria.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-[#c8a96e] transition-colors z-10"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-[#c8a96e] transition-colors z-10 bg-black/40 rounded-full p-3"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1) }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-[#c8a96e] transition-colors z-10 bg-black/40 rounded-full p-3"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={lightbox.photo.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full"
            >
              <img
                src={lightbox.photo.url}
                alt={lightbox.photo.caption}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">{lightbox.photo.caption}</p>
                <p className="text-[#c8a96e] text-sm capitalize mt-1">{lightbox.photo.category}</p>
                <p className="text-white/40 text-xs mt-2">{lightbox.index + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Flame, Award } from 'lucide-react'
import { useRestaurantStore } from '../store/restaurantStore'
import { useTranslation } from 'react-i18next'

const categories = ['Tutti', 'Antipasti', 'Primi', 'Pizze', 'Secondi', 'Dolci', 'Vini']

const categoryEmojis: Record<string, string> = {
  Antipasti: '🥗', Primi: '🍝', Pizze: '🍕', Secondi: '🥩', Dolci: '🍮', Vini: '🍷'
}

export default function Menu() {
  const { menuItems } = useRestaurantStore()
  const [activeCategory, setActiveCategory] = useState('Tutti')
  const { t } = useTranslation()

  const filtered = activeCategory === 'Tutti'
    ? menuItems
    : menuItems.filter(m => m.category === activeCategory)

  const grouped = categories.slice(1).reduce((acc, cat) => {
    const items = filtered.filter(m => m.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {} as Record<string, typeof menuItems>)

  return (
    <div className="min-h-screen bg-[#faf6ef]">
      <div className="relative h-72 bg-[#1a3a2a] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&q=80" alt="Menu" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c8a96e]" />
            <span className="text-[#c8a96e] text-xs tracking-widest uppercase">{t('menu_page.label')}</span>
          </div>
          <h1 className="font-serif text-6xl text-white font-bold">{t('menu_page.title')}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1a3a2a] text-[#c8a96e] shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#1a3a2a] hover:text-[#c8a96e] border border-gray-200'
              }`}
            >
              {cat !== 'Tutti' && categoryEmojis[cat] + ' '}{cat === 'Tutti' ? t('menu_page.all') : cat}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 justify-center mb-12 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award size={14} className="text-[#c8a96e]" />
            <span>{t('menu_page.chef_rec')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Flame size={14} className="text-[#8b1a1a]" />
            <span>{t('menu_page.popular')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Leaf size={14} className="text-green-600" />
            <span>{t('menu_page.vegetarian')}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl">{categoryEmojis[category]}</span>
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-[#1a3a2a]">{category}</h2>
                    <div className="h-0.5 w-16 bg-[#c8a96e] mt-1" />
                  </div>
                </div>

                <div className="space-y-1">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group bg-white hover:bg-[#1a3a2a] rounded-xl p-5 transition-all duration-300 border border-transparent hover:border-[#c8a96e]/30 shadow-sm hover:shadow-xl cursor-default"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="font-serif text-lg font-bold text-[#1a3a2a] group-hover:text-white transition-colors">{item.name}</h3>
                            {item.badge === 'chef' && (
                              <span className="bg-[#c8a96e] text-[#1a3a2a] text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Award size={9} /> Chef</span>
                            )}
                            {item.badge === 'popular' && (
                              <span className="bg-[#8b1a1a] text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Flame size={9} /> Top</span>
                            )}
                          </div>
                          <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">{item.description}</p>
                        </div>
                        <span className="font-serif text-2xl font-bold text-[#c8a96e] flex-shrink-0">€{item.price.toFixed(2)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 p-8 bg-[#1a3a2a] rounded-2xl text-center">
          <p className="text-[#c8a96e] font-serif text-lg italic mb-2">"{t('menu_page.note_title')}"</p>
          <p className="text-white/50 text-sm">{t('menu_page.note_sub')}</p>
        </div>
      </div>
    </div>
  )
}

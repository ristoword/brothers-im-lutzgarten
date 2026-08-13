import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Utensils } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/menu', label: t('nav.menu') },
    { href: '/eventi', label: t('nav.events') },
    { href: '/galleria', label: t('nav.gallery') },
    { href: '/feedback', label: t('nav.feedback') },
    { href: '/contatto', label: t('nav.contact') },
  ]

  const langs = ['de', 'it', 'en'] as const
  const setLang = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('brothers-lang', lang)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? 'bg-[#1a3a2a]/98 backdrop-blur-md shadow-2xl py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#c8a96e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils size={18} className="text-[#1a3a2a]" />
            </div>
            <div>
              <div className="font-serif text-white text-lg leading-tight font-bold tracking-wide">
                Brothers
              </div>
              <div className="text-[#c8a96e] text-[10px] tracking-[0.25em] uppercase font-light">
                im Lutzgarten
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 animated-underline ${
                  location.pathname === link.href
                    ? 'text-[#c8a96e]'
                    : 'text-white/80 hover:text-[#c8a96e]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/20 text-xs font-semibold">
              {langs.map((lang, idx) => (
                <span key={lang} className="flex items-center">
                  {idx > 0 && <span className="text-white/20 mx-1">|</span>}
                  <button
                    onClick={() => setLang(lang)}
                    className={`px-1.5 py-0.5 rounded transition-all duration-200 ${
                      i18n.language === lang
                        ? 'text-[#c8a96e] bg-white/10'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            <Link
              to="/prenotazione"
              className="bg-[#c8a96e] hover:bg-[#e8c98e] text-[#1a3a2a] font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#c8a96e]/30 hover:-translate-y-0.5"
            >
              {t('nav.reservation')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 bg-[#1a3a2a] flex flex-col pt-24 px-8 pb-8"
          >
            <div className="flex flex-col gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`text-2xl font-serif font-bold transition-colors ${
                      location.pathname === link.href
                        ? 'text-[#c8a96e]'
                        : 'text-white hover:text-[#c8a96e]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Language Switch */}
            <div className="mb-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20">
              {[
                { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
                { code: 'it', flag: '🇮🇹', label: 'Italiano' },
                { code: 'en', flag: '🇬🇧', label: 'English' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLang(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    i18n.language === lang.code
                      ? 'bg-[#c8a96e]/20 text-[#c8a96e]'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>

            <Link
              to="/prenotazione"
              className="block text-center bg-[#c8a96e] text-[#1a3a2a] font-bold text-lg py-4 rounded-2xl"
            >
              {t('nav.reservation')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Utensils, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f2218] text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent" />

      {/* Decorative background */}
      <div className="absolute inset-0 bg-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#c8a96e] flex items-center justify-center">
                <Utensils size={20} className="text-[#1a3a2a]" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold">Brothers</div>
                <div className="text-[#c8a96e] text-[10px] tracking-[0.3em] uppercase">im Lutzgarten</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Cucina italiana autentica nel cuore di Norimberga. Dal 1705, un luogo dove storia e sapori si incontrano.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#c8a96e] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xs font-bold">IG</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#c8a96e] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-[#c8a96e] text-lg mb-6">Navigazione</h4>
            <ul className="space-y-3">
              {[
                { to: '/menu', label: 'Speisekarte' },
                { to: '/eventi', label: 'Events' },
                { to: '/galleria', label: 'Gallerie' },
                { to: '/feedback', label: 'Reviews' },
                { to: '/prenotazione', label: 'Reservierung' },
                { to: '/contatto', label: 'Kontakt' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-[#c8a96e] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-[#c8a96e] text-lg mb-6">Öffnungszeiten</h4>
            <ul className="space-y-3">
              {[
                { day: 'Mo – Fr', time: '11:30 – 14:30' },
                { day: 'Mo – Fr', time: '17:30 – 22:30' },
                { day: 'Samstag', time: '12:00 – 23:00' },
                { day: 'Sonntag', time: '12:00 – 22:00' },
                { day: 'Dienstag', time: 'Ruhetag' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Clock size={14} className="text-[#c8a96e] mt-0.5 flex-shrink-0" />
                  <span className="text-white/60">
                    <span className="text-white/80 font-medium">{item.day}</span>{' '}
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-[#c8a96e] text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin size={16} className="text-[#c8a96e] flex-shrink-0 mt-0.5" />
                <span className="text-white/60">
                  Großreuth bei Schweinau 2<br />
                  90431 Nürnberg
                </span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone size={16} className="text-[#c8a96e] flex-shrink-0 mt-0.5" />
                <a href="tel:+49911XXXXXX" className="text-white/60 hover:text-[#c8a96e] transition-colors">
                  +49 (0)911 XXX XXXX
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail size={16} className="text-[#c8a96e] flex-shrink-0 mt-0.5" />
                <a href="mailto:info@brothersimlutzgarten.de" className="text-white/60 hover:text-[#c8a96e] transition-colors">
                  info@brothersimlutzgarten.de
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-[#c8a96e]/20">
              <p className="text-[#c8a96e] text-xs font-medium mb-1">🚇 Anreise</p>
              <p className="text-white/50 text-xs">U-Bahn: Großreuth<br />Bus: Linie 65, 66</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Brothers im Lutzgarten · Tutti i diritti riservati
          </p>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span>Made with</span>
            <span className="text-[#c8a96e]">♥</span>
            <span>in Italia · Nürnberg</span>
          </div>
          <Link to="/dashboard" className="text-white/20 hover:text-[#c8a96e] text-xs transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

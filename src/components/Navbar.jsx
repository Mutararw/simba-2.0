import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Sun, Moon, Languages, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Navbar = ({ theme, toggleTheme, lang, setLang }) => {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    en: { search: "Search products...", home: "Home", cart: "Cart", checkout: "Checkout" },
    fr: { search: "Rechercher...", home: "Accueil", cart: "Panier", checkout: "Paiement" },
    kn: { search: "Shaka ibicuruzwa...", home: "Ahabanza", cart: "Ikarita", checkout: "Kwishura" }
  }

  const t = translations[lang]

  return (
    <nav className="glass sticky-top" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '10px', fontWeight: '800', fontSize: '1.5rem' }}>S</div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-1px' }}>SIMBA <span style={{ color: 'var(--primary)' }}>2.0</span></span>
        </Link>

        <div className="search-bar" style={{ flex: 1, maxWidth: '500px', margin: '0 2rem', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder={t.search}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 3rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              color: 'var(--text)',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={toggleTheme} className="nav-btn" title="Toggle Theme">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="badge" style={{ position: 'absolute', top: '-8px', right: '-12px', fontSize: '0.65rem' }}>
                {cartCount}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setLang(lang === 'en' ? 'fr' : lang === 'fr' ? 'kn' : 'en')}>
            <Languages size={22} />
            <span style={{ fontWeight: '600', textTransform: 'uppercase' }}>{lang}</span>
          </div>

          <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

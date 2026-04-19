import React, { useState, useEffect } from 'react'
import productData from '../assets/products.json'
import ProductCard from '../components/ProductCard'
import { Filter, ChevronRight } from 'lucide-react'

const Home = ({ lang }) => {
  const [products, setProducts] = useState(productData.products)
  const [category, setCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', ...new Set(productData.products.map(p => p.category))]

  const translations = {
    en: { heroTitle: "Shop Rwanda's Best Products", heroSub: "Premium quality, fast delivery, and unbeatable prices.", featured: "Featured Products", categories: "Shop by Category" },
    fr: { heroTitle: "Achetez les Meilleurs Produits au Rwanda", heroSub: "Qualité premium, livraison rapide et prix imbattables.", featured: "Produits Vedettes", categories: "Acheter par Catégorie" },
    kn: { heroTitle: "Gura ibicuruzwa byiza mu Rwanda", heroSub: "Ibicuruzwa byiza, gutanga vuba, n'ibiciro bitagereranywa.", featured: "Ibicuruzwa Byatoranijwe", categories: "Gura ukurikije Icyiciro" }
  }

  const t = translations[lang]

  useEffect(() => {
    let filtered = productData.products
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category)
    }
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    setProducts(filtered)
  }, [category, searchQuery])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        marginBottom: '4rem'
      }}>
        <div className="container fade-in">
          <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-2px' }}>{t.heroTitle}</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>{t.heroSub}</p>
          <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
            Shop Now <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <div className="container">
        {/* Categories Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            <Filter size={20} />
            <span>{t.categories}:</span>
          </div>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              style={{ 
                padding: '0.6rem 1.25rem', 
                borderRadius: '12px', 
                whiteSpace: 'nowrap',
                background: category === cat ? 'var(--primary)' : 'var(--card)',
                color: category === cat ? 'white' : 'var(--text)',
                border: '1px solid var(--border)',
                fontWeight: '600',
                transition: 'var(--transition)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <section className="section-padding">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{t.featured}</h2>
            <span style={{ color: 'var(--text-muted)' }}>{products.length} products found</span>
          </div>
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home

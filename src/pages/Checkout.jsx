import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Phone, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Checkout = ({ lang }) => {
  const { cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Info, 2: Payment, 3: Success
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const translations = {
    en: { title: "Checkout", phone: "Phone Number", pay: "Pay with MoMo", success: "Order Successful!", back: "Back to Home" },
    fr: { title: "Paiement", phone: "Numéro de Téléphone", pay: "Payer avec MoMo", success: "Commande Réussie!", back: "Retour à l'Accueil" },
    kn: { title: "Kwishura", phone: "Nimero ya Telefone", pay: "Ishura na MoMo", success: "Byagenze neza!", back: "Subira Ahabanza" }
  }

  const t = translations[lang]

  const handlePayment = () => {
    setStep(2)
    setTimeout(() => {
      setStep(3)
      clearCart()
    }, 3000)
  }

  if (step === 3) {
    return (
      <div className="container section-padding fade-in" style={{ textAlign: 'center' }}>
        <CheckCircle2 size={80} color="#22c55e" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>{t.success}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Thank you for shopping with Simba 2.0. Your order is being processed.</p>
        <button onClick={() => navigate('/')} className="btn-primary">{t.back}</button>
      </div>
    )
  }

  return (
    <div className="container section-padding fade-in">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem', textAlign: 'center' }}>{t.title}</h1>

        <div className="glass" style={{ padding: '3rem', borderRadius: '32px' }}>
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Amount to Pay</span>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>{cartTotal.toLocaleString()} RWF</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-muted)' }}>{t.phone}</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="tel" 
                    placeholder="078X XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '1rem 1rem 1rem 3rem', 
                      borderRadius: '16px', 
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text)',
                      fontSize: '1.1rem'
                    }}
                  />
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={!phone}
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', opacity: phone ? 1 : 0.5 }}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/MTN_Logo.svg/1200px-MTN_Logo.svg.png" alt="MoMo" style={{ height: '24px', marginRight: '0.5rem' }} />
                {t.pay}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Loader2 size={60} className="spinner" style={{ color: 'var(--primary)', marginBottom: '2rem', animation: 'spin 2s linear infinite' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem' }}>Processing Payment...</h2>
              <p style={{ color: 'var(--text-muted)' }}>Please check your phone for the MoMo prompt.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default Checkout

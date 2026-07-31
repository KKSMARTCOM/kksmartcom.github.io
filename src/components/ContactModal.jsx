"use client";

import { useEffect } from "react";

export default function ContactModal({ open, onClose }) {
  const stop = (e) => e.stopPropagation();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100000,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div onClick={stop} style={{
        position: 'relative', width: 'min(1200px,96%)',
        backgroundColor: 'transparent', backgroundImage: 'url(/assets/img/bg.png)',
        borderRadius: 20, border: '1px solid #404242',
        padding: 24, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'stretch'
      }}>
        <button aria-label="Fermer" onClick={onClose} style={{
          position: 'fixed', right: 18, top: 18, width: 36, height: 36,
          borderRadius: 9999, background: '#fff', color: '#1F2122', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>✕</button>

        <div style={{
          flex: '1 1 340px', maxWidth: 520, padding: 24, borderRadius: 16,
          background: '000000'
        }}>
          <div style={{ fontSize: 36, lineHeight: '120%', fontWeight: 700, color: '#FBBC05' }}>
            Avez-vous besoin d'aide pour<br/> concrétiser une idée ?
          </div>
          <div style={{ marginTop: 24, color: '#FFFEFD' }}>hello@kksmartcom.com</div>
          <a href="https://wa.me/22956141438" target="_blank" rel="noopener noreferrer" style={{
            marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', borderRadius: 8, border: '1px solid #D9D9D9', color: '#FFFEFD', textDecoration: 'none'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a10 10 0 0 0-8.94 14.56L2 22l5.54-1.86A10 10 0 1 0 12 2Z" stroke="#FFFEFD" strokeWidth="1.5"/>
              <path d="M16.5 14.2c-.3.9-2.1 1.8-2.9 1.8-.7 0-2.7-.6-4.3-2.2-1.6-1.6-2.2-3.6-2.2-4.3 0-.8.9-2.6 1.8-2.9.6-.2.9 0 1.2.5.3.6.8 1.9.7 2.1-.1.2-.5.4-.7.6-.2.2-.2.4 0 .8.3.6.8 1.3 1.4 1.9.6.6 1.3 1.1 1.9 1.4.4.2.6.2.8 0 .2-.2.4-.6.6-.7.2-.1 1.5.4 2.1.7.5.3.7.6.5 1.2Z" fill="#FFFEFD"/>
            </svg>
            Whatsapp
          </a>
        </div>

        <form action="https://formspree.io/f/mkndvwgg" method="post" style={{
          flex: '1 1 520px', maxWidth: 720, padding: 24, borderRadius: 16,
          background: 'rgba(217,217,217,0.02)'
        }}>
          <label style={{ display: 'block', color: '#FFFEFD', marginBottom: 22 }}>
            <span style={{ display: 'block', marginBottom: 8 }}>Votre nom & prénoms <sup style={{ color: '#fe0162' }}>*</sup></span>
            <input type="text" name="Nom" required autoComplete="off" style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '2px solid #FFFEFD', color: '#FFFEFD', padding: '8px 0'
            }} />
          </label>
          <label style={{ display: 'block', color: '#FFFEFD', marginBottom: 22 }}>
            <span style={{ display: 'block', marginBottom: 8 }}>Votre email <sup style={{ color: '#fe0162' }}>*</sup></span>
            <input type="email" name="Email" required autoComplete="off" style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '2px solid #fe0162', color: '#FFFEFD', padding: '8px 0'
            }} />
          </label>
          <label style={{ display: 'block', color: '#FFFEFD', marginBottom: 24, position: 'relative' }}>
            <span style={{ display: 'block', marginBottom: 8 }}>Parlez nous de votre projet <sup style={{ color: '#fe0162' }}>*</sup></span>
            <textarea name="Message" required rows={5} maxLength={1000} style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '2px solid #FFFEFD', color: '#FFFEFD', padding: '8px 0', resize: 'vertical'
            }} />
            <span style={{ position: 'absolute', right: 0, bottom: -18, color: '#FFFEFD', opacity: 0.7 }}>0/1000</span>
          </label>
          <button type="submit" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#FFFEFD', color: '#1F2122', fontWeight: 700,
            padding: '12px 18px', borderRadius: 28, border: 'none', cursor: 'pointer'
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z" fill="#1F2122" />
            </svg>
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
}


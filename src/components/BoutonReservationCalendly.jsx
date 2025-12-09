"use client";

import { useEffect, useState } from "react";
// Ajout: intégrer le CookiePopup dans ce composant pour que
// l'acceptation des cookies n'affecte pas la visibilité du bouton
import CookiePopup from './CookiePopup';

export default function BoutonReservationCalendly() {
  const [calReady, setCalReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const iframeUrl = 'https://cal.com/kksmartcom/dg?embed=1';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If Cal is not defined yet, create a minimal queuing function so calls can be queued
    if (!window.Cal || typeof window.Cal !== 'function') {
      window.Cal = function () {
        window.Cal.q = window.Cal.q || [];
        window.Cal.q.push(arguments);
      };
      window.Cal.loaded = false;
    }

    const ensureInit = () => {
      try {
        if (typeof window.Cal === 'function') {
          // Avoid double init
          if (window.__cal_init_done) return;
          window.__cal_init_done = true;
          window.Cal('init', 'dg', { origin: 'https://cal.com' });
          // if namespaced API available, call it
          if (window.Cal.ns && window.Cal.ns.dg) {
            try {
              window.Cal.ns.dg('floatingButton', { calLink: 'kksmartcom/dg', buttonColor: '#333333', buttonTextColor: '#eaeaea', buttonText: 'Prendre rendez-vous', hideButtonIcon: false });
              window.Cal.ns.dg('ui', { styles: { branding: { brandColor: '#000000' } }, hideEventTypeDetails: false, layout: 'month_view' });
              // mark ready and hide our fallback button
              setCalReady(true);
              setVisible(false);
            } catch (e) {
              // ignore transient errors
              console.debug('Cal ns.dg init error', e);
            }
          }
        }
      } catch (e) {/* ignore */ }
    };

    // If script already present, try init immediately
    const existing = Array.from(document.getElementsByTagName('script')).find(s => s.src && s.src.indexOf('app.cal.com/embed/embed.js') !== -1);
    if (existing && existing.getAttribute('data-cal-loaded')) {
      ensureInit();
      return;
    }

    // Add script if not present
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://app.cal.com/embed/embed.js';
      s.async = true;
      s.onload = function () {
        try { s.setAttribute('data-cal-loaded', '1'); } catch (e) { }
        // Try init after load
        ensureInit();
      };
      s.onerror = function () { console.warn('Cal script failed to load'); setFailed(true); };
      document.head.appendChild(s);
    } else {
      if (!existing.getAttribute('data-cal-loaded')) {
        existing.addEventListener('load', function () {
          try { existing.setAttribute('data-cal-loaded', '1'); } catch (e) { }
          ensureInit();
        });
      } else {
        ensureInit();
      }
    }

    // Poll for namespaced API if init didn't run yet (some versions attach ns after async init)
    let checks = 0;
    const poll = setInterval(() => {
      checks++;
      if (window.Cal && window.Cal.ns && window.Cal.ns.dg) {
        ensureInit();
        clearInterval(poll);
        return;
      }
      if (checks > 50) { // ~5s
        clearInterval(poll);
        // mark failed so fallback is shown
        setFailed(true);
      }
    }, 100);
    return () => { clearInterval(poll); };
  }, []);

  // Manage body scroll lock and Escape key when modal is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [modalOpen]);

  return (
    <div id="bouton-reservationcalendly" style={{
      position: 'fixed',
      right: 20,
      bottom: 20,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '15px',
      pointerEvents: 'auto' // Allow clicks to pass through empty space
    }}>
      {/* Ajout: popup cookies intégré au composant du bouton 
      <div style={{ pointerEvents: 'auto' }}>
        <CookiePopup style={{ position: 'static', margin: 0 }} />
      </div>*/}
      {/* Render our styled floating button unless Cal's floating button is active */}
      {visible && (
        <div style={{ pointerEvents: 'auto' }}>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setModalOpen(true); setVisible(true); }}
            aria-label="Prendre rendez-vous"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#222',
              color: '#fff',
              padding: '10px',
              borderRadius: '28px',
              textDecoration: 'none',
              fontWeight: 600,
              boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'padding 0.3s ease'
            }}
            className="rdv-button"
          >
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 36, 
              height: 36, 
              borderRadius: 10 
            }} aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="white" strokeWidth="1.2" fill="none" />
                <path d="M16 3v4M8 3v4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 11h10M7 15h10" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ 
              color: '#fff', 
              fontWeight: 500, 
              fontSize: '1.2rem',
              display: 'none',
              whiteSpace: 'nowrap',
              marginLeft: '12px'
            }}>Prendre rendez-vous</span>
            <style jsx global>{`
              @media (min-width: 640px) {
                .rdv-button {
                  padding: 10px 20px !important;
                }
                .rdv-button span:last-child {
                  display: inline-block !important;
                }
              }
            `}</style>
          </button>
        </div>
      )}

      {/* If Cal failed to load, ensure we still show a fallback (keeps accessible) */}
      {failed && !calReady && !visible && (
        <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 99999 }}>
          <a href="https://cal.com/kksmartcom/dg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#333', color: '#fff', padding: '12px 18px', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Prendre rendez-vous</a>
        </div>
      )}

      {/* Modal iframe overlay */}
      {modalOpen && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', background: 'transparent', justifyContent: 'center' }}>
          <div onClick={() => setModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }}></div>
          <div style={{ position: 'relative', width: 'min(1500px,96%)', height: '95vh', background: 'transparent', borderRadius: 10, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <button aria-label="Fermer" onClick={() => setModalOpen(false)} style={{ position: 'absolute', right: 12, top: 12, zIndex: 2, background: 'transparent', border: 'none', color: '#333', fontSize: 20, cursor: 'pointer' }}>✕</button>
            <iframe src={iframeUrl} title="Prendre rendez-vous" style={{ width: '100%', height: '100%', border: 0, background: 'transparent' }} />
          </div>
        </div>
      )}
    </div>
  );
}

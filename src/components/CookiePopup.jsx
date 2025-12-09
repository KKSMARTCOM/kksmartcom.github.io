"use client";

import React, { useEffect, useState } from 'react';

const CookiePopup = ({ style }) => {
  const [show, setShow] = useState(() => {
    try {
      const consentGiven = localStorage.getItem('cookieConsent') === 'true';
      return !consentGiven;
    } catch (error) {
      // If localStorage is unavailable, default to showing popup
      console.warn('localStorage not available:', error);
      return true;
    }
  });

  const acceptConsent = () => {
    try {
      // Update Consent Mode
      const update = {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
      };

      if (typeof window !== 'undefined') {
        // Prefer gtag API
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', update);
        } else {
          // Fallback: push a custom event in dataLayer
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'consent_update', consent: update });
        }

        window.localStorage.setItem('cookieConsent', 'true');
      }
    } catch (_) {
      // ignore
    }
    setShow(false);
  };

  return (
    <div className="cookie-popup-wrap" style={{ display: show ? 'block' : 'none', ...style }}>
      {/* Popup cookies */}
      <div className="cookie-popup">
        <div className="pc-visible">
          <span>Cookies Policy</span>
          <p>
            We use our own cookies, as well as those of third parties, for individual as well as repeated
            sessions, in order to make the navigation of our website easy and safe for our users.
          </p>
          <div className="buttons">
            <button id="remove_cookies_popup" className="main-btn white" onClick={acceptConsent}>Accept cookies</button>
            <a target="_blank" href="/">Cookies policy</a>
          </div>
        </div>
        <div className="mob-visible">
          <div className="buttons">
            <p>
              We use our own cookies <a target="_blank" href="/">Learn more</a>
            </p>
            <button id="remove_cookies_popup_2" className="main-btn white" onClick={acceptConsent}>Accept</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;

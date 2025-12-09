"use client";
import React from "react";
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

const CTA = () => {
  const { lang } = useLang();
  const data = getComponentData('CTA', lang) || { projects: {}, services: {} };

  return (
  <div className="secrives-new-screen-9 is_view gray-background section">
    <div className="last_block">
      <div className="wrap view fadein target_section screen9-inner" id="how">
        <div className="sfr9">
          <div className="left" style={{ width: "100%" }}>
            <div className="section-heading decorable">
              <div className="pc-visible" dangerouslySetInnerHTML={{ __html: data.title }}></div>
              <div className="mob-visible" dangerouslySetInnerHTML={{ __html: data.title_mob }}></div>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
      <div className="bort gray-background over_parrallax">
        <div className="wrap view fadein">
          <div className="two-columns">
            <div className="col">
              <div className="h">{data.projects.title}</div>
              <p dangerouslySetInnerHTML={{ __html: data.projects.description }}></p>
              <a target="_blank" href="https://comeup.com/fr/@kk-smart-com" className="main-btn arrow toform">
                <span>
                  <svg fill="none" height="10" viewBox="0 0 9 10" width="9" xmlns="https://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="m.455752.5h8.544248v8.54425h-1.28906v-6.34368l-6.799434 6.79943-.911506-.91151 6.79943-6.79943h-6.343678z" fill="#fffefd" fillRule="evenodd" />
                  </svg>{data.projects.button}
                </span>
              </a>
            </div>
            <div className="col">
              <div className="h">{data.services.title}</div>
              <p dangerouslySetInnerHTML={{ __html: data.services.description }}></p>
              <a target="_blank" href="https://comeup.com/fr/@kk-smart-com" className="main-btn arrow toform">
                <span>
                  <svg fill="none" height="10" viewBox="0 0 9 10" width="9" xmlns="https://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="m.455752.5h8.544248v8.54425h-1.28906v-6.34368l-6.799434 6.79943-.911506-.91151 6.79943-6.79943h-6.343678z" fill="#fffefd" fillRule="evenodd" />
                  </svg>{data.services.button}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default CTA;

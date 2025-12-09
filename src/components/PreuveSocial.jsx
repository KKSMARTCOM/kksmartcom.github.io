"use client";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './PreuveSocial.module.css';
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

const ClientRow = ({ client }) => {
  let leftContent, rightContent = null;

  if (client.type === 'text_and_image') {
    leftContent = <div style={{fontSize: '30px', fontWeight: 'bold'}}>{client.name}</div>;
    rightContent = <img className="" src={client.image} alt="" loading="lazy" />;
  } else if (client.type === 'image') {
    leftContent = <img className="" src={client.logo} alt={client.name} loading="lazy" />;
  }

  return (
    <div className={`${styles.clientRow} ${styles.w35} ${styles.big}`}>
      <div className={styles.top}>
        <div className={styles.left}>{leftContent}</div>
        {rightContent && <div className={styles.right} id="go">{rightContent}</div>}
      </div>
      <div className={styles.h}> </div>
      <div className={`${styles.p} ${styles.small}`}>{client.description}</div>
    </div>
  );
};


const Review = ({ review }) => (
  <div className={styles.slide}>
    <div className={styles.reviewInner}>
      <div className={styles.topWrap}>
        <img src={review.reviewImg} alt="" loading="lazy" />
      </div>
      <div className={styles.text}>{review.text}</div>
      <div className={styles.etoiles}>
        <img src={review.etoilesImg} alt="" loading="lazy" />
      </div>
      <div className={styles.author}>
        <img src={review.authorImg} alt="" loading="lazy" />
        <div className={styles.bio}>
          <span>{review.author}</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <a target="_blank" href={review.lirePlusHref} rel="noopener noreferrer">
          <img src="/assets/img/au2.svg" alt="" />{review.readMoreText}
        </a>
      </div>
    </div>
  </div>
);

const PreuveSocial = () => {
  const { lang } = useLang();
  const data = getComponentData('PreuveSocial', lang) || { reviews: [], clients: [] };

  return (
    <div className="section newabout-screen3 black-background is_view target_section">
      <div className="reviews-target target_section" id="reviews">
        <div className="dec"></div>
        <div className="wrap">
          <div className="flex-row" style={{ marginTop: 0 }}>
            <div className="w80">
              <div className={`${styles.sectionHeading} decorable`}>
                <div className={styles.pcVisible} dangerouslySetInnerHTML={{ __html: data.title }}></div>
                <div className={styles.mobVisible} dangerouslySetInnerHTML={{ __html: data.title_mob }}></div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
        <div className="reviewsSlider">
          <div className={styles.reviewsSlider}>
            <Swiper
              spaceBetween={38}
              slidesPerView={1}
              grabCursor={false}
              breakpoints={{
                300: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 38 },
                1110: { slidesPerView: 3, spaceBetween: 18 }
              }}
            >
              {data.reviews.map((review, idx) => (
                <SwiperSlide key={idx}>
                  <Review review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Section Awards */}
      <div className="wrap">
        <div className="awards-cta">
          <div className="cta_button">
            <a href="#contact-form" className="toform">
              <span><b>{data.getQuote}</b></span>
              <span><b><svg width="59" height="60" viewBox="0 0 59 60" fill="none" xmlns="https://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M29.4974 0.664062L58.8307 29.9974L29.4974 59.3307L25.0719 54.9052L46.8504 32.6641H0.164062V27.3307H46.8504L25.0719 5.08956L29.4974 0.664062Z" fill="#1F2122">
              </path></svg> {data.collaborate}</b></span>
            </a>
          </div>
        </div>
      </div>
      <div className="target_section" id="awards">
        <div className="wrap">
          <div className="flex-row mrgt120">
            <div className="w100 view textslide">
              <div className={`${styles.sectionHeading} borderb decorable`}>
                <div className={styles.pcVisible}>{data.trustedBy}</div>
                <div className={styles.mobVisible}>{data.trustedBy}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className={styles.awardsDetails}>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              grabCursor={false}
              loop={true}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 1, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
              }}
            >
              {data.clients.map((client, idx) => (
                <SwiperSlide key={idx} style={{height: 'auto'}}>
                  <ClientRow client={client} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Prix card positioned below the carousel */}
          <div className={`${styles.clientRow} ${styles.light} ${styles.full} ${styles.prizeCard}`} style={{marginTop: '-30px'}}>
            <div className={styles.top}>
              <div className={styles.left} id="dim9">
                <img className="" id="dim9" src="/assets/clients/engie.svg" alt="" loading="lazy" />
              </div>
              <div className={`${styles.right} ${styles.kubok}`}>
                <img className="" src="/assets/uploads/2022/12/5.svg" alt="" loading="lazy" />
              </div>
            </div>
            <div className={styles.h} id ="hengie">{data.prizeTitle}</div>
            <div className={`${styles.p} ${styles.big}`} id="pengie">{data.prizeDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreuveSocial;

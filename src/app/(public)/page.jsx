"use client";
import React from 'react';
import { useLang } from '@/context/LangContext';
import Hero from '../../components/Hero';
import Service from '../../components/Service';
import SocialCta from '../../components/SocialCta';
import ContactSection from '../../components/ContactSection';

export default function Home() {
  const { lang } = useLang();
  console.log(`[Page] Lang from context: ${lang}`);
  return (
    <>
      <Hero lang={lang} />
      <Service lang={lang} />
      <SocialCta lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}
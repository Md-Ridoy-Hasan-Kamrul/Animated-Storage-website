import React from 'react';
import FadeIn from './FadeIn';
import { ContactButton } from './Buttons';

const ContactSection = () => (
  <section
    id="contact"
    className="relative flex min-h-[70vh] flex-col items-center justify-center bg-[#0C0C0C] px-5 py-24 text-center sm:px-8 md:px-10"
  >
    <FadeIn delay={0} y={40}>
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Contact
      </h2>
    </FadeIn>
    <FadeIn delay={0.15} y={24} className="mt-8 max-w-xl">
      <p
        className="font-medium leading-relaxed text-[#D7E2EA]"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
      >
        Ready to build something unforgettable? Let&apos;s talk about your next 3D, branding, or
        web experience.
      </p>
    </FadeIn>
    <FadeIn delay={0.3} y={20} className="mt-12">
      <ContactButton
        label="Say Hello"
        onClick={() => {
          window.location.href = 'mailto:hello@kamrul.studio';
        }}
      />
    </FadeIn>
  </section>
);

export default ContactSection;

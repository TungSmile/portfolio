import React from 'react';
import FadeIn from '../components/FadeIn';

export const HeroSection: React.FC = () => {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <section className="h-screen w-full flex flex-col justify-between overflow-x-clip relative select-none bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="w-full px-6 md:px-10 pt-6 md:pt-8 z-30"
      >
        <ul className="flex items-center justify-between w-full list-none p-0 m-0">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden flex-1 flex items-center justify-center z-0 text-center pointer-events-none px-4">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] m-0 text-center">
            Dao Tung
          </h1>
        </FadeIn>
      </div>

      {/* 3. Bottom bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)] m-0">
            Portfolio về các dự án vị trí PA, Game Dev
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;

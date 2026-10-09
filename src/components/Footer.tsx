import React from 'react';
import { ArrowUp, Sparkles, Mail } from 'lucide-react';
import FadeIn from './FadeIn';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] pt-16 pb-12 px-6 md:px-10 border-t border-white/5 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={20} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#BBCCD7]">
            <Sparkles size={14} className="text-[#B600A8]" />
            Ready to bring your ideas to life
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={25} className="mb-12">
          <h2 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight m-0">
            Let&apos;s Create Something Unforgettable
          </h2>
        </FadeIn>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10 text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Dao Thanh Tung</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:jack@3dcreator.design" className="hover:text-white transition-colors flex items-center gap-1.5 no-underline">
              <Mail size={14} /> tungmonkey1101@gmail.com
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-inherit uppercase"
            >
              Top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

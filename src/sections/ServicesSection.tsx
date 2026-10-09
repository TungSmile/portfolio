import React from 'react';
import FadeIn from '../components/FadeIn';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    id: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    id: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    id: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    id: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      {/* Section Heading */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-28 text-center">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight m-0">
          Services
        </h2>
      </FadeIn>

      {/* Services List */}
      <div className="max-w-5xl mx-auto border-t border-[rgba(12,12,12,0.15)]">
        {SERVICES.map((service, index) => (
          <FadeIn
            key={service.id}
            delay={index * 0.1}
            y={25}
            className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 group transition-colors duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 md:gap-16">
              {/* Left Number */}
              <div className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none select-none min-w-[90px] sm:min-w-[140px] md:min-w-[180px] transition-transform duration-300 group-hover:translate-x-1">
                {service.id}
              </div>

              {/* Right Stack: Name & Description */}
              <div className="flex flex-col justify-center flex-1">
                <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] mb-2 tracking-normal">
                  {service.name}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60 m-0">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C] z-10"
    >
      {/* Corner 3D Image 1: Top-left Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D icon"
            loading="lazy"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* Corner 3D Image 2: Bottom-left 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D object"
            loading="lazy"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* Corner 3D Image 3: Top-right Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego 3D icon"
            loading="lazy"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* Corner 3D Image 4: Bottom-right 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D geometric group"
            loading="lazy"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </FadeIn>
      </div>

      {/* Center content container */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)] m-0">
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="w-full">
          <AnimatedText
            text="Lập trình viên Game với hơn 3 năm kinh nghiệm phát triển game trên đa nền tảng (PC, Mobile, Web) sử dụng Cocos Engine.
Có thế mạnh trong việc tối ưu hóa hiệu năng (performance), thiết kế Pa giúp kích thích nhu cầu tải về thực tế cũng như tăng xu hướng gắn bó và chất lượng user . Đã tham gia phát triển thành công 1 vài tựa game xuất bản lên Google Play/App Store."
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

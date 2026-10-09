import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 select-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalLength = text.length;
  const words = text.split(' ');

  let runningCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto text-[clamp(1rem,2vw,1.35rem)] ${className}`}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const wordElement = (
          <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const start = runningCharIndex / totalLength;
              const end = Math.min(1, (runningCharIndex + 1) / totalLength);
              runningCharIndex++;

              return (
                <Char
                  key={`char-${runningCharIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );

        const hasSpaceAfter = wordIdx < words.length - 1;
        let spaceElement = null;

        if (hasSpaceAfter) {
          const spaceStart = runningCharIndex / totalLength;
          const spaceEnd = Math.min(1, (runningCharIndex + 1) / totalLength);
          runningCharIndex++;

          spaceElement = (
            <Char
              key={`space-${runningCharIndex}`}
              char=" "
              progress={scrollYProgress}
              range={[spaceStart, spaceEnd]}
            />
          );
        }

        return (
          <React.Fragment key={`wrapper-${wordIdx}`}>
            {wordElement}
            {spaceElement}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default AnimatedText;

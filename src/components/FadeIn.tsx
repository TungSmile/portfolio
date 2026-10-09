import React, { ElementType } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap | ElementType;
  id?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div',
  ...rest
}) => {
  // Use motion.create for dynamic element types as specified
  const MotionComponent = React.useMemo(() => {
    return motion.create(as as any);
  }, [as]);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;

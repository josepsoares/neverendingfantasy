import React, { useEffect } from 'react';
import { useAnimation, motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BoxVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 1.25
    }
  },
  hidden: { opacity: 0, y: 75 }
};

const AnimatedBox: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children
}) => {
  const intersectionObject = {
    triggerOnce: true,
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const controls = useAnimation();
  const [ref, inView] = useInView(intersectionObject);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={BoxVariants}
      style={{ position: 'relative' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBox;

import React, { useEffect, useRef } from 'react';
import { useAnimation, motion, useInView } from 'framer-motion';

const BoxVariants = {
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

const MotionBox: React.FC<{ children?: JSX.Element | JSX.Element[] }> = ({
  children
}) => {
  const ref = useRef(null);
  const intersectionObject = {
    triggerOnce: true,
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const controls = useAnimation();
  const inView = useInView(ref, { once: true, ...intersectionObject });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      style={{ position: 'relative' }}
      animate={controls}
      initial="hidden"
      variants={BoxVariants}
    >
      {children}
    </motion.div>
  );
};

export default MotionBox;

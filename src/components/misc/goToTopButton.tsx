import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const GoToTopButton: React.FC = () => {
  const [threshold, setThreshold] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScroll = () => {
    setThreshold(window.scrollY >= 650);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, display: 'none' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      animate={
        threshold
          ? { display: 'flex', opacity: 1 }
          : { opacity: 0, transitionEnd: { display: 'none' } }
      }
    >
      <IconButton
        aria-label="Go to Top"
        bgColor="brand.300"
        colorScheme="brand"
        rounded="full"
        boxShadow="dark-lg"
        boxSize="12"
        position="fixed"
        top="90%"
        right="5%"
        zIndex="101"
        onClick={() => scrollToTop()}
        icon={
          <Icon icon="bx:chevron-up" color="white" width="25px" height="25px" />
        }
      />
    </motion.div>
  );
};

export default GoToTopButton;

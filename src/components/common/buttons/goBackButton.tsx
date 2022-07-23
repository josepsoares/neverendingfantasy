import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const GoBackButton = () => {
  const router = useRouter();

  return router.pathname !== '/' ? (
    <motion.div
      initial={{ opacity: 0, display: 'none' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      animate={{ display: 'flex', opacity: 1 }}
    >
      <IconButton
        aria-label="Go back"
        bgColor="brand.200"
        colorScheme="brand"
        rounded="full"
        boxShadow="md"
        boxSize={16}
        position="fixed"
        top="90%"
        left="5%"
        zIndex="101"
        onClick={() => router.back()}
        icon={
          <Icon
            icon="bx:bx-arrow-back"
            color="white"
            width="25px"
            height="25px"
          />
        }
      />
    </motion.div>
  ) : null;
};

export default GoBackButton;

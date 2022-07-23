import { Box } from '@chakra-ui/react';

const BgBlueBox = () => {
  return (
    <Box
      w="100%"
      h="100%"
      opacity="0.7"
      position="absolute"
      zIndex="-1"
      transition="background-color 1s linear"
      background="#003877"
      sx={{
        '&:hover, &:active': {
          background: '#0054ae'
        }
      }}
    />
  );
};

export default BgBlueBox;

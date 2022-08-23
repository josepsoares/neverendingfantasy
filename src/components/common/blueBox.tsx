import { Box } from '@chakra-ui/react';

const BlueBox: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box
      w="100%"
      transition="background-color 1s linear"
      background="#0064d7"
      _hover={{
        bgColor: '#1763b4'
      }}
      _active={{
        bgColor: '#1763b4'
      }}
    >
      {children}
    </Box>
  );
};

export default BlueBox;

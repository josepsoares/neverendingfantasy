import { Flex } from '@chakra-ui/react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex
      p={8}
      rounded="lg"
      boxShadow="lg"
      flexDir="column"
      justifyContent="start"
    >
      {children}
    </Flex>
  );
};

export default Card;

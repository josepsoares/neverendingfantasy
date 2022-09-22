import { Flex, SpaceProps } from '@chakra-ui/react';

const Card: React.FC<{
  children: React.ReactNode;
  isButton?: boolean;
  p?: SpaceProps['p'];
  onClick?: React.MouseEventHandler;
}> = ({ children, isButton = false, p = 6, onClick }) => {
  return (
    <Flex
      p={p}
      w="full"
      h="full"
      gap={4}
      as={isButton ? 'button' : 'div'}
      borderRadius="lg"
      flexDir="column"
      justify="center"
      alignItems="center"
      bgColor="brand.600"
      textColor="white"
      boxShadow="md"
      transition="background-color 0.5s linear"
      onClick={e => (onClick ? onClick(e) : null)}
      _hover={
        isButton
          ? {
              bgColor: 'brand.400'
            }
          : null
      }
      _active={
        isButton
          ? {
              bgColor: 'brand.400'
            }
          : null
      }
    >
      {children}
    </Flex>
  );
};

export default Card;

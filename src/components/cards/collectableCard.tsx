import {
  Box,
  Button,
  Flex,
  LayoutProps,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';

const CollectableCard: React.FC<{
  isButton?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ isButton = false, onClick, children }) => {
  return (
    <Button
      top="0"
      h="auto"
      p="6"
      textColor="white"
      border="2px"
      boxShadow="md"
      display="flex"
      flexDir="column"
      borderRadius="lg"
      textAlign="left"
      alignItems="flex-start"
      bgColor="brand.600"
      borderColor="blue.300"
      fontWeight="normal"
      whiteSpace="normal"
      position="relative"
      bgGradient="linear(to-br, brand.300, brand.700)"
      transition="all"
      transitionDuration="0.2s"
      as={!isButton ? 'div' : 'button'}
      onClick={onClick || null}
      _hover={{
        top: '-5px',
        img: {
          opacity: '100%'
        }
      }}
      _active={{
        top: '-5px',
        img: {
          opacity: '100%'
        }
      }}
    >
      {children}
    </Button>
  );
};

const CollectableCardSkeleton: React.FC<{
  imgH?: LayoutProps['h'];
  imgW?: LayoutProps['w'];
}> = ({ imgH = '48', imgW = '28' }) => {
  return (
    <Box
      gap="4"
      border="2px"
      boxShadow="md"
      display="flex"
      flexDir="column"
      borderRadius="lg"
      bgColor="brand.600"
      borderColor="blue.300"
      bgGradient="linear(to-br, brand.300, brand.700)"
    >
      <Skeleton w={imgW} height={imgH} />
      <Box gap="2" w="100%">
        <SkeletonText h="90px" pb="4" noOfLines={2} />
        <Skeleton height="28" w="full" />
      </Box>
    </Box>
  );
};

export { CollectableCard, CollectableCardSkeleton };

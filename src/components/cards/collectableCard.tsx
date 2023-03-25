import React from 'react';

import {
  Box,
  Button,
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
      p="6"
      top="0"
      gap="4"
      h="full"
      w="full"
      textColor="white"
      border="2px"
      boxShadow="md"
      display="flex"
      flexDir="column"
      borderRadius="lg"
      textAlign="left"
      alignItems="flex-start"
      justifyContent="flex-start"
      bgColor="brand.500"
      borderColor="blue.300"
      fontWeight="normal"
      whiteSpace="normal"
      position="relative"
      bgGradient="linear(to-br, brand.300, brand.700)"
      transition="all ease-in-out 0.2s"
      as={!isButton ? 'div' : 'button'}
      onClick={onClick || null}
      _hover={{
        img: {
          opacity: '100%'
        }
      }}
      _active={{
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
  skeletonTitleNoOfLines?: number;
  skeletonContentH?: LayoutProps['h'];
}> = ({
  imgH = '48',
  imgW = '28',
  skeletonTitleNoOfLines = 1,
  skeletonContentH = '44'
}) => {
  return (
    <Box
      p="6"
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
      <Skeleton mx="auto" w={imgW} height={imgH} />
      <Box gap="2" w="100%">
        <SkeletonText
          noOfLines={skeletonTitleNoOfLines}
          skeletonHeight="40px"
          mb="6"
        />
        <Skeleton w="full" h={skeletonContentH} />
      </Box>
    </Box>
  );
};

export { CollectableCard, CollectableCardSkeleton };

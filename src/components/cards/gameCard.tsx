import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import type { IGame } from '@ts/interfaces/rawgInterfaces';

const GameCard: React.FC<{ game: IGame }> = ({ game }) => {
  return (
    <Flex
      top="0"
      as={Link}
      border="2px"
      boxShadow="md"
      display="flex"
      flexDir="column"
      borderRadius="lg"
      bgColor="brand.600"
      borderColor="blue.300"
      position="relative"
      href={`/games/${game.id}`}
      bgGradient="linear(to-br, brand.300, brand.700)"
      transition="all"
      transitionDuration="0.2s"
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
      <Box w="100%" position="relative">
        <Image
          w="full"
          height="48"
          opacity="65%"
          objectFit="cover"
          transition="ease-in-out"
          borderTopLeftRadius="md"
          borderTopRightRadius="md"
          transitionDuration="0.2s"
          borderBottomRightRadius={0}
          borderBottomLeftRadius={0}
          src={game.background_image}
          fallbackSrc="/assets/img/placeholder.png"
          alt={game.background_image ? `${game.name} Image` : 'Placeholder'}
        />
      </Box>
      <Box py="6" px="8" w="100%" textColor="white">
        <Heading
          as="h4"
          h="90px"
          pb="4"
          noOfLines={2}
          fontSize="4xl"
          letterSpacing="wide"
        >
          {game.name}
        </Heading>
        <Flex gap="2" flexDir="row" alignItems="center">
          <Icon icon="bx:bxs-game" />
          <Text fontSize="md" noOfLines={1}>
            {game.genres.map(genre => genre.name).join(', ')}
          </Text>
        </Flex>
        <Flex gap="2" flexDir="row" alignItems="center">
          <Icon icon="bx:bx-calendar" />
          <Text fontSize="md">
            {game.tba ? 'To be announced' : game.released}
          </Text>
        </Flex>
        <Flex gap="2" flexDir="row" alignItems="center">
          <Icon icon="bx:bxs-star" />
          <Text fontSize="md">{game.rating || 'No rating yet'}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const GameCardSkeleton = () => {
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
    >
      <Skeleton
        borderBottomRightRadius={0}
        borderBottomLeftRadius={0}
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        height="48"
        w="full"
      />
      <Box py="6" px="8" w="100%" textColor="white">
        <SkeletonText
          h="90px"
          pb="4"
          noOfLines={2}
          fontSize="4xl"
          letterSpacing="wide"
        />
        <Flex gap="2" flexDir="row" alignItems="center">
          <Icon icon="bx:bxs-game" />
          <SkeletonText fontSize="md" noOfLines={1} />
        </Flex>
        <Flex gap="2" flexDir="row" alignItems="center">
          <Icon icon="bx:bx-calendar" />
          <SkeletonText fontSize="md" noOfLines={1} />
        </Flex>
        <Flex gap="2" flexDir="row" alignItems="center">
          <Icon icon="bx:bxs-star" />
          <SkeletonText fontSize="md" noOfLines={1} />
        </Flex>
      </Box>
    </Box>
  );
};

export default { GameCard, GameCardSkeleton };

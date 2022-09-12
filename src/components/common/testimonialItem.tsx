import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const TestimonialItem: React.FC<{
  name: string;
  img: string;
  profession: string;
  quote: string;
  itemId: string;
}> = ({ name, img, profession, quote }) => {
  return (
    <Flex
      p={6}
      bgColor="brand.500"
      color="white"
      flexDir="row"
      borderRadius="3xl"
    >
      <Image
        w="28"
        h="28"
        mr={8}
        objectFit="cover"
        objectPosition="center"
        borderRadius="full"
        src={img}
        alt={name}
      />
      <Box>
        <Text mb={4}>
          <Icon
            style={{ display: 'inline', marginRight: '5px' }}
            icon="bxs:quote-alt-left"
            color="white"
            height="25px"
            width="25px"
          />
          {quote}
        </Text>
        <Text as="h6" fontWeight="bold">
          {name}
        </Text>
        <Text>{profession}</Text>
      </Box>
    </Flex>
  );
};

export default TestimonialItem;

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const TestimonialItem: React.FC<{
  name: string;
  img: string;
  profession: string;
  quote: string;
  gridColSm?: string;
  gridColMd?: string;
  gridColLg?: string;
  gridCol4K?: string;
  rowLg?: string;
}> = ({
  name,
  img,
  profession,
  quote,
  gridColSm,
  gridColMd,
  gridColLg,
  gridCol4K,
  rowLg
}) => {
  return (
    <Flex
      p={6}
      bgColor="brand.500"
      color="white"
      flexDir="column"
      borderRadius="3xl"
      justifyContent="center"
      gridColumn={{
        sm: null,
        md: null,
        lg: gridColSm,
        xl: gridColMd,
        '2xl': gridColLg,
        '3xl': gridCol4K
      }}
      gridRowStart={{
        base: 'auto',
        lg: rowLg,
        xl: 'auto',
        '2xl': rowLg,
        '3xl': 'auto'
      }}
    >
      <Text mb={6} fontSize="2xl">
        <Icon
          style={{ display: 'inline', marginRight: '5px' }}
          icon="bxs:quote-alt-left"
          color="white"
          height="25px"
          width="25px"
        />
        {quote}
      </Text>
      <Flex alignItems="center" flexDir="row">
        <Image
          w={20}
          h={20}
          mr={6}
          objectFit="cover"
          objectPosition="center"
          borderRadius="full"
          justifySelf="center"
          src={`/assets/img/${img}`}
          alt={name}
        />
        <Box>
          <Text as="h6" fontWeight="bold">
            {name}
          </Text>
          <Text>{profession}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TestimonialItem;

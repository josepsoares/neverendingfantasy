import { Box, Heading, Spinner } from '@chakra-ui/react';
import SEO from '@components/common/seo';

const Loading = () => {
  return (
    <>
      <SEO title="Loading" />
      <Box
        pt={20}
        width="100%"
        height="100%"
        dir="column"
        justify="center"
        align="center"
      >
        <Spinner boxSize={24} color="brand.500" />
        <Heading as="h4" textColor="brand.500" mt={8}>
          Replenishing mana...
        </Heading>
      </Box>
    </>
  );
};

export default Loading;

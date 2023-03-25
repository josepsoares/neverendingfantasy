import { Box, Heading, Text } from '@chakra-ui/react';

import Container from '@components/container';
import SEO from '@components/seo';

const CollectablesLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
}> = ({ children, title, description }) => {
  return (
    <>
      <SEO title={`${title} - FFXIV Colectables`} />
      <Container pt="12">
        <Heading fontSize="8xl" as="h1" pt="2" color="brand.800">
          {title}
        </Heading>

        <Text mt="-1" mb="10">
          {description}
        </Text>

        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default CollectablesLayout;

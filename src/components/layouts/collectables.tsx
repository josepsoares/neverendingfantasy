import { Box, Heading, Text } from '@chakra-ui/react';
import Container from '@components/container';
import SEO from '@components/seo';

const CollectablesLayout: React.FC<{
  children: React.ReactNode;
  seo: string;
  title: string;
  description: string;
}> = ({ children, seo, title, description }) => {
  return (
    <>
      <SEO title={seo} />
      <Container py="16">
        <Heading fontSize="8xl" as="h1" pt="2" color="brand.800">
          {title}
        </Heading>

        <Text mt="-1" mb="5">
          {description}
        </Text>

        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default CollectablesLayout;

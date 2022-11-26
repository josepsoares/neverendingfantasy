import { Flex, Heading } from '@chakra-ui/react';
import SEO from '@components/common/seo';
import Image from 'next/image';

export default function Custom404() {
  return (
    <>
      <SEO title="404" />

      <Flex flexDir="column" justify="center" alignItems="center" minH="80%">
        <Image
          src="/assets/img/error_tonberry.png"
          alt="Tonberry Image"
          width={150}
          height={150}
        />
        <Heading pt="8" as="h1" fontSize="7xl" color="brand.500">
          404 - Page Not Found
        </Heading>
      </Flex>
    </>
  );
}

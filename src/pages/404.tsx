import Image from 'next/image';
import Link from 'next/link';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import SEO from '@components/seo';

export default function Custom404() {
  return (
    <>
      <SEO title="404" />

      <Flex flexDir="column" justify="center" alignItems="center" minH="100%">
        <Image
          src="/assets/img/error_tonberry.png"
          alt="Tonberry Image"
          width={150}
          height={150}
        />
        <Heading mt="8" mb="4" as="h1" fontSize="7xl" color="brand.500">
          404 - Page Not Found
        </Heading>
        <Link href="/">
          <Button
            colorScheme="brand"
            leftIcon={<Icon icon="bx:bx-filter" />}
            aria-label="Filter"
          >
            Go to Homepage
          </Button>
        </Link>
      </Flex>
    </>
  );
}

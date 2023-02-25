import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import SEO from '@components/seo';

const Error = () => {
  const router = useRouter();

  return (
    <>
      <SEO title="Error" />
      <Flex flexDir="column" alignItems="center" justifyContent="center">
        <Heading color="brand.700" fontSize="4xl" as="h1">
          An error occurred
        </Heading>
        <Box py={10}>
          <Image
            src="/assets/img/error_tonberry.png"
            alt="Tonberry Image"
            width={100}
            height={100}
          />
        </Box>
        <Text textAlign="center" mb="8">
          Something went wrong... Run before Tonberry goes after you...
        </Text>
        <ButtonGroup gap="4" flexWrap="wrap">
          {router.pathname !== '/' && (
            <Link href="/">
              <Button
                colorScheme="brand"
                leftIcon={<Icon icon="bx:bxs-home" />}
              >
                Go back to Home
              </Button>
            </Link>
          )}
          <Button
            leftIcon={<Icon icon="bx:bx-refresh" />}
            onClick={() => window !== undefined && window.location.reload()}
          >
            Refresh
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Error;

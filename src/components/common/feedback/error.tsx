import Link from 'next/link';
import { useRouter } from 'next/router';

import SEO from '@components/common/seo';
import Image from 'next/image';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const Error = () => {
  const router = useRouter();

  return (
    <>
      <SEO title="Error" />
      <Flex
        pt={20}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1">An error occurred</Heading>
        <Box py={10}>
          <Image
            src={require('../../../assets/img/error_tonberry.png')}
            alt="Tonberry Image"
            placeholder="blur"
            width={100}
            height={100}
          />
        </Box>
        <Text textAlign="center" mb={8}>
          Something went wrong... Run before Tonberry goes after you...
        </Text>
        {router.pathname !== '/' && (
          <Link href="/">
            <a>
              <Box justifyContent="center">
                <Button
                  colorScheme="brand"
                  leftIcon={<Icon icon="bx:bxs-home" />}
                >
                  Go back to Home
                </Button>
              </Box>
            </a>
          </Link>
        )}
        <Button
          mt={4}
          leftIcon={<Icon icon="bx:bx-refresh" />}
          onClick={() => window !== undefined && window.location.reload()}
        >
          Refresh
        </Button>
      </Flex>
    </>
  );
};

export default Error;

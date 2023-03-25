import type { NextPage } from 'next';

import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { Box, Button, Heading, SimpleGrid, VStack } from '@chakra-ui/react';

import Container from '@components/container';
import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import SEO from '@components/seo';
import { indexClassJobs } from '@services/ffxivApi';
import { FFXIV_API } from '@utils/constants';
import { _cap } from '@utils/helpers/string';

const ClassJobCard: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href
}) => {
  return (
    <Button
      top="0"
      h="auto"
      p="6"
      gap="4"
      href={href}
      textColor="white"
      border="2px"
      boxShadow="md"
      display="flex"
      flexDir="column"
      borderRadius="lg"
      textAlign="left"
      alignItems="center"
      bgColor="brand.600"
      borderColor="blue.300"
      fontWeight="normal"
      whiteSpace="normal"
      position="relative"
      bgGradient="linear(to-br, brand.300, brand.700)"
      transition="all ease-in-out 0.2s"
      as={Link}
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
      {children}
    </Button>
  );
};

const ClassJob: NextPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['classjobs'],
    queryFn: indexClassJobs
  });

  return (
    <>
      <SEO title="Clas/Jobs - FFXIV" />
      <Container py="16">
        <Heading color="brand.800" fontSize="8xl" as="h1" pb={8}>
          Classes and Jobs
        </Heading>

        {error ? (
          <Error />
        ) : isLoading ? (
          <Loading />
        ) : data ? (
          <VStack spacing="20">
            <Box w="full">
              <Heading as="h2" letterSpacing="normal" fontFamily="body" pb="8">
                Disciples of War / Magic
              </Heading>

              <SimpleGrid columns={[1, null, 2, 3, 4, 5]} gap={8}>
                {data.Results.filter(item => item.ID < 8 || item.ID > 18).map(
                  (classJob, i) => (
                    <ClassJobCard
                      key={i}
                      href={`/ffxiv/classjobs/${classJob.ID}`}
                    >
                      <Image
                        src={`${FFXIV_API}${classJob.Icon}`}
                        width="85"
                        height="80"
                        alt={`${classJob.Name} Icon`}
                      />
                      <Heading noOfLines={1} fontSize="3xl" as="h2">
                        {_cap(classJob.Name)}
                      </Heading>
                    </ClassJobCard>
                  )
                )}
              </SimpleGrid>
            </Box>
            <Box w="full">
              <Heading as="h2" letterSpacing="normal" fontFamily="body" pb={8}>
                Disciples of the Hand / Land
              </Heading>

              <SimpleGrid columns={[1, null, 2, 3, 4, 5]} gap={8}>
                {data.Results.filter(item => item.ID >= 8 && item.ID <= 18).map(
                  (classJob, i) => (
                    <ClassJobCard
                      key={i}
                      href={`/ffxiv/classjobs/${classJob.ID}`}
                    >
                      <Image
                        width="85"
                        height="80"
                        src={`${FFXIV_API}${classJob.Icon}`}
                        alt={`${classJob.Name} Icon`}
                      />
                      <Heading noOfLines={1} fontSize="3xl" as="h3">
                        {_cap(classJob.Name)}
                      </Heading>
                    </ClassJobCard>
                  )
                )}
              </SimpleGrid>
            </Box>
          </VStack>
        ) : null}
      </Container>
    </>
  );
};

export default ClassJob;

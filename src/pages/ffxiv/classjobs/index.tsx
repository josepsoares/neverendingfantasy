import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

import { useIndexClassJobsQuery } from '@services/api/ffxivApi';
import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import SEO from '@components/common/seo';
import { FFXIV_API } from '@utils/constants';
import { capitalizeString } from '@utils/helpers/capitalizeString';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Card from '@components/common/card';

const ClassJob: NextPage = () => {
  const router = useRouter();

  const classJobs = useIndexClassJobsQuery();
  const { data, error, isLoading } = classJobs;

  // console.log(data);

  console.log(data);

  console.log(router.query.item);

  return (
    <>
      <SEO title="Class Jobs - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading color="brand.800" fontSize="8xl" as="h1" pb={8}>
          Classes and Jobs
        </Heading>

        {error ? (
          <Error />
        ) : isLoading ? (
          <Loading />
        ) : data ? (
          <>
            <Box pb={24}>
              <Heading as="h2" pb={8}>
                Disciples of War/Magic
              </Heading>

              <Grid
                gridTemplateColumns={[
                  '1fr',
                  '1fr 1fr',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)',
                  'repeat(5, 1fr)',
                  'repeat(6, 1fr)'
                ]}
                gap={8}
              >
                {data.Results.filter(item => item.ID < 8 || item.ID > 18).map(
                  (classJob, i) => (
                    <Link key={i} href={`/ffxiv/classjobs/${classJob.ID}`}>
                      <Card isButton={true}>
                        <Image
                          src={`${FFXIV_API}${classJob.Icon}`}
                          width="85"
                          height="80"
                          alt={`${classJob.Name} Icon`}
                        />
                        <Heading noOfLines={1} fontSize="2xl" as="h4">
                          {capitalizeString(classJob.Name)}
                        </Heading>
                      </Card>
                    </Link>
                  )
                )}
              </Grid>
            </Box>
            <Box>
              <Heading as="h2" pb={8}>
                Disciples of the Hand/Land
              </Heading>

              <Grid
                gridTemplateColumns={[
                  '1fr',
                  '1fr 1fr',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)',
                  'repeat(5, 1fr)',
                  'repeat(6, 1fr)'
                ]}
                gap={8}
              >
                {data.Results.filter(item => item.ID >= 8 && item.ID <= 18).map(
                  (classJob, i) => (
                    <Link key={i} href={`/ffxiv/classjobs/${classJob.ID}`}>
                      <Card isButton={true}>
                        <Image
                          src={`${FFXIV_API}${classJob.Icon}`}
                          width="85"
                          height="80"
                          alt={`${classJob.Name} Icon`}
                        />
                        <Heading noOfLines={1} fontSize="2xl" as="h4">
                          {capitalizeString(classJob.Name)}
                        </Heading>
                      </Card>
                    </Link>
                  )
                )}
              </Grid>
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default ClassJob;

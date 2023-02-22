import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import BaseModal from '@components/modal';
import CollectablesLayout from '@components/layouts/collectables';

import { IMount } from '@ts/interfaces/ffxivCollectInterfaces';
import { indexMounts } from '@services/ffxivCollectApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { _mutiply } from '@utils/helpers/math';

const Mounts: NextPage = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedMount, setSelectedMount] = useState<IMount | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  // id_in: '1...21'
  const { data, error, isLoading, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(['mounts', filters], indexMounts, {
      getNextPageParam: (lastPage, pages) => {
        //* check if the last request has count=0
        //* if so there are no more items to fetch
        return lastPage.count > 0
          ? {
              //* eg. 2*10 = 20 and then 20 + 11 = 31
              //* eg. 3*10 = 30 and then 30 + 11 = 41
              start: _mutiply(pages.length, 10) + 11,
              //* eg. 2*10 = 20 and then 20 + 21 = 41
              //* eg. 3*10 = 30 and then 30 + 21 = 51
              end: _mutiply(pages.length, 10) + 21
            }
          : undefined;
      }
    });

  /*
  <FormControl label="Name">
  <FormControl label="Movement">
  <FormControl label="Seats">
  <FormControl label="Owned">
  <FormControl label="Patch">
  */

  return (
    <CollectablesLayout
      seo="Mounts - FFXIV Colectables"
      title="Mounts"
      description=" Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <>
          {data.pages?.length ? (
            <InfiniteScroll
              dataLength={data.pages.length}
              next={() => {
                fetchNextPage();
              }}
              hasMore={hasNextPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <Box pt={8}>
                  <p>
                    <b>Fantasy</b>tastic, you have seen them all!
                  </p>
                </Box>
              }
            >
              <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
                {data.pages.map((pages, i) => (
                  <Fragment key={i}>
                    {pages.results.map((mount: IMount, i) => (
                      <Card
                        p={6}
                        key={i}
                        isButton={true}
                        onClick={() => {
                          setSelectedMount(mount);
                          router.push(`${router.pathname}?mount=${mount.id}`);
                        }}
                      >
                        <Image
                          width="36"
                          height="36"
                          src={mount.image}
                          alt={mount.name}
                        />
                        <Heading
                          textAlign="center"
                          noOfLines={2}
                          fontSize="2xl"
                          as="h4"
                        >
                          {mount.name}
                        </Heading>

                        <Text>{mount.movement}</Text>

                        <Text textAlign="left" noOfLines={2}>
                          {mount.tooltip}
                        </Text>
                      </Card>
                    ))}
                  </Fragment>
                ))}
              </SimpleGrid>
            </InfiniteScroll>
          ) : (
            <EmptyData expression="mounts" />
          )}
        </>
      ) : null}

      {selectedMount !== null ? (
        <BaseModal
          open={router.query?.mount ? true : false}
          title={selectedMount.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Image
                mx="auto"
                width="28"
                height="28"
                borderRadius="lg"
                src={`${selectedMount.image}`}
                alt={`${selectedMount.name} Icon`}
              />
              <Text pt="2" pb="4" textAlign="center">
                {selectedMount.tooltip}
              </Text>

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                General Info
              </Heading>
              <Text>{selectedMount.owned} players own this mount</Text>
              <Text>Mount introduced in patch {selectedMount.patch}</Text>
              <Text>
                This mount is{' '}
                <b>{selectedMount.tradeable ? 'tradable' : 'non-tradable'}</b>
              </Text>

              <Text pt={2}>
                <u>Seats:</u> {selectedMount.seats}
              </Text>
              <Text>
                <u>Movement:</u> {selectedMount.movement}
              </Text>

              {selectedMount?.description && (
                <>
                  <Heading
                    pt={5}
                    pb={2}
                    as="h4"
                    fontSize="2xl"
                    color="brand.500"
                  >
                    Description
                  </Heading>
                  <Text>{selectedMount.description}</Text>
                </>
              )}

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Sources
              </Heading>

              {selectedMount.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedMount.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this mount</Text>
              )}
            </>
          }
        />
      ) : null}
    </CollectablesLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

export default Mounts;

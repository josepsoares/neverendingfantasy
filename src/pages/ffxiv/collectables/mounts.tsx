import type { IMount } from '@ts/interfaces/ffxivCollectInterfaces';
import type { GetServerSideProps, NextPage } from 'next';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

import {
  CollectableCard,
  CollectableCardSkeleton
} from '@components/cards/collectableCard';
import EmptyData from '@components/feedback/emptyData';
import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import {
  InfiniteScroll,
  InfiniteScrollItemsWrapper
} from '@components/infiniteScroll';
import {
  InfiniteScrollClient,
  InfiniteScrollClientItemsWrapper
} from '@components/infiniteScrollClient';
import CollectablesLayout from '@components/layouts/collectables';
import BaseModal from '@components/modal';
import { indexMounts } from '@services/ffxivCollectApi';
import { _chunk } from '@utils/helpers/arr';
import { _add, _mutiply } from '@utils/helpers/math';

const Mounts: NextPage = () => {
  const router = useRouter();

  const [mounts, setMounts] = useState({
    all: [],
    current: [],
    currentPage: 0,
    pages: 1,
    hasNextPage: true
  });

  const [filters, setFilters] = useState('');
  const [selectedMount, setSelectedMount] = useState<IMount | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['mounts'],
    queryFn: indexMounts,
    onSuccess(data) {
      const chunkedData = _chunk(data.results, 10);
      setMounts({
        ...mounts,
        all: chunkedData,
        current: [chunkedData[0]],
        pages: chunkedData.length
      });
    }
  });

  const setNextPage = () => {
    const nextPage = _add(mounts.currentPage, 1);

    setMounts({
      ...mounts,
      current: [...mounts.current, mounts.all[nextPage]],
      currentPage: nextPage,
      hasNextPage: nextPage !== mounts.all.length - 1
    });
  };

  /*
  <FormControl label="Name">
  <FormControl label="Movement">
  <FormControl label="Seats">
  <FormControl label="Owned">
  */

  return (
    <CollectablesLayout
      title="Mounts"
      description=" Look at all the final fantasies bellow! Do they even end?"
    >
      {error ? (
        <Error />
      ) : isLoading ? (
        <SimpleGrid gap={8} w="full" columns={[1, null, 2, 3, 4, null, 5]}>
          {Array.from(Array(10).keys()).map(i => (
            <CollectableCardSkeleton key={i} imgH="16" />
          ))}
        </SimpleGrid>
      ) : data ? (
        <InfiniteScrollClient
          hasNextPage={mounts.hasNextPage}
          endMessage="Well, there you have it, all the FFXIV achievements, is there even a player who got them all?"
        >
          {mounts.current.map((page, pageI) =>
            page.map((mount: IMount, i: number) => {
              return (
                <InfiniteScrollClientItemsWrapper
                  key={i}
                  hasNextPage={mounts.hasNextPage}
                  setNextPage={() => setNextPage()}
                  isLastAvailablePage={pageI === mounts.current.length - 1}
                >
                  <CollectableCard
                    isButton={true}
                    onClick={() => {
                      setSelectedMount(mount);
                      router.push(
                        `${router.pathname}?mount=${mount.id}`,
                        {},
                        { scroll: false }
                      );
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
                  </CollectableCard>
                </InfiniteScrollClientItemsWrapper>
              );
            })
          ) || <EmptyData expression="mounts" />}
        </InfiniteScrollClient>
      ) : null}

      {selectedMount !== null ? (
        <BaseModal
          open={router.query?.mount ? true : false}
          title={selectedMount.name}
          whileClosing={() =>
            router.push(router.pathname, {}, { scroll: false })
          }
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

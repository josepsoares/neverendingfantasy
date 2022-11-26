import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { store } from '@redux/store';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  getRunningOperationPromises,
  indexArmoires,
  useIndexArmoiresQuery
} from '@services/api/ffxivCollectApi';

import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import Card from '@components/common/card';
import BaseModal from '@components/common/modal';
import SEO from '@components/common/seo';

import { IArmoire } from '@ts/interfaces/ffxivCollectInterfaces';

const Armoires: NextPage = () => {
  const router = useRouter();
  const [storeItems, setStoreItems] = useState<IArmoire[] | undefined>([]);

  /* useEffect(() => {
    if (data) {
      setStoreItems([...storeItems, ...data.results]);
    }
  }, [data]); */

  const armoires = useIndexArmoiresQuery({
    refetchOnReconnect: false,
    refetchOnFocus: false,
    limit: 20
  });
  const { data, error, isLoading, refetch } = armoires;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedArmoire, setSelectedArmoire] = useState<IArmoire | null>(null);

  console.log(data);

  return (
    <>
      <SEO title="Armoire - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Armoires"
          data={data}
          onOpen={onFilterDrawerOpen}
        />

        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <>
              <FilterDrawer
                visible={isFilterDrawerOpen}
                close={onFilterDrawerClose}
                filtersJSX={
                  <>
                    <FormControl label="Name">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the armor" />
                    </FormControl>
                    <FormControl label="Category">
                      <FormLabel as="legend">Category</FormLabel>
                      <Select value={'one'}></Select>
                    </FormControl>
                    <FormControl label="Owned">
                      <FormLabel as="legend">Owned</FormLabel>
                      <Select value={'one'}></Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <FormLabel as="legend">Patch</FormLabel>
                      <Select value={'one'}></Select>
                    </FormControl>
                  </>
                }
              />

              {/*  <InfiniteScroll
                dataLength={storeItems.length}
                next={() => {
                  const urlParams = new URLSearchParams(data.next);
                  const getPage = urlParams.get('page');
                  getPage && setPage(parseInt(getPage));
                  refetch();
                }}
                hasMore={data?.next ? true : false}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <Box pt={8}>
                    <p>
                      <b>Fantasy</b>tastic, you have seen them all!
                    </p>
                  </Box>
                }
              > */}
              <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
                {data.results.map((armoire, i) => (
                  <Card p={6} key={i}>
                    <Image
                      w={12}
                      h={12}
                      src={armoire.icon}
                      alt={armoire.name}
                    />
                    <Heading
                      textAlign="center"
                      noOfLines={2}
                      fontSize="2xl"
                      as="h4"
                    >
                      {armoire.name}
                    </Heading>

                    <Text>{armoire.category.name}</Text>

                    <Box textAlign="center">
                      <Text fontSize="16">
                        {armoire.owned} players own this
                      </Text>

                      <Text fontSize="16">
                        Introduced in patch {armoire.patch}
                      </Text>
                    </Box>

                    <Button
                      variant="ghost"
                      onClick={() => setSelectedArmoire(armoire)}
                      _active={{
                        color: 'brand.500',
                        bgColor: 'white'
                      }}
                      _hover={{
                        color: 'brand.500',
                        bgColor: 'white'
                      }}
                    >
                      Check source(s)
                    </Button>
                  </Card>
                ))}
              </SimpleGrid>
              {/*  </InfiniteScroll> */}
            </>
          ) : null}
        </Box>
      </Box>

      {selectedArmoire !== null ? (
        <BaseModal
          open={selectedArmoire !== null}
          title={selectedArmoire.name}
          whileClosing={() => setSelectedArmoire(null)}
          body={
            <>
              <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                Source(s)
              </Heading>

              {selectedArmoire.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedArmoire.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this armoire</Text>
              )}
            </>
          }
        />
      ) : null}
    </>
  );
};

export const getServerSideProps = store.getServerSideProps(
  store => async context => {
    store.dispatch(indexArmoires.initiate({}));

    await Promise.all(getRunningOperationPromises());

    return {
      props: {}
    };
  }
);

export default Armoires;

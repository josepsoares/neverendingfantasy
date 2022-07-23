import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { store } from '@redux/store';
import {
  Box,
  Flex,
  FormControl,
  Grid,
  Heading,
  Image,
  Input,
  Select
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
import SEO from '@components/common/seo';

import { IArmoire } from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';

const Armoires: NextPage = () => {
  const [storeItems, setStoreItems] = useState<IArmoire[] | undefined>([]);

  /* useEffect(() => {
    if (data) {
      setStoreItems([...storeItems, ...data.results]);
    }
  }, [data]); */

  const armoires = useIndexArmoiresQuery(
    { id_in: '1..5' },
    { refetchOnReconnect: false, refetchOnFocus: false }
  );
  const { data, error, isLoading, refetch } = armoires;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(data);

  return (
    <>
      <SEO title="Armoire - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Armoires" data={data} onOpen={onOpen} />

        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <>
              <FilterDrawer
                visible={isOpen}
                close={onClose}
                filtersJSX={
                  <>
                    <FormControl label="Name">
                      <Input placeholder="name of the armor" />
                    </FormControl>
                    <FormControl label="Category">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Source">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Owned">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Patch">
                      <Select options={['one', 'two', 'three']} value={'one'} />
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
              <Grid
                templateColumns={[
                  '1fr',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)',
                  'repeat(6, 1fr)'
                ]}
                gap={8}
              >
                {data.results.map((armoire, i) => (
                  <Flex
                    p={6}
                    key={i}
                    gap={4}
                    flexDir="column"
                    justify="center"
                    alignItems="center"
                    bgColor="brand.600"
                    textColor="white"
                    boxShadow="md"
                  >
                    <Image
                      w={12}
                      h={12}
                      src={armoire.icon}
                      alt={armoire.name}
                    />
                    <Heading fontSize={18} as="h4">
                      {armoire.name}
                    </Heading>
                  </Flex>
                ))}
              </Grid>
              {/*  </InfiniteScroll> */}
            </>
          ) : null}
        </Box>
      </Box>
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

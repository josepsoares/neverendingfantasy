import { NextPage } from 'next';
import { Box, FormControl, Grid, Input, Select } from '@chakra-ui/react';

import { useIndexBardingsQuery } from '@services/api/ffxivCollectApi';
import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import HeadingWithFilter from '@components/common/headingWithFilter';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import EmptyData from '@components/common/feedback/emptyData';
import SEO from '@components/common/seo';

const Bardings: NextPage = () => {
  const bardings = useIndexBardingsQuery({ limit: 10 });
  const { data, error, isLoading } = bardings;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(data);

  return (
    <>
      <SEO title="Bardings - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Bardings" data={data} onOpen={onOpen} />
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
                      <Input placeholder="name of the minion" />
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
              {data.results?.length ? (
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
                  {data.results.map((barding, i) => (
                    <Box key={i}>{barding.name}</Box>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="bardings" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Bardings;

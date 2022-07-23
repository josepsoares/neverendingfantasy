import { NextPage } from 'next';
import { Box, FormControl, Grid, Input, Select } from '@chakra-ui/react';

import { useIndexMinionsQuery } from '@services/api/ffxivCollectApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import SEO from '@components/common/seo';

const Minions: NextPage = () => {
  const minions = useIndexMinionsQuery({ limit: 10 });
  const { isLoading, error, data } = minions;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(data);

  return (
    <>
      <SEO title="Minions - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Minions" data={data} onOpen={onOpen} />
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
                    <FormControl label="Race">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Behaviour">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Skill Type">
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
                  {data.results.map((minion, i) => (
                    <Box key={i}>{minion.name}</Box>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="minions" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Minions;

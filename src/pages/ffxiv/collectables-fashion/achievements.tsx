import { NextPage } from 'next';
import { Box, FormControl, Grid, Input, Select } from '@chakra-ui/react';

import { useIndexAchievementsQuery } from '@services/api/ffxivCollectApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import SEO from '@components/common/seo';
import EmptyData from '@components/common/feedback/emptyData';

const Achievements: NextPage = () => {
  const achievements = useIndexAchievementsQuery({});
  const { data, error, isLoading } = achievements;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  return (
    <>
      <SEO title="Achievements - FFXIV" />

      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Achievements" data={data} onOpen={onOpen} />

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
                    <FormControl label="Category">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Type">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Reward">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Completed Percentage">
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
                  {data.results.map((achievement, i) => (
                    <Box key={i}>{achievement.name}</Box>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="achievements" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Achievements;

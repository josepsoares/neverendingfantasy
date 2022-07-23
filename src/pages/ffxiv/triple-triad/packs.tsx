import { NextPage } from 'next';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react';

import { useIndexPacksQuery } from '@services/api/tripleTriadApi';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import SEO from '@components/common/seo';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';

const Packs: NextPage = () => {
  const packs = useIndexPacksQuery({});
  const { data, error, isLoading } = packs;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(data);

  return (
    <>
      <SEO title="Packs - Triple Triad - FFXIV" />
      <Box h="100%" px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Triple Triad - Packs"
          data={data}
          onOpen={onOpen}
        />

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
                <Flex flexDir="column" gap={6}>
                  <FormControl as="fieldset">
                    <FormLabel as="legend">Name</FormLabel>
                    <Input placeholder="name of the pack" />
                  </FormControl>
                  <FormControl as="fieldset">
                    <FormLabel as="legend">Cost</FormLabel>
                    <Slider aria-label="Cost Slider" defaultValue={0}>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>
                </Flex>
              }
            />

            {data.results?.length ? (
              <Grid columns={['100%', null, '33%', '200px']} gap="small">
                {data.results.map((pack, i) => (
                  <Box pad="medium" key={i}>
                    <Text>{pack.name}</Text>
                    <p>cost: {pack.cost}</p>
                  </Box>
                ))}
              </Grid>
            ) : (
              <EmptyData expression="packs" />
            )}
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Packs;

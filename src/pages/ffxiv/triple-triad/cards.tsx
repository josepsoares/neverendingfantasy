import { NextPage } from 'next';
import Image from 'next/image';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';

import { useIndexCardsQuery } from '@services/api/tripleTriadApi';

import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import SEO from '@components/common/seo';
import EmptyData from '@components/common/feedback/emptyData';
import HeadingWithFilter from '@components/common/headingWithFilter';

const Cards: NextPage = () => {
  const cards = useIndexCardsQuery({
    id_in: '1...21'
  });
  const { data, error, isLoading } = cards;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(cards);

  return (
    <>
      <SEO title="Cards - Triple Triad - FFXIV" />

      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Triple Triad - Cards"
          data={data}
          onOpen={onOpen}
        />
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
                  <Flex flexDir="column" gap={6}>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the card" />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Type</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Stats</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Start</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Sell Price</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Owned</FormLabel>
                      <Slider aria-label="slider-ex-1" defaultValue={30}>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Source</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                  </Flex>
                }
              />

              {data.results?.length ? (
                <Grid columns={['100%', null, '33%', '200px']} gap="small">
                  {data.results.map((card, i) => (
                    <Box pad="large" key={i}>
                      <Heading>{card.name}</Heading>
                      <Image
                        src={`${card.image}`}
                        width="85px"
                        height="80px"
                        alt={`${card.name} Image`}
                      />
                      <Image
                        src={`${card.icon}`}
                        width="85px"
                        height="80px"
                        alt={`${card.name} Icon`}
                      />
                    </Box>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="cards" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Cards;

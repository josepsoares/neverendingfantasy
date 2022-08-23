import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Image,
  Divider,
  Button,
  Highlight,
  Center
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

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
import Card from '@components/common/card';
import BaseModal from '@components/common/modal';
import { ICard } from '@ts/interfaces/api/ffxiv/tripleTriadInterfaces';

const Cards: NextPage = () => {
  const router = useRouter();

  const cards = useIndexCardsQuery({
    id_in: '1...21'
  });
  const { data, error, isLoading } = cards;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  return (
    <>
      <SEO title="Cards - Triple Triad - FFXIV" />

      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          data={data}
          title="Triple Triad - Cards"
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
                  <Flex flexDir="column" gap={6}>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the card" />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Type</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Stats</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Stars</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Sell Price</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
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
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                  </Flex>
                }
              />

              {data.results?.length ? (
                <SimpleGrid columns={[1, null, 2, 3, 4, 5]} gap={8}>
                  {data.results.map((card, i) => (
                    <Card
                      p={6}
                      key={i}
                      isButton={true}
                      onClick={() => {
                        setSelectedCard(card);
                        router.push(`${router.pathname}?card=${card.id}`);
                      }}
                    >
                      <Image
                        src={`${card.image}`}
                        width="75px"
                        height="80px"
                        alt={`${card.name} Image`}
                      />
                      <Heading noOfLines={1} fontSize="2xl" as="h4">
                        {card.name}
                      </Heading>
                      <Text>
                        {card.type.name} - {card.stars}{' '}
                        {card.stars === 1 ? 'Star' : 'Stars'}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="cards" />
              )}
            </>
          ) : null}
        </Box>
      </Box>

      {selectedCard !== null ? (
        <BaseModal
          open={router.query?.card ? true : false}
          title={selectedCard.name}
          whileClosing={() => router.push('/ffxiv/triple-triad/cards')}
          body={
            <>
              <Image
                src={`${selectedCard.image}`}
                width="110px"
                height="150px"
                mx="auto"
                alt={`${selectedCard.name} Image`}
              />

              <SimpleGrid
                pt={4}
                color="brand.500"
                justifyItems="center"
                columns={[1, 2, null, 4]}
              >
                <Text>
                  {selectedCard.stars}{' '}
                  {selectedCard.stars === 1 ? 'Star' : 'Stars'}
                </Text>
                <Text>Type: {selectedCard.type.name}</Text>
                <Text>Owned: {selectedCard.owned}</Text>
                <Text>Sell Price: {selectedCard.sell_price}</Text>
              </SimpleGrid>

              <Text mt={4} mb={2} noOfLines={seeAllDescription ? null : 3}>
                {selectedCard.description}
              </Text>

              <Center>
                <Button
                  mb={4}
                  variant="ghost"
                  colorScheme="brand"
                  onClick={() => setSeeAllDescription(!seeAllDescription)}
                >
                  {seeAllDescription
                    ? 'Trucante description'
                    : 'Show all description'}
                </Button>
              </Center>

              <Divider w="75%" mx="auto" mb={4} />

              <Box pb={4}>
                <Heading fontSize="2xl" color="brand.500" pb={2} as="h4">
                  Stats
                </Heading>

                <SimpleGrid columns={[1, 2, 4]}>
                  {Object.entries(selectedCard.stats.formatted).map(
                    ([key, value], i) => (
                      <Text key={i}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </Text>
                    )
                  )}
                </SimpleGrid>
              </Box>

              <Box>
                <Heading fontSize="2xl" color="brand.500" as="h4">
                  Sources
                </Heading>

                {selectedCard.sources.drops.length > 0 ? (
                  <Text pt={2}>
                    <u>Drops:</u> [
                    {selectedCard.sources.drops.map((item, i) =>
                      selectedCard.sources.drops.length > 1 &&
                      i < selectedCard.sources.drops.length - 1 ? (
                        <Fragment key={i}>{item}, </Fragment>
                      ) : (
                        <Fragment key={i}>{item}</Fragment>
                      )
                    )}
                    ]
                  </Text>
                ) : null}
                {selectedCard.sources.npcs.length > 0 ? (
                  <Text pt={2}>
                    <u>NPCs:</u> [
                    {selectedCard.sources.npcs.map((item, i) =>
                      selectedCard.sources.npcs.length > 1 &&
                      i < selectedCard.sources.npcs.length - 1 ? (
                        <Fragment key={i}>
                          {item.name} (in {item.location.name}),{' '}
                        </Fragment>
                      ) : (
                        <Fragment key={i}>
                          {item.name} (in {item.location.name})
                        </Fragment>
                      )
                    )}
                    ]
                  </Text>
                ) : null}
                {selectedCard.sources.packs.length > 0 ? (
                  <Text pt={2}>
                    <u>Packs:</u> [
                    {selectedCard.sources.packs.map((item, i) =>
                      selectedCard.sources.packs.length > 1 &&
                      i < selectedCard.sources.packs.length - 1 ? (
                        <Fragment key={i}>
                          {item.name} - {item.cost} MGP,{' '}
                        </Fragment>
                      ) : (
                        <Fragment key={i}>
                          {item.name} - {item.cost} MGP
                        </Fragment>
                      )
                    )}
                    ]
                  </Text>
                ) : null}
              </Box>
            </>
          }
        />
      ) : null}
    </>
  );
};

export default Cards;

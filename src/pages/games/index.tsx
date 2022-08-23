import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text
} from '@chakra-ui/react';

import { rawgApi, useIndexGamesQuery } from '@services/api/rawgApi';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import SEO from '@components/common/seo';

import { IGame } from '@ts/interfaces/api/rawgInterfaces';
import HeadingWithFilter from '@components/common/headingWithFilter';
import { capitalizeString } from '@utils/helpers/capitalizeString';
import { Icon } from '@iconify/react';
import Card from '@components/common/card';

const Games: NextPage = () => {
  const dispatch = useDispatch();
  const [storeGames, setstoreGames] = useState<IGame[]>([]);

  const [name, setName] = useState('');
  const [ordering, setOrdering] = useState('released');
  const [orderingType, setOrderingType] = useState('descending');
  const [metacriticScore, setMetacriticScore] = useState(0);

  const [page, setPage] = useState(1);

  const games = useIndexGamesQuery(
    {
      search: 'Final Fantasy',
      ordering: `${orderingType === 'descending' && '-'}${ordering}`,
      search_exact: true,
      publishers: 308,
      page: page
    },
    { refetchOnReconnect: false, refetchOnFocus: false }
  );

  const state = useSelector(state => state);
  const { isLoading, error, data, currentData, refetch } = games;

  console.log(data);

  useEffect(() => {
    if (data) {
      setstoreGames([...storeGames, ...data.results]);
    }
  }, [data]);

  console.log('loading', isLoading);

  console.log('store games', storeGames);

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  return (
    <>
      <SEO
        title="Games"
        description="Find all, really all, the games the final fantasy franchise has to offer"
      />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Games"
          data={data}
          onOpen={onFilterDrawerOpen}
        />
        <Box pb={16}>
          <Text>
            you know, there are a lot of final fantasy games. they never seem to
            end and they're everywhere, on your phone, in consoles or in your pc
            and, well, here they are, just keep scrolling
          </Text>
        </Box>
        <Box>
          {error ? (
            <Error />
          ) : isLoading && storeGames.length === 0 ? (
            <Loading />
          ) : data ? (
            <>
              <FilterDrawer
                visible={isFilterDrawerOpen}
                close={onFilterDrawerClose}
                filtersJSX={
                  <Flex flexDir="column" gap={8}>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Final Fantasy</FormLabel>
                      <Input placeholder="... rest of the name" />
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Metacritic Score</FormLabel>
                      <Slider
                        aria-label="slider-ex-1"
                        colorScheme="telegram"
                        defaultValue={0}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Ordering</FormLabel>
                      <Select
                        bgColor="whiteAlpha.200"
                        value={ordering}
                        onChange={ev => {
                          ev.target.textContent &&
                            setOrdering(ev.target.textContent);
                          setstoreGames([]);
                        }}
                        sx={{
                          option: {
                            backgroundColor: 'brand.200'
                          }
                        }}
                      >
                        {[
                          'released',
                          'name',
                          'rating',
                          'metacritic',
                          'added'
                        ].map((item, i) => (
                          <option key={i} value={item}>
                            {capitalizeString(item)}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Ordering Type</FormLabel>
                      <Select
                        onChange={ev => {
                          setstoreGames([]);
                          ev.target.textContent &&
                            setOrderingType(ev.target.textContent);
                        }}
                        bgColor="whiteAlpha.200"
                        value={orderingType}
                        sx={{
                          option: {
                            backgroundColor: 'brand.200'
                          }
                        }}
                      >
                        {['ascending', 'descending'].map((item, i) => (
                          <option key={i} value={item}>
                            {capitalizeString(item)}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Flex>
                }
              />

              <InfiniteScroll
                dataLength={storeGames.length}
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
              >
                <SimpleGrid columns={[1, null, 2, 3, 4, 5]} gap={8}>
                  {storeGames.map((game: IGame, i: number) => {
                    console.log(game?.rating ? true : false);
                    console.log(game?.background_image);
                    return (
                      <Link
                        passHref={true}
                        href={`/games/${game.slug}`}
                        key={i}
                      >
                        <Box as="a">
                          <Card p={0}>
                            <Box w="100%" position="relative">
                              <Image
                                borderBottomRightRadius={0}
                                borderBottomLeftRadius={0}
                                borderTopLeftRadius="md"
                                borderTopRightRadius="md"
                                alt={
                                  game.background_image
                                    ? `${game.name} Image`
                                    : 'Placeholder'
                                }
                                height="48"
                                w="full"
                                objectFit="cover"
                                src={game.background_image}
                                fallbackSrc="/assets/img/placeholder.png"
                              />
                            </Box>
                            <Box w="100%" p={8}>
                              <Heading fontSize="2xl" as="h4" noOfLines={2}>
                                {game.name}
                              </Heading>
                              <Box>
                                {game.tba ? (
                                  <Flex
                                    pt={4}
                                    flexDir="row"
                                    alignItems="center"
                                    gap={2}
                                  >
                                    <Icon icon="bx:bx-help-circle" />
                                    <Text>To be announced</Text>
                                  </Flex>
                                ) : (
                                  <>
                                    <Flex
                                      pt={4}
                                      flexDir="row"
                                      alignItems="center"
                                      gap={2}
                                    >
                                      <Icon icon="bx:bx-calendar" />
                                      <Text>{game.released}</Text>
                                    </Flex>

                                    <Flex
                                      flexDir="row"
                                      alignItems="center"
                                      gap={2}
                                    >
                                      <Icon icon="bx:bxs-star" />
                                      <Text>
                                        {game.rating || 'No rating yet'}
                                      </Text>
                                    </Flex>
                                  </>
                                )}
                              </Box>
                            </Box>
                          </Card>
                        </Box>
                      </Link>
                    );
                  })}
                </SimpleGrid>
              </InfiniteScroll>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Games;

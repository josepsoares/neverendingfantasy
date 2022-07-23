import { NextPage } from 'next';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import SEO from '@components/common/seo';
import {
  useIndexGamesQuery,
  useIndexGenresQuery,
  useIndexSimilarTagsQuery
} from '@services/api/rawgApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';

import { IGame } from '@ts/interfaces/api/rawgInterfaces';
import { Box, Grid, Heading } from '@chakra-ui/react';

const SimularGames: NextPage = () => {
  const dispatch = useDispatch();
  const games = useIndexGamesQuery({
    ordering: '-released',
    tags: 'rpg'
  });

  const genres = useIndexGenresQuery();
  const similarTags = useIndexSimilarTagsQuery();

  const {
    isLoading: arTagsLoading,
    error: tagsError,
    data: tagsData
  } = similarTags;

  const {
    isLoading: areGenresLoading,
    error: genresError,
    data: genresData
  } = genres;

  const {
    isLoading: areGamesLoading,
    error: gamesError,
    data: gamesData
  } = games;

  return (
    <>
      <SEO
        title="Simular Games - FFXIV"
        description="Find lots of games simular to the final fantasy franchise, there are quite a lot"
      />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading as="h1">Simular Games</Heading>
        <Box
          direction="row-responsive"
          gap="medium"
          pad={{ vertical: 'medium' }}
        >
          <Link href="/games/simular" passHref={true}>
            <Box as="a">
              <Box
                pad="medium"
                height="20rem"
                justify="center"
                align="center"
                background={{
                  color: 'neutral-1'
                }}
              >
                <h2>Simular Games</h2>
                <p>explore simular ff games</p>
              </Box>
            </Box>
          </Link>
        </Box>
        {gamesError ? (
          <Error />
        ) : areGamesLoading ? (
          <Loading />
        ) : gamesData ? (
          <>
            <InfiniteScroll
              dataLength={gamesData.results.length}
              next={() => {
                /* dispatch(
                  rawgApi.endpoints.indexGames.initiate(
                    { count: 5 },
                    { subscribe: false, forceRefetch: true }
                  )
                ); */
              }}
              hasMore={gamesData?.next ? true : false}
              loader={<h4>Loading...</h4>}
              endMessage={
                <Box pad={{ top: 'medium' }}>
                  <p>
                    <b>Fantasytastic</b>, you have seen them all!
                  </p>
                </Box>
              }
            >
              <Grid columns={['100%', null, '33%', '200px']} gap="small">
                {gamesData?.results.map((game: IGame, i: number) => {
                  return (
                    <Link
                      passHref={true}
                      href={`/games/${game.slug}`}
                      key={i}
                    ></Link>
                  );
                })}
              </Grid>
            </InfiniteScroll>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default SimularGames;

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';

import { store } from '@redux/store';
import {
  getGame,
  getRunningOperationPromises,
  useGetGameQuery
} from '@services/api/rawgApi';

import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import SEO from '@components/common/seo';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text
} from '@chakra-ui/react';
import ExternalLink from '@components/common/externalLink';
import EmblaCarousel from '@components/common/emblaCarousel';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { capitalizeString } from '@utils/helpers/capitalizeString';

const GamePage: NextPage = () => {
  const router = useRouter();
  const slug = router.query.game;
  const result = useGetGameQuery(slug, {
    // If the page is not yet generated, router.isFallback will be true
    // initially until getStaticProps() finishes running
    skip: router.isFallback
  });

  const { data, error, isLoading } = result;

  console.log(data);

  return (
    <>
      {error ? (
        <Box px={[12, null, 24, 32]} py={16}>
          <Error />
        </Box>
      ) : isLoading ? (
        <Box px={[12, null, 24, 32]} py={16}>
          <Loading />
        </Box>
      ) : data ? (
        data?.detail ? (
          <>
            <SEO title="error" />
            <Box px={[12, null, 24, 32]} py={16}>
              <Heading as="h1">Couldn't find game data</Heading>
            </Box>
          </>
        ) : (
          <>
            <SEO title={data.name} description={data.description} />

            <Flex
              mt={16}
              alignItems="center"
              justify="center"
              h={data.background_image ? 64 : 'auto'}
              position="relative"
            >
              {data.background_image && (
                <Image
                  alt={`${data.name} Image`}
                  src={data.background_image}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="overlay-img-w-round"
                />
              )}
              <Heading as="h1" textAlign="center">
                {data.name}{' '}
                {data?.website && (
                  <ExternalLink link={data.website}>
                    <IconButton
                      variant="ghost"
                      aria-label="Game Website"
                      icon={
                        <Icon icon="bx:bx-link" width="25px" height="25px" />
                      }
                    />
                  </ExternalLink>
                )}
              </Heading>
            </Flex>
            <Box px={[12, null, 24, 32]} py={16}>
              <Box pb={10}>
                <Text textAlign="center">Released at {data.released}</Text>
              </Box>

              <Box>
                <Text>{data.description_raw}</Text>
              </Box>
            </Box>

            <Box
              bgColor="brand.400"
              textColor="white"
              px={[12, null, 24, 32]}
              py={10}
            >
              <Heading textAlign="center" as="h2" pb={10}>
                Info
              </Heading>
              <Grid
                gridTemplateColumns={['1fr', null, null, '1fr 1fr 1fr']}
                pb={10}
              >
                <Box>
                  <Heading as="h3" pb={4}>
                    Developers
                  </Heading>

                  <Text>
                    {data.developers.map((dev, i) =>
                      i === data.developers.length - 1
                        ? dev.name
                        : `${dev.name}, `
                    )}
                  </Text>
                </Box>

                <Box>
                  <Heading as="h3" pb={4}>
                    Publishers
                  </Heading>

                  <Text>
                    {data.publishers.map((pub, i) =>
                      i === data.publishers.length - 1
                        ? pub.name
                        : `${pub.name}, `
                    )}
                  </Text>
                </Box>

                <Box>
                  <Heading as="h3" pb={4}>
                    Misc
                  </Heading>

                  <Text>Metacritic: {data.metacritic}</Text>
                  <Text>
                    Achievements:{' '}
                    {data?.achievements_count
                      ? data.achievements_count
                      : 'This game has no achievements'}
                  </Text>
                </Box>
              </Grid>

              <Grid
                pt={8}
                gridTemplateColumns={['1fr', null, '1fr 1fr']}
                gap={[10, null, 20]}
              >
                <Box width="100%">
                  <Heading as="h2" pb={8}>
                    Tags that describe this game:
                  </Heading>

                  {data.genres.length ? (
                    <Text>
                      {data.genres.map((item, i) =>
                        data.genres.length !== i && i !== 0
                          ? `${capitalizeString(item.name)}, `
                          : capitalizeString(item.name)
                      )}
                    </Text>
                  ) : (
                    <>
                      <Text>I guess this game doesn't have any genres...</Text>
                    </>
                  )}
                </Box>
                <Box height="medium" width="100%">
                  <Heading as="h2" pb={8}>
                    Tags that describe this game:
                  </Heading>

                  {data.tags.length ? (
                    <Text>
                      {data.tags.map((item, i) =>
                        data.tags.length !== i && i !== 0
                          ? `${capitalizeString(item.name)}, `
                          : capitalizeString(item.name)
                      )}
                    </Text>
                  ) : (
                    <>
                      <Text>I guess this game doesn't have any tags...</Text>
                    </>
                  )}
                </Box>
              </Grid>
            </Box>

            <Box textAlign="center" px={[12, null, 24, 32]} pt={16} pb={10}>
              <Heading as="h2" pb={6}>
                So yeah, in conclusion, if you're interested in this game
              </Heading>
              <Heading fontSize="md" fontWeight="normal" as="h5">
                You can get it for the{' '}
                <b>
                  {data.platforms.map(({ platform }, i) =>
                    data.platforms.length === i
                      ? platform.name
                      : `${platform.name}, `
                  )}
                </b>{' '}
                and you can buy it on{' '}
                <b>
                  {data.stores.map(({ store }, i) =>
                    data.stores.length === i ? (
                      <ExternalLink link={`https://${store.domain}`}>
                        {store.name}
                      </ExternalLink>
                    ) : (
                      <>
                        <ExternalLink link={`https://${store.domain}`}>
                          {store.name}
                        </ExternalLink>
                        ,{' '}
                      </>
                    )
                  )}
                </b>
              </Heading>
            </Box>
          </>
        )
      ) : null}
    </>
  );
};

export const getServerSideProps = store.getServerSideProps(
  store => async context => {
    const name = context.params?.name;
    if (typeof name === 'string') {
      store.dispatch(getGame.initiate(name));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {}
    };
  }
);

export default GamePage;

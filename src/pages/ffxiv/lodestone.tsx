import { useState } from 'react';
import { NextPage } from 'next';

import { store } from '@redux/store';
import {
  getNews,
  getRunningOperationPromises,
  useGetNewsQuery
} from '@services/api/lodestoneApi';

import SEO from '@components/common/seo';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Text
} from '@chakra-ui/react';
import HeadingWithFilter from '@components/common/headingWithFilter';
import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import ExternalLink from '@components/common/externalLink';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { capitalizeString } from '@utils/helpers/capitalizeString';

const Lodestone: NextPage = () => {
  const [filter, setFilter] = useState('feed');

  const news = useGetNewsQuery(filter);
  const { data, error, isLoading } = news;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  return (
    <>
      <SEO
        title="Lodestone"
        description="All your FFXIV news fresh from the Lodestone, in all the languages you can ask for"
      />

      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Lodestone" data={data} onOpen={onOpen} />
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
                  <Flex flexDir="column" gap={8}>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">News Type</FormLabel>

                      <Select
                        bgColor="whiteAlpha.200"
                        value="topics"
                        sx={{
                          option: {
                            backgroundColor: 'brand.200'
                          }
                        }}
                      >
                        {[
                          'topics',
                          'maintenance',
                          'updates',
                          'status',
                          'developers',
                          'feed',
                          'all'
                        ].map((item, i) => (
                          <option key={i} value={item}>
                            {capitalizeString(item)}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl as="fieldset">
                      <FormLabel as="legend">Language</FormLabel>
                      <Select
                        bgColor="whiteAlpha.200"
                        value="topics"
                        sx={{
                          option: {
                            backgroundColor: 'brand.200'
                          }
                        }}
                      >
                        {['na', 'eu', 'fr', 'de', 'jp'].map((item, i) => (
                          <option key={i} value={item}>
                            {capitalizeString(item)}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Flex>
                }
              />
              {data.map((item, i) => (
                <Box key={i}>
                  <Flex
                    flexDir="row"
                    justifyContent="start"
                    alignItems="center"
                    gap={16}
                  >
                    <Flex flexDir="column">
                      <Heading as="h2">{item.title}</Heading>
                      <Text>{item.category}</Text>
                      <Text>{item.time}</Text>
                      <ExternalLink link={item.url}>
                        <IconButton
                          aria-label="Link"
                          variant="ghost"
                          colorScheme="brand"
                          icon={
                            <Icon
                              icon="bx:bx-link"
                              height="25px"
                              width="25px"
                            />
                          }
                        />
                      </ExternalLink>
                    </Flex>
                  </Flex>

                  {item.image && (
                    <Image
                      src={`${item.image}`}
                      width="85px"
                      height="80px"
                      alt={`${item.title} Image`}
                    />
                  )}
                </Box>
              ))}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = store.getServerSideProps(
  store => async context => {
    store.dispatch(getNews.initiate('feed'));

    await Promise.all(getRunningOperationPromises());

    return {
      props: {}
    };
  }
);

export default Lodestone;

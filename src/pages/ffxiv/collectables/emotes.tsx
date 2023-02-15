import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import Error from '@components/feedback/error';
import Loading from '@components/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import EmptyData from '@components/feedback/emptyData';
import Card from '@components/card';
import BaseModal from '@components/modal';
import SEO from '@components/seo';

import type { IEmote } from '@ts/interfaces/ffxivCollectInterfaces';
import { useInfiniteQuery } from '@tanstack/react-query';
import { indexEmotes } from '@services/ffxivCollectApi';

const Emotes = () => {
  const router = useRouter();

  const [filters, setFilters] = useState('');
  const [selectedEmote, setSelectedEmote] = useState<IEmote | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  // id_in: '1...21'
  const { data, error, isLoading, refetch } = useInfiniteQuery(
    ['emotes', filters],
    indexEmotes,
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    }
  );

  return (
    <>
      <SEO title="Emotes - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <Heading fontSize="8xl" as="h1" pt={2} m={0} color="brand.800">
          Emotes
        </Heading>

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
                  <>
                    <FormControl label="Name">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the emote" />
                    </FormControl>
                    <FormControl label="Tradeable">
                      <FormLabel as="legend">Tradeable</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Owned">
                      <FormLabel as="legend">Owned</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Patch">
                      <FormLabel as="legend">Patch</FormLabel>
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                  </>
                }
              />

              {data.results?.length ? (
                <SimpleGrid gap={8} columns={[1, null, 2, 3, 4, 5]}>
                  {data.results.map((emote: IEmote, i) => (
                    <Card p={6} key={i}>
                      <Image
                        width="16"
                        height="16"
                        src={emote.icon}
                        alt={emote.name}
                      />
                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {emote.name}
                      </Heading>

                      <Box textAlign="center">
                        <Text fontWeight="medium">{emote.command}</Text>
                        <Text>{emote.category.name} Emote</Text>
                      </Box>

                      <Box textAlign="center">
                        <Text fontSize="16">
                          {emote.owned} players own this emote
                        </Text>

                        <Text fontSize="16">
                          Introduced in patch {emote.patch}
                        </Text>

                        <Text fontSize="16">
                          This emote is{' '}
                          {emote.tradeable ? 'tradable' : 'non-tradable'}
                        </Text>
                      </Box>

                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSelectedEmote(emote);
                          router.push(`${router.pathname}?emote=${emote.id}`);
                        }}
                        _active={{
                          color: 'brand.500',
                          bgColor: 'white'
                        }}
                        _hover={{
                          color: 'brand.500',
                          bgColor: 'white'
                        }}
                      >
                        Check source(s)
                      </Button>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="emotes" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
      {selectedEmote !== null ? (
        <BaseModal
          open={router.query?.emote ? true : false}
          title={selectedEmote.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <>
                <Heading color="brand.500" fontSize="2xl" as="h4" pb={2}>
                  Source(s)
                </Heading>

                {selectedEmote.sources.length > 0 ? (
                  <SimpleGrid gap={1} pt={2}>
                    {selectedEmote.sources.map((item, i) => (
                      <Text key={i}>
                        <u>{item.type}:</u> {item.text}
                      </Text>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text>No source(s) found for this emote</Text>
                )}
              </>
            </>
          }
        />
      ) : null}
    </>
  );
};

export default Emotes;

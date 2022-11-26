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

import { useIndexEmotesQuery } from '@services/api/ffxivCollectApi';

import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import Card from '@components/common/card';
import BaseModal from '@components/common/modal';
import SEO from '@components/common/seo';

import type { IEmote } from '@ts/interfaces/ffxivCollectInterfaces';

const Emotes = () => {
  const router = useRouter();
  const mounts = useIndexEmotesQuery({ limit: 20 });
  const { data, error, isLoading } = mounts;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedEmote, setSelectedEmote] = useState<IEmote | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  console.log(data);

  return (
    <>
      <SEO title="Emotes - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Emotes"
          data={data}
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
                <EmptyData expression="mounts" />
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

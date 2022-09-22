import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  FormControl,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { useIndexMountsQuery } from '@services/api/ffxivCollectApi';

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

import { IMount } from '@ts/interfaces/ffxivCollectInterfaces';

const Mounts: NextPage = () => {
  const router = useRouter();
  const mounts = useIndexMountsQuery({ limit: 20 });
  const { data, error, isLoading } = mounts;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedMount, setSelectedMount] = useState<IMount | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  console.log(data);

  return (
    <>
      <SEO title="Mounts - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Mounts"
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
                      <Input placeholder="name of the minion" />
                    </FormControl>
                    <FormControl label="Movement">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Seats">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Source">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Owned">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Patch">
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
                  {data.results.map((mount: IMount, i) => (
                    <Card
                      p={6}
                      key={i}
                      isButton={true}
                      onClick={() => {
                        setSelectedMount(mount);
                        router.push(`${router.pathname}?mount=${mount.id}`);
                      }}
                    >
                      <Image
                        width="36"
                        height="36"
                        src={mount.image}
                        alt={mount.name}
                      />
                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {mount.name}
                      </Heading>

                      <Text>{mount.movement}</Text>

                      <Text textAlign="left" noOfLines={2}>
                        {mount.tooltip}
                      </Text>
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
      {selectedMount !== null ? (
        <BaseModal
          open={router.query?.mount ? true : false}
          title={selectedMount.name}
          whileClosing={() => router.push(router.pathname)}
          body={
            <>
              <Image
                mx="auto"
                width="28"
                height="28"
                borderRadius="lg"
                src={`${selectedMount.image}`}
                alt={`${selectedMount.name} Icon`}
              />
              <Text pt="2" pb="4" textAlign="center">
                {selectedMount.tooltip}
              </Text>

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                General Info
              </Heading>
              <Text>{selectedMount.owned} players own this mount</Text>
              <Text>Mount introduced in patch {selectedMount.patch}</Text>
              <Text>
                This mount is{' '}
                <b>{selectedMount.tradeable ? 'tradable' : 'non-tradable'}</b>
              </Text>

              <Text pt={2}>
                <u>Seats:</u> {selectedMount.seats}
              </Text>
              <Text>
                <u>Movement:</u> {selectedMount.movement}
              </Text>

              {selectedMount?.description && (
                <>
                  <Heading
                    pt={5}
                    pb={2}
                    as="h4"
                    fontSize="2xl"
                    color="brand.500"
                  >
                    Description
                  </Heading>
                  <Text>{selectedMount.description}</Text>
                </>
              )}

              <Heading color="brand.500" fontSize="2xl" as="h4" pt={5} pb={2}>
                Sources
              </Heading>

              {selectedMount.sources.length > 0 ? (
                <SimpleGrid gap={1} pt={2}>
                  {selectedMount.sources.map((item, i) => (
                    <Text key={i}>
                      <u>{item.type}:</u> {item.text}
                    </Text>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>No source(s) found for this mount</Text>
              )}
            </>
          }
        />
      ) : null}
    </>
  );
};

export default Mounts;

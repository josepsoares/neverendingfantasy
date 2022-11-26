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

import { useIndexOrchestrionQuery } from '@services/api/ffxivCollectApi';

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

import type { IOrchestrion } from '@ts/interfaces/ffxivCollectInterfaces';

const Orchestrions: NextPage = () => {
  const router = useRouter();
  const mounts = useIndexOrchestrionQuery({});
  const { data, error, isLoading } = mounts;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [selectedOrchestrion, setSelectedOrchestrion] =
    useState<IOrchestrion | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  console.log(data);

  return (
    <>
      <SEO title="Relic Weapons - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Relic Weapons"
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
                      <Input placeholder="name of the weapon" />
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
                  {data.results.map((orchestrion: IOrchestrion, i) => (
                    <Card p={6} key={i}>
                      <Image
                        width="12"
                        height="12"
                        src={orchestrion.icon}
                        alt={orchestrion.name}
                      />
                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {orchestrion.name}
                      </Heading>

                      <Box textAlign="center">
                        <Text fontSize="16">
                          {orchestrion.owned} players own this
                        </Text>

                        <Text fontSize="16">
                          Introduced in patch {orchestrion.patch}
                        </Text>

                        <Text fontSize="16">
                          This orchestrion is{' '}
                          {orchestrion.tradeable ? 'tradable' : 'non-tradable'}
                        </Text>
                      </Box>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="orchestrion" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Orchestrions;

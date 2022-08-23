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

import type { IOrchestrion } from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';

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
                    <Card
                      p={6}
                      key={i}
                      isButton={true}
                      onClick={() => {
                        setSelectedOrchestrion(orchestrion);
                        router.push(
                          `${router.pathname}?orchestrion=${orchestrion.id}`
                        );
                      }}
                    >
                      <Image
                        width="36"
                        height="36"
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
      {selectedOrchestrion !== null ? (
        <BaseModal
          open={router.query?.orchestrion ? true : false}
          title={selectedOrchestrion.name}
          whileClosing={() => router.push(router.pathname)}
          body={<></>}
        />
      ) : null}
    </>
  );
};

export default Orchestrions;

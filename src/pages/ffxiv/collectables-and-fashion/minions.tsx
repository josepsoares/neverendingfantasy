import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  FormControl,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { useIndexMinionsQuery } from '@services/api/ffxivCollectApi';

import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import Card from '@components/common/card';
import SEO from '@components/common/seo';

import { IMinion } from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';
import BaseModal from '@components/common/modal';

const Minions: NextPage = () => {
  const router = useRouter();
  const minions = useIndexMinionsQuery({ limit: 20 });
  const { isLoading, error, data } = minions;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  console.log(data);

  const [selectedMinion, setSelectedMinion] = useState<IMinion | null>(null);
  const [seeAllDescription, setSeeAllDescription] = useState(false);

  return (
    <>
      <SEO title="Minions - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Minions"
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
                    <FormControl label="Race">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Behaviour">
                      <Select value={'one'}>
                        <option value="one">one</option>
                        <option value="two">two</option>
                        <option value="three">three</option>
                      </Select>
                    </FormControl>
                    <FormControl label="Skill Type">
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
                  {data.results.map((minion, i) => (
                    <Card
                      p={6}
                      key={i}
                      isButton={true}
                      onClick={() => {
                        setSelectedMinion(minion);
                        router.push(`${router.pathname}?minion=${minion.id}`);
                      }}
                    >
                      <Image
                        src={`${minion.image}`}
                        width="28"
                        height="28"
                        borderRadius="lg"
                        alt={`${minion.name} Icon`}
                      />

                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {minion.name}
                      </Heading>

                      <Text>
                        {minion.race.name} - {minion.behavior.name}
                      </Text>

                      <Text textAlign="left" noOfLines={2}>
                        {minion.description.split('. ')[1]}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="minions" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
      {selectedMinion !== null ? (
        <BaseModal
          open={router.query?.minion ? true : false}
          title={selectedMinion.name}
          whileClosing={() => router.push(router.pathname)}
          body={<></>}
        />
      ) : null}
    </>
  );
};

export default Minions;

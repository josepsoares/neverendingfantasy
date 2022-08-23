import type { NextPage } from 'next';
import { useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { useIndexFashionsQuery } from '@services/api/ffxivCollectApi';

import Loading from '@components/common/feedback/loading';
import Error from '@components/common/feedback/error';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import Card from '@components/common/card';
import SEO from '@components/common/seo';

const Accessories: NextPage = () => {
  const accessories = useIndexFashionsQuery({});
  const { isLoading, error, data } = accessories;

  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  const [showAllDescription, setShowAllDescription] = useState({
    show: false,
    id: null
  });

  console.log(showAllDescription);

  console.log(data);

  return (
    <>
      <SEO title="Accessories - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Accessories"
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
                  {data.results.map((accessory, i) => (
                    <Card p={6} key={i}>
                      <Image
                        src={`${accessory.image}`}
                        alt={`${accessory.name} Icon`}
                      />

                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {accessory.name}
                      </Heading>

                      <Box alignSelf="flex-start" textAlign="left">
                        <Text fontSize="16">
                          {accessory.owned} players own this
                        </Text>

                        <Text fontSize="16">
                          Introduced in patch {accessory.patch}
                        </Text>

                        <Text fontSize="16">
                          {accessory.tradeable === true
                            ? 'Tradable'
                            : 'Non-tradable'}
                        </Text>
                      </Box>

                      <Text
                        noOfLines={
                          showAllDescription.show && showAllDescription.id === i
                            ? null
                            : 2
                        }
                      >
                        {accessory.description}
                      </Text>

                      <Button
                        variant="ghost"
                        onClick={() =>
                          setShowAllDescription({
                            show: !showAllDescription.show,
                            id: i
                          })
                        }
                        _active={{
                          color: 'brand.500',
                          bgColor: 'white'
                        }}
                        _hover={{
                          color: 'brand.500',
                          bgColor: 'white'
                        }}
                      >
                        See entire description
                      </Button>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyData expression="fashion accessories" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Accessories;

import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useInfiniteQuery } from 'react-query';

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

import type {
  IRelicWeapon,
  IRelicWeaponResponse
} from '@ts/interfaces/ffxivCollectInterfaces';
import { _mutiply } from '@utils/helpers/mutiply';
import { FFXIV_COLLECT_API } from '@utils/constants';

const RelicWeapons: NextPage = () => {
  const [filters, setFilters] = useState('');
  const [seeAllDescription, setSeeAllDescription] = useState(false);
  const { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose } =
    useFilterDrawer();

  //* in the pagination we start with 20 results, id_in=1...21
  //* and then fetch 10 items and the user scrolls and hits a threshold
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery(
    'relics',
    async ({ pageParam = { start: 1, end: 21 } }) => {
      const { data }: AxiosResponse<IRelicWeaponResponse> = await axios.get(
        `${FFXIV_COLLECT_API}/relics?id_in=${pageParam.start}...${pageParam.end}&${filters}`
      );

      return data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        //* check if the last request has count=0
        //* if so there are no more items to fetch
        return lastPage.count > 0
          ? {
              //* eg. 2*10 = 20 and then 20 + 11 = 31
              //* eg. 3*10 = 30 and then 30 + 11 = 41
              start: _mutiply(pages.length, 10) + 11,
              //* eg. 2*10 = 20 and then 20 + 21 = 41
              //* eg. 3*10 = 30 and then 30 + 21 = 51
              end: _mutiply(pages.length, 10) + 21
            }
          : undefined;
      }
    }
  );

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
                  {data.results.map((relicWeapon: IRelicWeapon, i) => (
                    <Card p={6} key={i}>
                      <Image
                        width="12"
                        height="12"
                        src={relicWeapon.icon}
                        alt={relicWeapon.name}
                      />
                      <Heading
                        textAlign="center"
                        noOfLines={2}
                        fontSize="2xl"
                        as="h4"
                      >
                        {relicWeapon.name}
                      </Heading>

                      <Text textAlign="center" fontSize="xl">
                        {relicWeapon.type.name}
                      </Text>

                      <Box alignSelf="center">
                        <Text textAlign="center" fontSize="16">
                          {relicWeapon.owned} players own this weapon
                        </Text>
                      </Box>
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
    </>
  );
};

export default RelicWeapons;

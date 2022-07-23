import { NextPage } from 'next';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';

import { useIndexNpcsQuery } from '@services/api/tripleTriadApi';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import SEO from '@components/common/seo';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';

const Npcs: NextPage = () => {
  const npcs = useIndexNpcsQuery({
    id_in: '1...21'
  });
  const { data, error, isLoading } = npcs;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  return (
    <>
      <SEO title="NPCs - Triple Triad - FFXIV" />

      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Triple Triad - Npcs"
          data={data}
          onOpen={onOpen}
        />

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
                  <Flex flexDir="column" gap={6}>
                    <FormControl label="Name">
                      <FormLabel as="legend">Name</FormLabel>
                      <Input placeholder="name of the NPC" />
                    </FormControl>
                    <FormControl label="Difficulty">
                      <FormLabel as="legend">Difficulty</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Quest">
                      <FormLabel as="legend">Quest</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Rules">
                      <FormLabel as="legend">Rules</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Rewards">
                      <FormLabel as="legend">Rewards</FormLabel>
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                  </Flex>
                }
              />

              {data.results?.length ? (
                <Box>
                  {data.results.map((npc, i) => (
                    <Box key={i}>{npc.name}</Box>
                  ))}
                </Box>
              ) : (
                <EmptyData expression="NPCs" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Npcs;

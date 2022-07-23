import { NextPage } from 'next';
import {
  Box,
  Flex,
  FormControl,
  Grid,
  Heading,
  Image,
  Input,
  Select
} from '@chakra-ui/react';

import { useIndexHairstylesQuery } from '@services/api/ffxivCollectApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import HeadingWithFilter from '@components/common/headingWithFilter';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import EmptyData from '@components/common/feedback/emptyData';
import SEO from '@components/common/seo';

const HairStyles: NextPage = () => {
  const hairStyles = useIndexHairstylesQuery({});
  const { data, error, isLoading } = hairStyles;

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(data);

  return (
    <>
      <SEO title="Hair Styles - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Hair Styles" data={data} onOpen={onOpen} />
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
                  <>
                    <FormControl label="Name">
                      <Input placeholder="name of the hair style" />
                    </FormControl>
                    <FormControl label="Source">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Owned">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Patch">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                  </>
                }
              />

              {data.results?.length ? (
                <Grid
                  templateColumns={[
                    '1fr',
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(4, 1fr)',
                    'repeat(6, 1fr)'
                  ]}
                  gap={8}
                >
                  {data.results.map((hairstyle, i) => (
                    <Flex key={i} flexDir="column" gap={4}>
                      <Image
                        alt={`${hairstyle.name} Image`}
                        src={
                          hairstyle?.icon
                            ? hairstyle.icon
                            : 'assets/img/placeholder.png'
                        }
                      />
                      <Heading textAlign="center" fontSize={[18, 20]} as="h4">
                        {hairstyle.name}
                      </Heading>
                    </Flex>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="hair styles" />
              )}
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default HairStyles;

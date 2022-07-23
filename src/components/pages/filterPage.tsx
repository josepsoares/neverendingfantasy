import EmptyData from '@components/common/feedback/emptyData';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import SEO from '@components/common/seo';
import { ICardsResponse } from '@ts/interfaces/api/ffxiv/tripleTriadInterfaces';

const FilterPage: React.FC<{
  /* seoTitle: string;
  res: {
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
    data: ICardsResponse | undefined;
  };
  MapComponent: React.ReactNode;
  filter: React.ReactNode; */
}> = (/* { seoTitle, res, MapComponent, filter } */) => {
  return (
    <>
      {/* <SEO title={seoTitle} />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter
          title="Triple Triad - Packs"
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
                filtersJSX={filter}
              />

              {data.results?.length ? (
                <Grid columns={} gap="small">
                  {data.results.map((pack, i) => (
                    <Box pad="medium" key={i}>
                      <Text>{pack.name}</Text>
                      <p>cost: {pack.cost}</p>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="packs" />
              )}
            </>
          ) : null}
        </Box>
      </Box> */}
    </>
  );
};

export default FilterPage;

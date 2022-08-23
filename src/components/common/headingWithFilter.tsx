import { Flex, Button, Heading } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const HeadingWithFilter: React.FC<{
  title: string;
  data: any | undefined;
  onOpen: () => void;
}> = ({ title, data, onOpen }) => {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      pb={8}
    >
      <Heading fontSize="8xl" as="h1" pt={2} m={0} color="brand.800">
        {title}
      </Heading>
      {data && (
        <Button
          colorScheme="brand"
          leftIcon={<Icon icon="bx:bx-filter" />}
          label="Filter"
          onClick={onOpen}
        >
          Filter
        </Button>
      )}
    </Flex>
  );
};

export default HeadingWithFilter;

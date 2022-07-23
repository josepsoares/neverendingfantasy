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
      <Heading pt={2} as="h1" margin="0" textColor="brand.500">
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

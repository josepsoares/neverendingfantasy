import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

const EmptyData: React.FC<{ expression: string }> = ({ expression }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Heading as="h2">No {expression} found!</Heading>
      <p>Seems like you'll need to tweek the filter inputs</p>
      <p>Or, maybe... just reset the filters</p>
      <Button mt={6} type="submit" colorScheme="brand">
        Reset filters
      </Button>
    </Flex>
  );
};

export default EmptyData;

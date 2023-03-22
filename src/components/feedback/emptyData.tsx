import Link from 'next/link';

import { Flex, Heading, Text } from '@chakra-ui/react';

const EmptyData: React.FC<{
  expression: string;
  api: { name: string; url: string };
}> = ({ expression, api }) => {
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <Heading as="h2">No {expression} found...</Heading>
      <Text>
        <Link target="_blank" rel="noopener noreferrer" href={api.url}>
          {api.name}
        </Link>{' '}
        API didn't return any results, try again later or check if the API is
        still available
      </Text>
    </Flex>
  );
};

export default EmptyData;

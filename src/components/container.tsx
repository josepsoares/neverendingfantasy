import { Box, SpaceProps } from '@chakra-ui/react';

const Container: React.FC<{
  py?: SpaceProps['py'];
  children: React.ReactNode;
}> = ({ py = '0', children }) => {
  return (
    <Box py={py} mx="auto" w={['91.666667%%', '83.333333%', null, '75%']}>
      {children}
    </Box>
  );
};

export default Container;

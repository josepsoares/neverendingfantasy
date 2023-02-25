import { Box, SpaceProps } from '@chakra-ui/react';

const Container: React.FC<{
  py?: SpaceProps['py'];
  pt?: SpaceProps['px'];
  pb?: SpaceProps['px'];
  children: React.ReactNode;
}> = ({ py = '0', pt = '0', pb = '0', children }) => {
  return (
    <Box
      py={py}
      pt={pt}
      pb={pb}
      mx="auto"
      w={['91.666667%%', '83.333333%', null, '75%']}
    >
      {children}
    </Box>
  );
};

export default Container;

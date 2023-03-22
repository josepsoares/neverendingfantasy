import { Box, SpaceProps } from '@chakra-ui/react';

const Container: React.FC<{
  py?: SpaceProps['py'];
  pt?: SpaceProps['px'];
  pb?: SpaceProps['px'];
  children: React.ReactNode;
}> = ({ py, pt, pb, children }) => {
  return (
    <Box
      pt={pt}
      pb={pb}
      py={py}
      mx="auto"
      w={['91.666667%%', '83.333333%', null, '75%']}
    >
      {children}
    </Box>
  );
};

export default Container;

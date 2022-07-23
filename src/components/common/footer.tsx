import { Flex, Text } from '@chakra-ui/react';
import ExternalLink from '@components/common/externalLink';

const Footer: React.FC = () => {
  return (
    <Flex
      p={24}
      pb={6}
      color="gray"
      as="footer"
      width="100%"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      fontSize="xx-small"
      textAlign="center"
    >
      <Text>
        ALL FINAL FANTASY GAMES CONTENT IS PROPERTY OF SQUARE ENIX CO., LTD
      </Text>
      <Text>
        neverending fantasy - {new Date().getFullYear()}, built with{' '}
        <ExternalLink link='"https://reactjs.org/"'>react</ExternalLink> and{' '}
        <ExternalLink link="https://nextjs.org/">nextjs</ExternalLink>
      </Text>
      <Text>
        made by{' '}
        <ExternalLink link="https://josepsoares.vercel.app/">
          josépsoares
        </ExternalLink>
      </Text>
    </Flex>
  );
};

export default Footer;

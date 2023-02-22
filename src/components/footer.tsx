import Link from 'next/link';
import { Flex, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex
      pt="20"
      px="24"
      pb="6"
      color="gray"
      as="footer"
      width="100%"
      flexDir="column"
      alignItems="center"
      fontSize="xx-small"
      textAlign="center"
      justifyContent="flex-end"
    >
      <Text>
        ALL FINAL FANTASY GAMES CONTENT IS PROPERTY OF SQUARE ENIX CO., LTD
      </Text>
      <Text>
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://josepsoares.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          josépsoares
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;

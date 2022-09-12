import { Flex, Image, LayoutProps } from '@chakra-ui/react';

const cardImgBg: React.FC<{
  children: React.ReactNode;
  imgAlt: string;
  imgPosition?: string;
  imgUrl: string | null;
  externalUrl?: string | null;
  h?: LayoutProps['h'];
  radii?: boolean;
}> = ({ children, imgAlt, imgUrl, externalUrl, h = 64, radii = true }) => {
  return (
    <Flex
      p={8}
      height={h}
      rounded={radii ? 'full' : 'none'}
      boxShadow="base"
      flexDir="column"
      position="relative"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        alt={imgAlt}
        src={externalUrl || imgUrl}
        fallbackSrc="/assets/img/placeholder.png"
        top={0}
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center"
        opacity={0.2}
        zIndex="-100"
        position="absolute"
        filter="sepia(100%) hue-rotate(173deg)"
        borderRadius={radii ? '24px' : 0}
      />
      {children}
    </Flex>
  );
};

export default cardImgBg;

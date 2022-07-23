import { Flex, LayoutProps } from '@chakra-ui/react';
import Image from 'next/image';

const CardBg: React.FC<{
  children: React.ReactNode;
  imgAlt: string;
  imgPosition?: string;
  imgUrl: string | null;
  externalUrl?: string | null;
  h?: LayoutProps['h'];
  radii?: boolean;
}> = ({
  children,
  imgAlt,
  imgPosition = 'center',
  imgUrl,
  externalUrl,
  h = 64,
  radii = true
}) => {
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
      {imgUrl && (
        <Image
          alt={imgAlt}
          src={externalUrl || require(`../../assets/${imgUrl}`)}
          layout="fill"
          quality={100}
          objectFit="cover"
          placeholder="blur"
          objectPosition={imgPosition}
          className={radii ? 'overlay-img-round' : 'overlay-img-w-round'}
        />
      )}

      {children}
    </Flex>
  );
};

export default CardBg;

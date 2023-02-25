import Link from 'next/link';
import { useRouter } from 'next/router';

import { Heading, SimpleGrid, Text } from '@chakra-ui/react';

import BgImgCard from '@components/cards/bgImgCard';
import Container from '@components/container';
import SEO from '@components/seo';
import { capitalizeString } from '@utils/helpers/capitalizeString';

const CollectablesAndFashion = () => {
  const router = useRouter();

  return (
    <>
      <SEO
        title="FFXIV Collectables and Fashion"
        description="Check lots of stuff related to the hottest FF MMORPG ever in the block, FFXIV"
      />

      <Container py="16">
        <Heading
          as="h1"
          color="brand.800"
          fontSize={['5xl', null, null, '8xl']}
        >
          FFXIV Collectables and Fashion Stuff
        </Heading>
        <Text fontWeight="medium" fontSize="2xl" pb="4">
          FFXIV has a lot, and I mean a LOT, of things to collect. Of course,
          you need to work hard to get all of these collectables, these things
          don't come effortlessly from the aether realm or something.
        </Text>
        <Text fontSize="xl" pb="4">
          The collectables presented bellow are only a sample of all available
          collectables in the game, because, you could count and add to this
          list fish, crafting recipes, sighseeings etc.. But, of course, that
          would make the list giant, so I chose some of the "cool" collectables
          in the game (yup, it won't work for everyone, I know).
        </Text>
        <Text fontSize="xl">
          If you want to check out all the collectables from the game you can
          visit the{' '}
          <Link
            href="https://ffxivcollect.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FFXIV Collect
          </Link>{' '}
          and{' '}
          <Link
            href="https://triad.raelys.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Another Triple Triad Tracker
          </Link>{' '}
          (specific for triple triad) websites
        </Text>
      </Container>

      <SimpleGrid columns={[1, null, 2]}>
        {[
          {
            name: 'mounts',
            description: 'your trustworthy rides through Eorza',
            img: 'mount.jpg'
          },
          {
            name: 'minions',
            description: 'little friends of yours',
            img: 'minions.jpg'
          }
        ].map((item, i) => (
          <Link key={i} href={`${router.pathname}/${item.name}`}>
            <BgImgCard
              h={64}
              radii={false}
              imgUrl={`/assets/img/ffxiv/${item.img}`}
              imgAlt={`${capitalizeString(item.name)} Image`}
            >
              <Heading
                as="h2"
                textColor="white"
                textAlign="center"
                fontSize={['4xl', null, '6xl']}
              >
                {item.name.replaceAll('-', ' ')}
              </Heading>
              <Text textAlign="center" textColor="white" fontSize="xl">
                {item.description}
              </Text>
            </BgImgCard>
          </Link>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={[1, null, 2, null, 3]}>
        {[
          {
            name: 'armoire',
            description: 'all the pieces of clothing you can imagine',
            img: 'fashion-alt.jpg'
          },
          {
            name: 'accessories',
            description: 'fashionable acessories to pamper you character',
            img: 'umbrellas.jpg'
          },
          {
            name: 'hairstyles',
            description: 'gotta take care of your hair',
            img: 'lodestone.jpeg'
          },
          {
            name: 'emotes',
            description: 'expressing yourself is the key for success',
            img: 'emote-collage.jpg'
          },
          {
            name: 'triple-triad-cards',
            description: 'that cool and complicated card minigame',
            img: 'triple-triad-cards.jpg'
          },
          {
            name: 'orchestrions',
            description: 'music is an outburst of the soul',
            img: 'orchestrion.webp'
          }
        ].map((item, i) => (
          <Link key={i} href={`${router.pathname}/${item.name}`}>
            <BgImgCard
              h={64}
              radii={false}
              imgUrl={`/assets/img/ffxiv/${item.img}`}
              imgAlt={`${capitalizeString(item.name)} Image`}
            >
              <Heading
                as="h2"
                textColor="white"
                textAlign="center"
                fontSize={['4xl', null, '6xl']}
              >
                {item.name.replaceAll('-', ' ')}
              </Heading>
              <Text textAlign="center" textColor="white" fontSize="xl">
                {item.description}
              </Text>
            </BgImgCard>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CollectablesAndFashion;

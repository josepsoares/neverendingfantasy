import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Karla } from '@next/font/google';
import localFont from '@next/font/local';

import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import { nfTheme } from '@styles/theme';

import Footer from '@components/footer';
import Breadcrumbs from '@components/breadcumbs';
import GoToTopButton from '@components/misc/goToTopButton';

import '@styles/globals.css';
import 'nprogress/nprogress.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla'
});

const ffFont = localFont({ src: './_ff-font.ttf', variable: '--font-ff' });

const TopProgressBar = dynamic(
  () => {
    return import('@components/misc/topProgressBar');
  },
  { ssr: false }
);

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <>
      <style jsx global>
        {`
          :root {
            --karla-font: ${karla.style.fontFamily};
            --ff-font: ${ffFont.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={nfTheme}>
            <TopProgressBar />
            <SimpleGrid width="100%" minH="100vh" templateRows="1fr auto">
              {router.pathname !== '/' && (
                <Box
                  pt={14}
                  mx="auto"
                  w={['91.666667%%', '83.333333%', null, '75%']}
                >
                  <Breadcrumbs />
                </Box>
              )}

              {/*  <AnimatePresence mode="wait" initial={false}>
                <motion.main
                  key={router.route}
                  transition={{
                    type: 'tween',
                    duration: 1,
                    ease: 'easeInOut'
                  }}
                  initial={{
                    overflow: 'visible',
                    opacity: 0,
                    height: '100%'
                  }}
                  animate={{
                    overflow: 'visible',
                    opacity: 1,
                    position: 'static'
                  }}
                  exit={{
                    overflow: 'visible',
                    opacity: 0,
                    height: '100%'
                  }}
                > */}
              <Component {...pageProps} />
              {/* </motion.main>
              </AnimatePresence> */}
              <Footer />
            </SimpleGrid>
            <GoToTopButton />
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import { nfTheme } from '@styles/theme';
import { store } from '@redux/store';

import Footer from '@components/common/footer';
import Breadcrumbs from '@components/common/breadcumbs';
import GoToTopButton from '@components/common/buttons/goToTopButton';
import GoBackButton from '@components/common/buttons/goBackButton';

import '@styles/globals.css';
import 'nprogress/nprogress.css';

const TopProgressBar = dynamic(
  () => {
    return import('@components/common/topProgressBar');
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

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={nfTheme}>
          <TopProgressBar />
          <SimpleGrid
            width="100%"
            minH="110vh"
            templateRows={router.pathname !== '/' ? '1fr auto' : '1fr auto'}
          >
            {router.pathname !== '/' && (
              <motion.div
                initial={{ opacity: 0, position: 'absolute', top: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                animate={{ opacity: 1, position: 'static' }}
              >
                <Box px={[12, null, 24, 32]} pt={14}>
                  <Breadcrumbs />
                </Box>
              </motion.div>
            )}

            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() =>
                typeof window !== 'undefined' && window.scrollTo(0, 0)
              }
            >
              <motion.main
                key={router.route}
                transition={{
                  type: 'tween',
                  duration: 0.7,
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
              >
                <Component {...pageProps} />
              </motion.main>
            </AnimatePresence>
            <Footer />
          </SimpleGrid>
          <GoBackButton />
          <GoToTopButton />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default store.withRedux(MyApp);

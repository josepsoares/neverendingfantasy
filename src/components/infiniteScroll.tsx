import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/react-query';

import React, { useEffect, useRef, useState } from 'react';

import { AnimatePresence } from 'framer-motion';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

const InfiniteScroll: React.FC<{
  data: InfiniteData<any>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  skeleton: React.ReactNode;
  endMessage: React.ReactNode;
}> = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  children,
  skeleton,
  endMessage
}) => {
  return (
    <>
      <SimpleGrid columns={[1, null, 2, 3, 4, 5]} gap={8}>
        {children}
        {isFetchingNextPage || isLoading
          ? Array.from(Array(10).keys()).map(i => (
              <AnimatePresence key={`skeleton ${i}`} mode="sync">
                {skeleton}
              </AnimatePresence>
            ))
          : null}
      </SimpleGrid>

      {data?.pages && !hasNextPage ? (
        <Flex justifyContent="center" textAlign="center">
          {endMessage}
        </Flex>
      ) : null}
    </>
  );
};

const InfiniteScrollItemsWrapper: React.FC<{
  hasNextPage: boolean;
  isLastAvailablePage: boolean;
  children: React.ReactNode;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
}> = ({ hasNextPage, isLastAvailablePage, children, fetchNextPage }) => {
  const [intersectionRef, setIntersectionRef] = useState(null);
  const [didIntersect, setDidIntersect] = useState(false);

  // refs
  const observer = useRef(
    typeof window !== 'undefined'
      ? new IntersectionObserver(entries => {
          const el = entries[entries.length - 1];
          setDidIntersect(el.isIntersecting);
        })
      : null
  );

  /**
   * start observing the intersectionRef when its possible
   * the ref starts as null so we need to wait a bit
   */
  useEffect(() => {
    if (intersectionRef) {
      observer?.current.observe(intersectionRef);
    }

    return () => {
      if (intersectionRef) {
        observer?.current.unobserve(intersectionRef);
      }
    };
  }, [intersectionRef]);

  /**
   * check the didIntersect state that is changing
   * if so we add 1 to the pageNum and check if it's less or equal tha maxPage
   */
  useEffect(() => {
    if (didIntersect) {
      if (hasNextPage) {
        fetchNextPage();
      } else {
        observer?.current.unobserve(intersectionRef);
      }
    }
  }, [didIntersect]);

  return (
    <Box
      ref={
        !hasNextPage ? null : isLastAvailablePage ? setIntersectionRef : null
      }
    >
      {children}
    </Box>
  );
};

export { InfiniteScroll, InfiniteScrollItemsWrapper };

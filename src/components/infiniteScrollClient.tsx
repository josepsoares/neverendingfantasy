import React, { useEffect, useRef, useState } from 'react';

import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

const InfiniteScrollClient: React.FC<{
  hasNextPage: boolean;
  hasItems: boolean;
  hasActiveFilters?: boolean;
  name: string;
  children: React.ReactNode;
}> = ({ hasNextPage, hasItems, hasActiveFilters, children, name }) => {
  const endItemsMessage = `Well, there you have it, you scrolled through all the ${name}`;
  const noFilteredItemsMessage = `Ops, it seems there are no ${name} with the filters you chose`;

  return (
    <>
      <SimpleGrid columns={[1, null, 2, 3, 4, null, 5]} gap={8}>
        {children}
      </SimpleGrid>

      {!hasItems && hasActiveFilters ? (
        <Flex mt="12" justifyContent="center" textAlign="center">
          {noFilteredItemsMessage}
        </Flex>
      ) : !hasNextPage ? (
        <Flex mt="12" justifyContent="center" textAlign="center">
          {endItemsMessage}
        </Flex>
      ) : null}
    </>
  );
};

const InfiniteScrollClientItemsWrapper: React.FC<{
  hasNextPage: boolean;
  isLastAvailablePage: boolean;
  children: React.ReactNode;
  setNextPage: () => void;
}> = ({ hasNextPage, isLastAvailablePage, children, setNextPage }) => {
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
        setNextPage();
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

export { InfiniteScrollClient, InfiniteScrollClientItemsWrapper };

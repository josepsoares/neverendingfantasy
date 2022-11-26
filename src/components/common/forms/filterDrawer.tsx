import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure
} from '@chakra-ui/react';

const useFilterDrawer = () => {
  const {
    isOpen: isFilterDrawerOpen,
    onOpen: onFilterDrawerOpen,
    onClose: onFilterDrawerClose
  } = useDisclosure();

  return { isFilterDrawerOpen, onFilterDrawerOpen, onFilterDrawerClose };
};

const FilterDrawer: React.FC<{
  visible: boolean;
  close: any;
  filtersJSX: React.ReactNode;
}> = ({ visible, close, filtersJSX }) => {
  return (
    <Drawer
      isFullHeight={true}
      placement="right"
      onClose={close}
      isOpen={visible}
    >
      <DrawerOverlay />
      <DrawerContent
        textColor="white"
        bg="linear-gradient(-45deg,rgba(0, 0, 53, 1) 0%,rgba(0, 86, 175, 1) 100%)"
      >
        <DrawerCloseButton mt={6} />
        <DrawerHeader mt={4}>Filters</DrawerHeader>

        <DrawerBody>
          <Flex flexDir="column" gap={4}>
            {filtersJSX}
          </Flex>
          <Button mt={8} colorScheme="whiteAlpha">
            Reset filters
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { FilterDrawer, useFilterDrawer };

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';

const useFilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return { isOpen, onOpen, onClose };
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
          {filtersJSX}
          <Button mt={8} colorScheme="whiteAlpha">
            Reset filters
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { FilterDrawer, useFilterDrawer };

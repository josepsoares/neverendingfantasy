import { NextPage } from 'next';
import { useState } from 'react';
import {
  Box,
  FormControl,
  Grid,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure
} from '@chakra-ui/react';

import { useIndexMountsQuery } from '@services/api/ffxivCollectApi';
import Error from '@components/common/feedback/error';
import Loading from '@components/common/feedback/loading';
import {
  FilterDrawer,
  useFilterDrawer
} from '@components/common/forms/filterDrawer';
import HeadingWithFilter from '@components/common/headingWithFilter';
import EmptyData from '@components/common/feedback/emptyData';
import SEO from '@components/common/seo';

import { IMount } from '@ts/interfaces/api/ffxiv/ffxivCollectInterfaces';

const Mounts: NextPage = () => {
  const mounts = useIndexMountsQuery({ limit: 10 });
  const { data, error, isLoading } = mounts;

  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose
  } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<IMount | undefined>(
    undefined
  );

  const { isOpen, onOpen, onClose } = useFilterDrawer();

  console.log(data);

  return (
    <>
      <SEO title="Mounts - FFXIV" />
      <Box px={[12, null, 24, 32]} py={16}>
        <HeadingWithFilter title="Mounts" data={data} onOpen={onOpen} />

        <Box>
          {error ? (
            <Error />
          ) : isLoading ? (
            <Loading />
          ) : data ? (
            <>
              <FilterDrawer
                visible={isOpen}
                close={onClose}
                filtersJSX={
                  <>
                    <FormControl label="Name">
                      <Input placeholder="name of the minion" />
                    </FormControl>
                    <FormControl label="Movement">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Seats">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Source">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Owned">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                    <FormControl label="Patch">
                      <Select options={['one', 'two', 'three']} value={'one'} />
                    </FormControl>
                  </>
                }
              />

              {data.results?.length ? (
                <Grid
                  templateColumns={[
                    '1fr',
                    null,
                    'repeat(2, 1fr)',
                    'repeat(3, 1fr)',
                    'repeat(5, 1fr)'
                  ]}
                  gap="small"
                >
                  {data.results.map((mount: IMount, i) => (
                    <Box
                      key={i}
                      onClick={() => {
                        setSelectedItem(mount);
                        modalOnOpen();
                      }}
                    >
                      <Image src={mount.image} alt={mount.name} />
                      <Box key={i}>{mount.name}</Box>
                    </Box>
                  ))}
                </Grid>
              ) : (
                <EmptyData expression="mounts" />
              )}
            </>
          ) : null}

          <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedItem?.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{selectedItem?.enhanced_description}</ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default Mounts;

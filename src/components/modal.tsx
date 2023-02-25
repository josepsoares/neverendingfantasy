import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';

const BaseModal: React.FC<{
  title: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  whileClosing?: () => void;
}> = ({ title, body, footer, open = false, whileClosing }) => {
  const { isOpen, onClose } = useDisclosure({
    isOpen: open
  });

  return (
    <Modal
      size="xl"
      isCentered
      scrollBehavior="inside"
      motionPreset="slideInBottom"
      closeOnOverlayClick={true}
      closeOnEsc={true}
      isOpen={isOpen}
      onClose={() => {
        if (whileClosing) {
          whileClosing();
        } else {
          onClose();
        }
      }}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(0deg)"
      />
      <ModalContent>
        <ModalHeader
          as="h1"
          pb="0"
          w="95%"
          fontSize="5xl"
          fontFamily="heading"
          color="brand.500"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton mt={3} color="brand.500" />
        <ModalBody pb={8}>{body}</ModalBody>
        {footer ? <ModalFooter>{footer}</ModalFooter> : null}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;

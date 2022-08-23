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
      scrollBehavior="inside"
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
      size="xl"
      isCentered
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(0deg)"
      />
      <ModalContent>
        <ModalHeader as="h1" color="brand.500" fontSize="4xl">
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

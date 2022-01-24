import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalWindowProps = {
  header: string;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
};

function ModalWindow({ header, onClose, isOpen, children }: ModalWindowProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent overflowY={"scroll"}>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </Modal>
  );
}

export default ModalWindow;

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";

export function DetailsModal({ isOpen, onClose, modalData }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        {/* Modal Header */}
        <ModalHeader color="blue.500">{modalData.heading}</ModalHeader>

        {/* Custom Image "X" Button */}
        <Box position="absolute" top="10px" right="10px">
          <Image
            src={`${process.env.PUBLIC_URL}/assets/image/buttons/x.png`} // Replace with your actual image path
            alt="close-button"
            boxSize="30px"
            cursor="pointer"
            onClick={onClose} // Close modal when clicked
          />
        </Box>

        {/* Modal Body */}
        <ModalBody>
          {/* Subheading */}
          <Text fontSize="lg" color="green.500" mb={4}>
            {modalData.subheading}
          </Text>

          {/* Flex container for the passages */}
          <Flex wrap="wrap" justifyContent="space-between">
            {modalData.passages.map((passage, index) => (
              <Box
                key={index}
                flexBasis="calc(50% - 10px)" // Two items per row with a small gap
                mb={4}
              >
                <Text fontWeight="bold" color={passage.titleColor}>
                  {passage.title}
                </Text>
                <Text color={passage.textColor}>{passage.text}</Text>
              </Box>
            ))}
          </Flex>
        </ModalBody>

        {/* Modal Footer */}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

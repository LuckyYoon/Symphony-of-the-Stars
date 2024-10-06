// SideDrawer.js
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Flex,
  IconButton,
  useDisclosure,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function SideDrawer() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  return (
    <>
      {/* Drawer trigger (Hamburger button) */}
      <IconButton
        icon={
          <Image
            src={`${process.env.PUBLIC_URL}/assets/image/buttons/hamburger.png`}
            alt="x"
          />
        }
        onClick={onDrawerOpen}
        position="absolute"
        top="3%"
        right="3%"
        bg="accent.600"
        padding="0"
        height="12px"
        width="12px"
        color="accent.300"
        _hover={{ bg: "accent.600", color: "accent.400" }}
      />

      {/* Side Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent bg="accent.100" height="100%" opacity={0.8}>
          <DrawerBody>
            <Flex
              height="100%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={20}
            >
              <Button
                bg="accent.100"
                color="white"
                fontSize="3xl"
                _hover={{ bg: "accent.100", color: "accent.300" }}
              >
                <Text>ABOUT US</Text>
              </Button>
              <Button
                bg="accent.100"
                color="white"
                fontSize="3xl"
                _hover={{ bg: "accent.100", color: "accent.300" }}
              >
                <Text>PRESENTATION</Text>
              </Button>
              <Button
                bg="accent.100"
                color="white"
                fontSize="3xl"
                _hover={{ bg: "accent.100", color: "accent.300" }}
              >
                <Text>GITHUB</Text>
              </Button>
              <Button
                bg="accent.100"
                color="white"
                fontSize="3xl"
                _hover={{ bg: "accent.100", color: "accent.300" }}
              >
                <Text>NOTION</Text>
              </Button>
              <Button
                bg="accent.100"
                color="white"
                fontSize="3xl"
                _hover={{ bg: "accent.100", color: "accent.300" }}
              >
                <Text>WORKS CITED</Text>
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

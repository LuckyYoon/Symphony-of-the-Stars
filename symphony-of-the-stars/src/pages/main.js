import React, { useState } from "react";
import 
{
  Box,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function MainPage()
{
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();

    const btnRef = React.useRef();

    return (
        <Box
        bgImage="url('/assets/image/background/53567451213_74765a4a5a_4k.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgBlendMode="darken"
        bgColor="rgba(0, 0, 0, 0.2)"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex="-1"
        >
            {/* Title centered above the row of images */}
            <Text
                color="white.200"
                fontSize="4xl"
                fontWeight="bold"
                textAlign="center" // Center the title horizontally
                position="absolute"
                top="7%" // Adjust the top margin to fit your layout
            >
                Journey Through JWST...
            </Text> 
            <Box position="absolute" width="90%" top="50%">
            {/* Horizontal timeline-line */}
            <Box
            position="absolute"
            top="28%"
            left="0"
            right="0"
            height="40px"
            width="100%"
            zIndex="0" // adds the blur effect to soften the edges
            bgGradient="linear(to-r, yellow.100, yellow.100, yellow.100, yellow.100, yellow.100, yellow.100, yellow.100)"
            boxShadow="0 0 2px 1px rgba(254,226,131, 1)"
            borderRadius="75%"
            filter="blur(25px)"
            />
            </Box>
            <IconButton
            icon={<HamburgerIcon />}
            ref={btnRef}
            onClick={onDrawerOpen} // Use drawer's onOpen
            position="absolute"
            top="3%"
            right="3%"
            bg="accent.600"
            padding="0"
            fontSize="32px"
            color="accent.200"
            _hover={{ bg: "accent.600", color: "accent.500" }}
            />
            {/* Side Panel */}
            <Drawer
                isOpen={isDrawerOpen} // Use drawer's isOpen
                placement="right"
                onClose={onDrawerClose} // Use drawer's onClose
                finalFocusRef={btnRef}
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent bg="accent.100" height="100%" opacity="80%">
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
                        color="accent.500"
                        fontSize="3xl"
                        _hover={{ bg: "accent.100", color: "accent.300" }}
                    >
                        <Text>ABOUT US</Text>
                    </Button>
                    <Button
                        bg="accent.100"
                        color="accent.500"
                        fontSize="3xl"
                        _hover={{ bg: "accent.100", color: "accent.300" }}
                    >
                        <Text>PRESENTATION</Text>
                    </Button>
                    <Button
                        bg="accent.100"
                        color="accent.500"
                        fontSize="3xl"
                        _hover={{ bg: "accent.100", color: "accent.300" }}
                    >
                        <Text>GITHUB</Text>
                    </Button>
                    <Button
                        bg="accent.100"
                        color="accent.500"
                        fontSize="3xl"
                        _hover={{ bg: "accent.100", color: "accent.300" }}
                    >
                        <Text>NOTION</Text>
                    </Button>
                    <Button
                        bg="accent.100"
                        color="accent.500"
                        fontSize="3xl"
                        _hover={{ bg: "accent.100", color: "accent.300" }}
                    >
                        <Text>WORKS CITED</Text>
                    </Button>
                    </Flex>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
import React, { useState } from "react";
import 
{
  Box,
  Text
} from "@chakra-ui/react";

export default function MainPage()
{
    return (
        <Box
        bgImage="url('/assets/background/53567451213_74765a4a5a_4k.jpg')"
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
        </Box>
    );
}
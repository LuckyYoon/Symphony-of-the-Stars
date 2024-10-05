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
        bgImage="url('/assets/images/background/53567451213_74765a4a5a_4k.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgBlendMode="darken"
        bgColor="rgba(0, 0, 0, 0.7)"
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
                Journey Through the JWST...
            </Text> 
        </Box>
    );
}
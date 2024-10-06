import React, { useEffect, useRef, useState, useContext } from "react";
import { Box, HStack, Text, VStack, Button } from "@chakra-ui/react";
import imagesData from "../assets/json/main.json"; // Import JSON data
import { UserInteractionContext } from "../UserInteractionContext";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../components/SideDrawer";

export default function MainPage() {
  const { hasUserConsented } = useContext(UserInteractionContext);
  const audioRef = useRef(null); // Reference to the audio element

  const [zoomedImages, setZoomedImages] = useState({}); // Store zoom state for each image
  const navigate = useNavigate(); // React Router's hook for navigation

  // Attempt to autoplay music when the component mounts
  useEffect(() => {
    if (hasUserConsented && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => {
        console.error("Failed to autoplay music:", e);
      });
    }
  }, [hasUserConsented]);

  const handleImageClick = (index, nextPage) => {
    // Start the zoom animation using the image's index
    setZoomedImages((prev) => ({ ...prev, [index]: true }));

    // Wait for zoom animation to complete before navigating
    setTimeout(() => {
      navigate(nextPage); // Navigate to the specified page
    }, 1000); // Duration of zoom animation
  };

  const handleRedirectToJWST = () => {
    navigate("/jwst"); // Redirect to /jwst page
  };

  return (
    <Box
      bgImage={`url(${process.env.PUBLIC_URL}/assets/image/background/53567451213_74765a4a5a_4k.jpg)`}
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
      {/* Title */}
      <Text
        color="accent.400"
        fontSize="4xl"
        fontWeight="bold"
        textAlign="center"
        position="absolute"
        top="7%"
      >
        The Universe Through the Eyes of JWST
      </Text>

      {/* Redirect Button */}
      <Button
        position="absolute"
        top="10px"
        left="10px"
        colorScheme="yellow"
        variant="solid"
        onClick={handleRedirectToJWST}
        zIndex="999" // Ensure the button is on top
      >
        Go to JWST
      </Button>

      {/* Side Drawer */}
      <SideDrawer />

      {/* Decorative Horizontal Line */}
      <Box
        alignSelf="center"
        position="absolute"
        top="51%"
        left="50%"
        transform="translateX(-50%)"
        height="8px"
        width="90%"
        zIndex="0"
        bgGradient="linear(to-r, white, yellow.100, yellow.100, yellow.200, yellow.100, yellow.100, white)"
        boxShadow="0 0 3px 1px rgba(254,226,131, 0.9)"
        borderRadius="50%"
        filter="blur(2px)"
      />

      {/* Images */}
      <Box position="absolute" width="90%" top="45%">
        <HStack justifyContent="center" spacing={100}>
          {imagesData.images.map((image, index) => (
            <VStack spacing={2} align="center" key={index}>
              <Box
                height="125px"
                width="125px"
                borderRadius="full"
                backgroundImage={`${process.env.PUBLIC_URL}${image.image_path}`}
                backgroundSize={zoomedImages[index] ? "100%" : "150%"}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                boxShadow="0 0 7px 7px rgba(0,0,0, 0.9)"
                zIndex={zoomedImages[index] ? "999" : "1"}
                transform={zoomedImages[index] ? "scale(40)" : "scale(1)"}
                transition={
                  zoomedImages[index]
                    ? "transform 1.5s ease-in, background-size 1.5s ease-in"
                    : "transform 0.1s ease-out, background-size 0.1s ease-out"
                }
                cursor="pointer"
                _hover={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backgroundBlendMode: "darken",
                }}
                onClick={() => handleImageClick(index, image.next_page)} // Pass the index and next page
              />
              <Text
                color="accent.400"
                fontSize="xl"
                whiteSpace="pre-line"
                fontWeight="bold"
                align="center"
              >
                {image.description}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Box>

      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/assets/music/main.wav`}
        loop
      />
    </Box>
  );
}

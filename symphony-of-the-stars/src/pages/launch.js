import React, { useEffect, useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Import the JSON file for launch story
import imagesData from "../assets/json/launch.json"; // Adjust path as needed

export default function LaunchPage() {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTextFadingOut, setIsTextFadingOut] = useState(false); // For text fade out
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const navigate = useNavigate();

  const fullText = "Hello JWST!";
  const typingSpeed = 200; // 0.2 seconds per character
  const imageDuration = 4000; // Time each image stays visible, including transitions
  const fadeDuration = 500; // Time for fading between images
  const pageFadeDuration = 1000; // Time for fading out to the next page
  const totalDuration =
    (imageDuration + fadeDuration) * imagesData.images.length;

  // Typewriter effect for "Hello JWST!"
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const typingTimeout = setTimeout(() => {
        setTypedText((prev) => fullText.slice(0, prev.length + 1));
      }, typingSpeed);
      return () => clearTimeout(typingTimeout);
    } else {
      // Start fading out the text after it finishes typing
      setTimeout(() => {
        setIsTextFadingOut(true);
        setTimeout(() => setIsTypingComplete(true), fadeDuration); // Wait for fade to complete before showing slideshow
      }, 1000); // Short delay before fading out text
    }
  }, [typedText, fullText, typingSpeed, fadeDuration]);

  // Transition from typing to slideshow after typing is complete
  useEffect(() => {
    if (isTypingComplete) {
      const transitionTimeout = setTimeout(() => {
        setShowSlideshow(true); // Show the slideshow
      }, fadeDuration); // Use fadeDuration for smooth transition
      return () => clearTimeout(transitionTimeout);
    }
  }, [isTypingComplete, fadeDuration]);

  // Slideshow effect
  useEffect(() => {
    if (showSlideshow) {
      const interval = setInterval(() => {
        setImageOpacity(0); // Fade out the current image
        setTimeout(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % imagesData.images.length
          );
          setImageOpacity(1); // Fade in the next image
        }, fadeDuration); // Wait for the fade-out before changing images
      }, imageDuration + fadeDuration); // Time for image + fade

      // Transition to the next page after all images are shown
      const nextPageTimeout = setTimeout(() => {
        setIsFadingOut(true); // Start fading out the entire page
        setTimeout(() => {
          navigate("/main"); // Navigate to the next page after the fade-out
        }, pageFadeDuration); // Use the page fade duration for this transition
      }, totalDuration); // After all images have been shown

      // Cleanup intervals and timeouts on unmount
      return () => {
        clearInterval(interval);
        clearTimeout(nextPageTimeout);
      };
    }
  }, [
    showSlideshow,
    navigate,
    imageDuration,
    fadeDuration,
    totalDuration,
    pageFadeDuration,
  ]);

  const currentImage = imagesData.images[currentImageIndex];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="accent.600"
      color="white"
      position="relative"
      overflow="hidden"
      opacity={isFadingOut ? 0 : 1}
      transition={`opacity ${fadeDuration}ms ease-in-out`}
    >
      {!showSlideshow ? (
        // Display the "Hello JWST!" text until typing is complete, with fade-out effect
        <Text
          fontSize="6xl"
          fontWeight="bold"
          textAlign="center"
          opacity={isTextFadingOut ? 0 : 1}
          transition={`opacity ${fadeDuration}ms ease-in-out`}
        >
          {typedText}
        </Text>
      ) : (
        // Display the slideshow after typing is complete
        <>
          <Image
            src={currentImage.image_path}
            alt={currentImage.title}
            width="100%"
            height="100%"
            objectFit="cover"
            position="absolute"
            opacity={imageOpacity}
            transition={`opacity ${fadeDuration}ms ease-in-out`}
            zIndex="0"
          />
          <Text
            position="absolute"
            bottom={currentImage.bottom_offset}
            left={currentImage.left_offset}
            transform="translateX(-50%)"
            color={currentImage.color}
            fontSize="3xl"
            fontWeight="bold"
            zIndex="1"
            textAlign="center"
            whiteSpace="normal"
            wordBreak="break-word"
          >
            {`${currentImage.description}`}
          </Text>
        </>
      )}
    </Box>
  );
}
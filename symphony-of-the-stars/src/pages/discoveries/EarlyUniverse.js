import React, { useEffect, useRef, useContext, useState } from "react";
import { Box, IconButton, Tooltip, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import discoveriesData from "../../assets/json/discoveries.json";
import { UserInteractionContext } from "../../UserInteractionContext";

export default function EarlyUniversePage() {
  const { hasUserConsented } = useContext(UserInteractionContext);
  const audioRefDefault = useRef(null); // Reference for the default background audio element
  const audioRefs = useRef([]); // Reference array for characteristic audios
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState([false, false, false]); // Track for the 3 buttons
  const [isAllPlaying, setIsAllPlaying] = useState(false);

  // Directly access the Planetary Nebula data (id = 0)
  const data = discoveriesData.discoveries[3];

  useEffect(() => {
    if (hasUserConsented && audioRefDefault.current) {
      audioRefDefault.current.volume = 0.5; // Default audio volume
      audioRefDefault.current.play().catch((e) => {
        console.error("Failed to autoplay default music:", e);
      });
    }
  }, [hasUserConsented]);

  // Handle toggling volume for characteristic audio tracks
  const handleSetVolume = (index) => {
    const updatedIsPlaying = [...isPlaying];
    const audio = audioRefs.current[index];

    if (audio) {
      if (updatedIsPlaying[index]) {
        // If it's playing, mute the audio by setting volume to 0.0
        audio.volume = 0.0;
      } else {
        // If it's not playing, set the volume to 0.5
        audio.volume = 0.5;
      }
      updatedIsPlaying[index] = !updatedIsPlaying[index]; // Toggle the state
      setIsPlaying(updatedIsPlaying); // Update the state array
    }
  };

  // Toggle Play All/Pause All characteristic audio tracks
  const handleTogglePlayPauseAll = () => {
    const updatedIsPlaying = [...isPlaying]; // Make a copy of the current isPlaying state

    if (isAllPlaying) {
      // Pause all audio tracks
      audioRefs.current.forEach((audio, index) => {
        if (audio) {
          audio.pause();
          updatedIsPlaying[index] = false; // Update the individual play state
        }
      });
      setIsAllPlaying(false); // Update state to indicate all tracks are paused
    } else {
      // Play all audio tracks
      audioRefs.current.forEach((audio, index) => {
        if (audio) {
          audio.volume = 0.5;
          audio.play().catch((e) => console.error("Failed to play track:", e));
          updatedIsPlaying[index] = true; // Update the individual play state
        }
      });
      setIsAllPlaying(true); // Update state to indicate all tracks are playing
    }
    setIsPlaying(updatedIsPlaying); // Set the updated individual state
  };

  useEffect(() => {
    // Set all audio tracks to play on loop with initial volume 0.0 except the default track
    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        audio.volume = 0.0; // Set initial volume to 0.0 for all except default
        audio
          .play()
          .catch((e) => console.error(`Failed to autoplay track ${index}:`, e));
      }
    });
  }, []);

  return (
    <Box height="100vh" width="100vw" position="relative" bg="black">
      {/* Full-Screen Background Image */}
      <Box
        height="100%"
        width="100%"
        backgroundImage={`${process.env.PUBLIC_URL}${data.image_path}`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      />

      {/* Close Button */}
      <IconButton
        icon={
          <Image
            src={`${process.env.PUBLIC_URL}/assets/image/buttons/x.png`}
            alt="x"
            position="absolute"
          />
        }
        onClick={() => navigate("/main")}
        position="absolute"
        top="25px"
        right="25px"
        bg="accent.600"
        opacity={0.5}
        color="white"
        _hover={{ bg: "accent.200" }}
        boxSize="50px"
        fontSize="25px"
      />
      <Image
        src={`${process.env.PUBLIC_URL}/assets/image/buttons/orchestrate.png`}
        alt="Orchestrate"
        height="40px"
        width="180px"
        position="absolute"
        bottom="55px"
        right="55px"
      />

      {/* Play All/Pause All Button */}
      <IconButton
        icon={
          <Image
            src={
              isAllPlaying
                ? `${process.env.PUBLIC_URL}/assets/image/buttons/on.png`
                : `${process.env.PUBLIC_URL}/assets/image/buttons/off.png`
            }
            alt="toggle-play-pause-all"
            boxSize="100px"
          />
        }
        onClick={handleTogglePlayPauseAll}
        position="absolute"
        bottom="119px"
        right="95px"
        bg="transparent"
        opacity={1}
        _hover={{ bg: "transparent" }}
        size="lg"
      />

      {/* Audio Element for the default music (always plays) */}
      <audio
        ref={audioRefDefault}
        src={`${process.env.PUBLIC_URL}/assets/music/first_glimpse_of_the_early_universe/strings.wav`}
        loop
      />

      {/* Render Play/Volume Buttons for 3 Characteristics */}
      {data.characteristics.slice(0, 3).map((char, index) => (
        <Box
          key={index}
          position="absolute"
          top={char.dot_position.top}
          left={char.dot_position.left}
          transform="translate(-50%, -50%)"
        >
          <Tooltip label={char.description}>
            <IconButton
              icon={
                <Image
                  src={
                    isPlaying[index]
                      ? `${process.env.PUBLIC_URL}/assets/image/buttons/pause.png`
                      : `${process.env.PUBLIC_URL}/assets/image/buttons/play.png`
                  }
                  alt="logo"
                  boxSize="100px" // Adjust size to fit the button
                />
              }
              onClick={() => handleSetVolume(index)}
              bg="transparent"
              opacity={1}
              _hover={{ bg: "transparent" }}
              size="lg"
            />
          </Tooltip>
          {/* Hardcoded audio paths for each characteristic */}
          <audio
            ref={(el) => (audioRefs.current[index] = el)}
            src={
              index === 0
                ? `${process.env.PUBLIC_URL}/assets/music/first_glimpse_of_the_early_universe/base.wav`
                : index === 1
                ? `${process.env.PUBLIC_URL}/assets/music/first_glimpse_of_the_early_universe/others.wav`
                : `${process.env.PUBLIC_URL}/assets/music/first_glimpse_of_the_early_universe/strings.wav`
            }
            loop
          />
        </Box>
      ))}
    </Box>
  );
}
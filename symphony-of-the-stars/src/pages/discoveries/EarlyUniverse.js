import React, { useEffect, useRef, useContext, useState } from "react";
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import discoveriesData from "../../assets/json/discoveries.json";
import { UserInteractionContext } from "../../UserInteractionContext";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";


export default function EarlyUniversePage() {
 const { hasUserConsented } = useContext(UserInteractionContext);
 const audioRefDefault = useRef(null); // Reference for the default background audio element
 const audioRefs = useRef([]); // Reference array for characteristic audios
 const navigate = useNavigate();
 const [isPlaying, setIsPlaying] = useState([false, false, false]); // Track for the 3 buttons


 // Directly access the Planetary Nebula data (id = 0)
 const data = discoveriesData.discoveries[4];


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
       backgroundImage={`url(${data.image_path})`}
       backgroundSize="cover"
       backgroundPosition="center"
       backgroundRepeat="no-repeat"
     />


     {/* Close Button */}
     <IconButton
       icon={<CloseIcon />}
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


     {/* Audio Element for the default music (always plays) */}
     <audio
       ref={audioRefDefault}
       src="/assets/music/first_glimpse_of_the_early_universe/percussion.wav"
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
             icon={isPlaying[index] ? <FaVolumeMute /> : <FaVolumeUp />}
             onClick={() => handleSetVolume(index)}
             bg="accent.600"
             opacity={0.5}
             color="white"
             _hover={{ bg: "accent.200" }}
             size="lg"
           />
         </Tooltip>
         {/* Hardcoded audio paths for each characteristic */}
         <audio
           ref={(el) => (audioRefs.current[index] = el)}
           src={
             index === 0
               ? "/assets/music/first_glimpse_of_the_early_universe/bass.wav"
               : index === 1
               ? "/assets/music/first_glimpse_of_the_early_universe/others.wav"
               : "/assets/music/first_glimpse_of_the_early_universe/strings.wav"
             
           }
           loop
         />
       </Box>
     ))}
   </Box>
 );
}
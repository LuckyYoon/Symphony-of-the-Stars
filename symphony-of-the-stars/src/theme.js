import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    accent: {
      100: "#0c222b",
      200: "#3e4b56",
      300: "#a79d9c",
      400: "#d4c2b8",
      500: "#b28665",
      600: "#161618",
    },
  },
  styles: {
    global: {
      body: {
        bg: "accent.600", // Set global background color to accent.600
        color: "white",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        fontFamily: `"Segoe UI","Helvetica", "Verdana", sans-serif`, // Set global font family to monospace
      },
      "*": {
        textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
      },
    },
  },
});

export default theme;

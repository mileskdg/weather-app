import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import { useEffect, useState } from "react";
import useWeather from "./hooks/useWeather";
import bgMap from "./utils/bgMap";

function App() {
  const [location, setLocation] = useState("Bloemfontein");
  const { data, isLoading, error } = useWeather(location);

  useEffect(() => {
    const stored = localStorage.getItem("chakra-ui-color-mode");

    if (stored === "light") {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    }
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <Box
      p={6}
      minH="100vh"
      backgroundImage={`url(${bgMap[data.days[1].icon as keyof typeof bgMap]})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box position="absolute" inset="0" bg="blackAlpha.600" />

      {/* Nav */}
      <Box mb={6}>
        <NavBar setLocation={setLocation} />
      </Box>

      {/* Weather */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
        position="relative"
        zIndex="1"
      >
        <Grid
          w={{ base: "100%", lg: "50%" }}
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          minH={{ base: "700px", lg: "500px" }}
          borderStyle="solid"
          borderWidth="1px"
          borderRadius="5px"
          backgroundColor="rgba(0, 0, 0, 0.4)"
        >
          <Box
            p={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRightStyle="solid"
            borderRightWidth="1px"
            paddingBottom={0}
          >
            <LeftSection location={location} />
          </Box>
          <Box
            p={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop={0}
          >
            <RightSection location={location} />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;

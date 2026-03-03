import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import useWeather from "../hooks/useWeather";
import iconMap from "../utils/iconMap";

interface Props {
  location: string;
}

const RightSection = ({ location }: Props) => {
  const { data, isLoading, error, refetch, isFetching } = useWeather(location);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <Spinner size="xl" />
      </Box>
    );

  if (error || !data)
    return (
      <Text color="red.400" textAlign="center">
        City not found. Please try another location.
      </Text>
    );

  return (
    <Box
      h="100%"
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {/* Precipitation, Humidity, Wind */}
      <Box w="100%">
        <Box display="flex" justifyContent="space-between" w="100%">
          <Text>Rain</Text>
          <Text>{data.days[0].precipprob}%</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" w="100%">
          <Text>Humidity</Text>
          <Text>{data.currentConditions.humidity}%</Text>
        </Box>
        <Box display="flex" justifyContent="space-between" w="100%">
          <Text>Wind</Text>
          <Text>{data.currentConditions.windspeed} km/h</Text>
        </Box>
      </Box>

      {/* Recent weather grid */}
      <Grid
        templateColumns="repeat(3, minmax(0, 1fr))"
        gap={2}
        minH="20vh"
        w="100%"
      >
        {data.days.map((d, i) => (
          <GridItem
            key={i}
            p={2}
            w="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            borderStyle="solid"
            borderWidth="1px"
            borderRadius="6px"
            bg="rgba(37, 19, 201, 0.25)"
            cursor="pointer"
            _hover={{ bg: "rgba(37, 19, 201, 0.7)" }}
            transition="background 0.25s"
          >
            {iconMap[d.icon as keyof typeof iconMap]}{" "}
            {/* Render icon directly */}
            <Text textAlign="center" noOfLines={1} w="100%">
              {new Date(d.datetime).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </Text>
            <Box display="flex" gap={1}>
              <Text fontSize="xs">{d.feelslikemin}°</Text>
              <Text fontSize="xs">{d.feelslikemax}°</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Refresh button */}
      <Box>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          colorScheme="blue"
          gap={2}
        >
          {!isFetching ? (
            <>
              <i className="bi bi-arrow-clockwise" /> Refresh
            </>
          ) : (
            <Spinner size="sm" />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default RightSection;

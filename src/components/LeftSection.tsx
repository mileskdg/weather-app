import { Box, Spinner, Text } from "@chakra-ui/react";
import useLocalTime from "../hooks/useLocalTime";
import useWeather from "../hooks/useWeather";
import iconMap from "../utils/iconMap";

interface Props {
  location: string;
}

const LeftSection = ({ location }: Props) => {
  const { data, isLoading, isError } = useWeather(location);
  const localTime = useLocalTime(data?.timezone);

  if (isLoading) return <Spinner />;
  // if (error) return <Text>{error.message}</Text>;

  if (isError)
    return (
      <Text color="red.400">City not found. Please try another location.</Text>
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
      {/* Location */}
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text noOfLines={1}>
            <i className="bi bi-geo-alt-fill"></i> {data.resolvedAddress}
          </Text>
          <Text>{localTime}</Text>
        </Box>
      </Box>
      {/* Date */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Text>
          {new Date(data.days[1].datetime).toLocaleDateString("en-us", {
            weekday: "long",
          })}
        </Text>
        <Text>{data.days[0].datetime.replace(/-/g, " ")}</Text>
      </Box>
      {/* Type of day */}
      <Box display="flex" flexDirection="column" alignItems="center">
        {iconMap[data.days[1].icon as keyof typeof iconMap]}
        <Text>{data.currentConditions.conditions}</Text>
      </Box>
      {/* High */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Text>Temp:</Text>
        <Text color="gray">{data.currentConditions.feelslike}°C</Text>
      </Box>
      {/* Temperature */}
      <Box>
        <Text>
          <i className="bi bi-arrow-down" />
          {data.days[1].feelslikemin}°C / {data.days[1].feelslikemax}°C{" "}
          <i className="bi bi-arrow-up" />
        </Text>
      </Box>
    </Box>
  );
};

export default LeftSection;

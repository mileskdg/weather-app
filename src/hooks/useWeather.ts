import { useQuery } from "@tanstack/react-query";
import apiClient, { Location } from "../services/apiClient";
import { formatDate } from "../utils/dateSelector";

const useWeather = (location: string) => {
  return useQuery<Location, Error>({
    queryKey: ["weather", location],
    queryFn: () =>
      apiClient
        .get<Location>(
          `/${location}/${formatDate("YESTERDAY")}/${formatDate("TOMORROW")}`,
        )
        .then((res) => res.data),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: !!location,
  });
};

export default useWeather;

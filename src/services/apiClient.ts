import axios from "axios";

interface Day {
  datetime: string;
  feelslikemin: number;
  feelslikemax: number;
  feelslike: number;
  precipprob: number;
  icon: string;
}

interface currentConditions {
  feelslike: number;
  humidity: number;
  windspeed: number;
  conditions: string;
}

export interface Location {
  resolvedAddress: string;
  timezone: string;
  days: Day[];
  currentConditions: currentConditions;
}

export default axios.create({
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
  params: {
    key: "CSEELDRS5GPMRMJPDLDTWW7JF",
    unitGroup: "metric",
    include: "current,days",
  },
});

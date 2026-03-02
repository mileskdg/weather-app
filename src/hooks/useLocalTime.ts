import { useEffect, useState } from "react";

const useLocalTime = (timezone?: string) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timezone) return "";

  return new Intl.DateTimeFormat("en-us", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
};

export default useLocalTime;

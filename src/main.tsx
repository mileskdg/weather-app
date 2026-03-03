import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import App from "./App";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const client = new QueryClient();
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

useEffect(() => {
  const stored = localStorage.getItem("chakra-ui-color-mode");

  if (stored === "light") {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }
}, []);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ColorModeScript initialColorMode="dark" />
      <ChakraProvider theme={theme}>
        <App />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

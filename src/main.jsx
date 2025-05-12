import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { MantineProvider } from "@mantine/core";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "~/components/App/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "~/theme";
import axios from "axios";

axios.interceptors.response.use(
  response => response,
  error => {
    console.log("Request error", error);
    const status = error.response?.status;
    const data = JSON.stringify(error.response?.data);

    if (status === 400) {
      alert(`400 Bad Request: ${data}`);
    }

    if (status === 401) {
      alert(`401 Unauthorized: ${data}`);
    }

    if (status === 403) {
      alert(`403 Forbidden: ${data}`);
    }
    
    return Promise.reject(error.response);
  },
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

// if (import.meta.env.DEV) {
//   const { worker } = await import("./mocks/browser");
//   worker.start({ onUnhandledRequest: "bypass" });
// }

let token = localStorage.getItem("authorization_token");
if (token === null)
    localStorage.setItem("authorization_token", "Z2VycmtvZmY6VEVTVF9QQVNTV09SRA==");

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

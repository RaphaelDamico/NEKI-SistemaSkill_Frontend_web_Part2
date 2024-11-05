import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterUserProvider } from "./contexts/RegisterUserContext/index.tsx";
import { AuthUserProvider } from "./contexts/AuthUserContext/index.tsx";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default.ts";
import { GlobalStyle } from "./styles/global.ts";
import RoutesApp from "./router/index.tsx";

export function App() {
  return (
    <RegisterUserProvider>
      <AuthUserProvider>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <ToastContainer autoClose={3000} />
            <RoutesApp />
          </BrowserRouter>
          <GlobalStyle />
        </ThemeProvider>
      </AuthUserProvider>
    </RegisterUserProvider>
  );
}
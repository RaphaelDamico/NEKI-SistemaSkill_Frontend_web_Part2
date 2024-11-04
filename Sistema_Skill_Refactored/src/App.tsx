import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from "./router/index.tsx";
import { RegisterUserProvider } from "./contexts/RegisterUserContext/index.tsx";
import { AuthUserProvider } from "./contexts/AuthUserContext/index.tsx";

export function App() {
  return (
    <RegisterUserProvider>
      <AuthUserProvider>
        <BrowserRouter>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </BrowserRouter>
      </AuthUserProvider>
    </RegisterUserProvider>
  );
}
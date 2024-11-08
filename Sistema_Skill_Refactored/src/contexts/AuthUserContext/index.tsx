import { ReactNode, createContext, useContext, useState } from "react";
import { AuthUserContextProps } from "../../interfaces";

const AuthUserContext = createContext<AuthUserContextProps | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <AuthUserContext.Provider value={{
            username,
            setUsername,
            password,
            setPassword,
            loading,
            setLoading
        }}>
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuthUser = (): AuthUserContextProps => {
    const context = useContext(AuthUserContext);
    if (!context)
        throw new Error("useAuthUser deve ser usado com um AuthUserProvider");
    return context;
};
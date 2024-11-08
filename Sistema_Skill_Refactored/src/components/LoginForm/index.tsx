import Input from "../Input";
import Checkbox from "../Checkbox";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useEffect, useState } from "react";
import { signinUser } from "../../api/api";
import { ErrorContainer, ErrorSpan, FormContainer, FormContent, LoadingIcon } from "./styles";
import { useTheme } from "styled-components";

export default function LoginForm() {
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

    const theme = useTheme();

    const {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        setLoading
    } = useAuthUser();

    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem("savedUsername");
        const savedPassword = localStorage.getItem("savedPassword");

        if (savedUsername) {
            setUsername(savedUsername);
            setIsChecked(true);
        }
        if (savedPassword) {
            setPassword(savedPassword);
            setIsChecked(true);
        }
    }, [setUsername, setPassword]);

    const loginUser = async () => {
        if(!username){
            setHasError(true);
            setErrorMessage("Digite um nome de usuário")
            return;
        }
        if(!password){
            setHasError(true);
            setErrorMessage("Digite uma senha")
            return;
        }
        setHasError(false);
        setErrorMessage("");
        setLoading(true);
        try {
            await signinUser({ username, password });
            navigate("/");
            if (isChecked) {
                localStorage.setItem("savedUsername", username);
                localStorage.setItem("savedPassword", password);
            } else {
                localStorage.removeItem("savedUsername");
                localStorage.removeItem("savedPassword");
            }
        } catch (error) {
            setHasError(true);
            setErrorMessage("Falha no login. Verifique suas credenciais e tente novamente.");
            console.error("Falha no login", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            localStorage.setItem("savedUsername", username);
            localStorage.setItem("savedPassword", password);
        } else {
            localStorage.removeItem("savedUsername");
            localStorage.removeItem("savedPassword");
        }
    };

    return (
        <FormContainer>
            <FormContent
                onSubmit={(e) => {
                    e.preventDefault();
                    loginUser();
                }}
            >
                <div>
                    <Input
                        label="Login"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Digite seu nome de usuario"
                        id="username"
                    />
                    <Input
                        label="Senha"
                        type="password"
                        hasIcon
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        id="password"
                    />
                    <Checkbox
                        label={"Salvar senha"}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    {hasError &&
                        <ErrorContainer>
                            <ErrorSpan>{errorMessage}</ErrorSpan>
                        </ErrorContainer>
                    }
                </div>
                <div>
                    <Button
                        content={loading ? <LoadingIcon name="loading" /> : "Entrar"}
                        type="submit"
                        backgroundColor={theme.BLUE_700}
                    />
                    <Button
                        content={"Cadastrar"}
                        onClick={() => navigate("/cadastro")}
                        backgroundColor={theme.GREEN}
                    />
                </div>
            </FormContent>
        </FormContainer>
    );
}
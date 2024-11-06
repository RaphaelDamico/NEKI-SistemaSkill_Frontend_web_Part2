import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useRegisterUser } from "../../contexts/RegisterUserContext";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/api";
import { ErrorContainer, ErrorSpan, FormContainer, FormContent, LoadingIcon } from "./styles";
import { useTheme } from "styled-components";

export default function RegisterForm() {
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const theme = useTheme();

    const {
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        setLoading
    } = useRegisterUser();

    const navigate = useNavigate();

    const validatePassword = (password: string) => {
        const regexp = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
        return regexp.test(password);
    };


    const registerUser = async () => {
        if(!username){
            setHasError(true);
            setErrorMessage("Digite o nome de usuário")
            return;
        }
        if (password !== confirmPassword) {
            setHasError(true);
            setErrorMessage("As senhas não correspondem");
            return;
        }

        if (!validatePassword(password)) {
            setHasError(true);
            setErrorMessage("A senha deve ter 8-30 caracteres, com uma letra maiúscula, um número e um caractere especial.");
            return;
        }
        setHasError(false);
        setErrorMessage("");
        setLoading(true);
        try {
            await signupUser({ username, password });
            navigate("/login");
        } catch (error: unknown) {
            if (error instanceof Error && error.message === "Este nome de usuário já existe") {
                setHasError(true);
                setErrorMessage(error.message);
            } else {
                console.error("Registro do usuário falhou", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <FormContent
                onSubmit={(e) => {
                    e.preventDefault();
                    registerUser();
                }}
            >
                <Input
                    label="Usuario"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite seu nome de usuario"
                    id="username"
                />
                <Input
                    label="Senha"
                    type={"password"}
                    hasIcon
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    id="password"
                />
                <Input
                    label="Confirmar senha"
                    type={"password"}
                    hasIcon
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    id="password"
                />
                {hasError &&
                    <ErrorContainer>
                        <ErrorSpan>{errorMessage}</ErrorSpan>
                    </ErrorContainer>}
                <Button
                    content={loading ? <LoadingIcon name="loading" /> : "Cadastrar"}
                    type="submit"
                    backgroundColor={theme.BLUE_700}
                />
                <Button
                    content={"Cancelar"}
                    onClick={() => navigate("/login")}
                    backgroundColor={theme.GREEN}
                />
            </FormContent>
        </FormContainer>
    );
};
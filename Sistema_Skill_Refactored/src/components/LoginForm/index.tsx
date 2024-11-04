import Input from "../Input";
import styles from "./styles.module.css"
import Checkbox from "../Checkbox";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useEffect, useState } from "react";
import { signinUser } from "../../api/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginForm() {
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

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

    const loginUser = async() => {
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
        <section className={styles.formContainer}>
            <form
                className={styles.formContent}
                onSubmit={(e) => {
                    e.preventDefault();
                    loginUser();
                }}
            >
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
                    <div className={styles.errorContainer}>
                        <span className={styles.errorSpan}>{errorMessage}</span>
                    </div>
                }
                <Button
                    content={loading ? <AiOutlineLoading3Quarters className={styles.loadingIcon} /> : "Entrar"}
                    type="submit"
                    backgroundColor={"#1A374B"}
                />
                <Button
                    content={"Cadastrar"}
                    onClick={() => navigate("/cadastro")}
                    backgroundColor={"#4EB888"}
                />
            </form>
        </section>
    );
}
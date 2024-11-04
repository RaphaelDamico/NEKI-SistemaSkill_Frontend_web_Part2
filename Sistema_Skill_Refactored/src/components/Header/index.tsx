import { HeaderProps } from "../../interfaces";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export default function Header({ setIsModalOpen }: HeaderProps) {
    const navigate = useNavigate();

    const username = localStorage.getItem("savedUsername");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const signout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <header className={styles.headerContainer}>
            <section className={styles.wellcomeAndLogoutContent}>
                <Button
                    content={
                        <Icon
                            name={"logout"}
                            color="#F9F9F9"
                            size={18}
                        />

                    }
                    backgroundColor="#19536E"
                    width={70}
                    onClick={signout}
                />
                <h1>Bem vindo(a) {username}</h1>
            </section>
            <section className={styles.listSkillsAndAddButtonContent}>
                <h1>Lista de Skills</h1>
                <Button
                    content={"+ Adicionar skill"}
                    backgroundColor="#19536E"
                    width={200}
                    onClick={handleOpenModal}
                />
            </section>
        </header>
    );
};

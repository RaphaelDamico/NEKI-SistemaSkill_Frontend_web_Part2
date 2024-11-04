import { DeleteModalProps } from "../../interfaces";
import Button from "../Button";
import styles from "./styles.module.css";

export default function DeleteModal({ isVisibleModal, onCancel, onDelete }: DeleteModalProps) {

    return (
        <>
            {isVisibleModal &&
                <>
                    <div className={styles.modalOverlay} />
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h1>Deseja realmente deletar a Skill?</h1>
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                content={"Cancelar"}
                                backgroundColor="#D9534F"
                                width={100}
                                onClick={() => onCancel()}
                            />
                            <Button
                                content={"Deletar"}
                                backgroundColor="#356F7A"
                                width={100}
                                onClick={() => onDelete()}
                            />
                        </div>
                    </div>
                </>
            }
        </>
    );
};
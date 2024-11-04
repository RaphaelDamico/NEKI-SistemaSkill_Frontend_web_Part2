import { CardModalProps } from "../../interfaces";
import Checkbox from "../Checkbox";
import styles from "./styles.module.css";

export default function CardModal({skill, onChange}: CardModalProps) {
    return(
        <div className= {styles.cardModalContainer}>
            <div className={styles.cardModalContent}>
                <h3>{skill.skillName}</h3>
                <Checkbox checked={skill.checked || false} onChange={onChange}  />
            </div>
        </div>
    );
};
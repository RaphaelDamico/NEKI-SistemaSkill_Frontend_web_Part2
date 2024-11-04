import { ButtonProps } from "../../interfaces";
import styles from "./styles.module.css";

export default function Button({content, onClick, backgroundColor = "none", type, width, height}: ButtonProps) {
    return(
        <div className={styles.buttonContainer}>
            <button type={type} onClick={onClick} className={styles.button} style={{background: backgroundColor, width: width, height: height}}>
                {content}
            </button>
        </div>
    );
};
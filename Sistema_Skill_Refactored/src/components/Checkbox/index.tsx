import { CheckboxProps } from "../../interfaces";
import styles from "./styles.module.css";

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, id }) => {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                id={id}
                style={{cursor: "pointer"}}
            />
            <label htmlFor={id} className={styles.checkboxLabel}>
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
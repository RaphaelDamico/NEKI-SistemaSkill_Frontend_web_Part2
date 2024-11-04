import { InputProps } from "../../interfaces";
import styles from "./styles.module.css";
import { useState } from "react";
import Icon from "../Icon";

const Input: React.FC<InputProps> = ({ label, type, value, onChange, placeholder, name, id, hasIcon }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
                type={showPassword ? "text" : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
                name={name}
                id={id}
            />
            {hasIcon &&
                <>
                    <Icon
                        name={showPassword ? "viewOpen" : "viewHide"}
                        className={styles.viewIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </>
            }
        </div>
    );
};

export default Input;

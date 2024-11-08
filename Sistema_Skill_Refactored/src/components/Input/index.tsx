import { InputProps } from "../../interfaces";
import { useState } from "react";
import { InputArea, InputContainer, InputLabel, ViewIcon } from "./styles";

const Input: React.FC<InputProps> = ({ label, type, value, onChange, placeholder, name, id, hasIcon }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <InputContainer>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <InputArea
                type={showPassword ? "text" : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id}
            />
            {hasIcon &&
                <>
                    <ViewIcon
                        name={showPassword ? "viewOpen" : "viewHide"}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </>
            }
        </InputContainer>
    );
};
export default Input;

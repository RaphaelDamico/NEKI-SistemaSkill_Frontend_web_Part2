import { CheckboxProps } from "../../interfaces";
import { CheckBoxContainer, CheckBoxLabel } from "./styles";

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, id }) => {
    return (
        <CheckBoxContainer>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                id={id}
                style={{ cursor: "pointer" }}
            />
            <CheckBoxLabel htmlFor={id}>
                {label}
            </CheckBoxLabel>
        </CheckBoxContainer>
    );
};
export default Checkbox;
import { ButtonProps } from "../../interfaces";
import { ButtonContainer, ButtonContent } from "./styles";

export default function Button({content, onClick, backgroundColor = "none", type, width, height}: ButtonProps) {
    return(
        <ButtonContainer>
            <ButtonContent type={type} onClick={onClick}  style={{background: backgroundColor, width: width, height: height}}>
                {content}
            </ButtonContent>
        </ButtonContainer>
    );
};
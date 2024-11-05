import { CardModalProps } from "../../interfaces";
import Checkbox from "../Checkbox";
import { CardModalContainer, CardModalContent } from "./styles";

export default function CardModal({skill, onChange}: CardModalProps) {
    return(
        <CardModalContainer>
            <CardModalContent>
                <h3>{skill.skillName}</h3>
                <Checkbox checked={skill.checked || false} onChange={onChange}  />
            </CardModalContent>
        </CardModalContainer>
    );
};
import { DeleteModalProps } from "../../interfaces";
import Button from "../Button";
import { DeleteButtonContainer, DeleteModalContainer, DeleteModalHeader, DeleteModalOverlay } from "./styles";

export default function DeleteModal({ isVisibleModal, onCancel, onDelete }: DeleteModalProps) {

    return (
        <>
            {isVisibleModal &&
                <>
                    <DeleteModalOverlay />
                    <DeleteModalContainer>
                        <DeleteModalHeader>
                            <h1>Deseja realmente deletar a Skill?</h1>
                        </DeleteModalHeader>
                        <DeleteButtonContainer>
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
                        </DeleteButtonContainer>
                    </DeleteModalContainer>
                </>
            }
        </>
    );
};
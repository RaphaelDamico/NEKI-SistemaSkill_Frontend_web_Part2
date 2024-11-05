import { useEffect, useState } from "react";
import Button from "../Button";
import CardModal from "../CardModal";
import { addSkillToUser, getAllSkills } from "../../api/api";
import { ModalProps, Skill, UserSkillRequest, Page } from "../../interfaces";
import { ButtonContainer, ModalContainer, ModalContent, ModalHeader, ModalOverlay, ArrowContainer, ArrowButton, PageCounter } from "./styles";
import Icon from "../Icon";

export default function Modal({ isVisibleModal, onCancel, onSave, userSkills }: ModalProps) {
    const [skillsPage, setSkillsPage] = useState<Page<Skill> | null>(null);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [sort] = useState("skillName,asc");

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const data = await getAllSkills(page, size, sort);
                const filteredSkills = data?.content?.filter(skill =>
                    !userSkills.some(userSkill => userSkill.skill.skillId === skill.skillId)
                ) || [];
                if (data) {
                    setSkillsPage({ ...data, content: filteredSkills });
                }
            } catch (error) {
                console.error("Erro ao buscar lista de habilidades:", error);
            }
        };
        getSkillsList();
    }, [userSkills, page, size, sort]);

    const handleChange = (skill: Skill) => {
        const updatedSkills = skillsPage?.content.map((item) => {
            if (item.skillId === skill.skillId) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        if (updatedSkills && skillsPage) {
            setSkillsPage({ ...skillsPage, content: updatedSkills });
        }
    };

    const handleSave = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userId") || '""');
            if (!userId) throw new Error("User ID não encontrado");

            await addSkillToUser(
                skillsPage?.content.filter((item) => item.checked === true)
                    .map((item) => ({ skillId: item.skillId, userId: userId })) as UserSkillRequest[] || []
            );
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isVisibleModal && (
                <>
                    <ModalOverlay />
                    <ModalContainer>
                        <ModalHeader>
                            <h1>Selecionar Skill</h1>
                        </ModalHeader>
                        <ModalContent>
                            {skillsPage?.content.map((skill) => (
                                <CardModal key={skill.skillId} skill={skill} onChange={() => handleChange(skill)} />
                            ))}
                        </ModalContent>
                        <ArrowContainer>
                            <ArrowButton
                                isHidden={page === 0}
                                onClick={() => {
                                    if (page > 0) setPage((prev) => prev - 1);
                                }}
                            >
                                <Icon name="arrowLeft" size={30} />
                            </ArrowButton>

                            <PageCounter>{page + 1}</PageCounter>

                            <ArrowButton
                                isHidden={!!skillsPage && page >= skillsPage.totalPages - 1}
                                onClick={() => {
                                    if (skillsPage && page < skillsPage.totalPages - 1) setPage((prev) => prev + 1);
                                }}
                            >
                                <Icon name="arrowRight" size={30} />
                            </ArrowButton>
                        </ArrowContainer>
                        <ButtonContainer>
                            <Button
                                content="Cancelar"
                                backgroundColor="#D9534F"
                                width={100}
                                height={50}
                                onClick={() => onCancel()}
                            />
                            <Button
                                content="Salvar"
                                backgroundColor="#356F7A"
                                width={100}
                                height={50}
                                onClick={() => handleSave()}
                            />
                        </ButtonContainer>
                    </ModalContainer>
                </>
            )}
        </>
    );
};

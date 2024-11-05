import { useEffect, useState } from "react";
import Button from "../Button";
import CardModal from "../CardModal";
import { addSkillToUser, getAllSkills } from "../../api/api";
import { ModalProps, Skill, UserSkillRequest, Page } from "../../interfaces";
import { ButtonContainer, ModalContainer, ModalContent, ModalHeader, ModalOverlay, ArrowContainer, ArrowButton, PageCounter } from "./styles";
import Icon from "../Icon";
import Input from "../Input";
import { useTheme } from "styled-components";

export default function Modal({ isVisibleModal, onCancel, onSave, userSkills }: ModalProps) {
    const [skillsPage, setSkillsPage] = useState<Page<Skill> | null>(null);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [sort] = useState("skillName,asc");
    const [ inputValue, setInputValue ] = useState<string>("");
    const [ filter, setFilter ] = useState<string>("");
    const [timer, setTimer] = useState<number | undefined>(undefined);

    const theme = useTheme();

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const data = await getAllSkills(page, size, sort, filter);
                if (data) {
                    setSkillsPage({ ...data });
                }
            } catch (error) {
                console.error("Erro ao buscar lista de habilidades:", error);
            }
        };
        getSkillsList();
    }, [userSkills, page, size, sort, filter]);

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

    function handleFilterChange(value: string) {
        setInputValue(value);
        if(timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            setFilter(value);
        }, 1000));
    }

    return (
        <>
            {isVisibleModal && (
                <>
                    <ModalOverlay />
                    <ModalContainer>
                        <ModalHeader>
                            <h1>Selecionar Skill</h1>
                            <Input label=""
                                type="text"
                                value={inputValue}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                placeholder="Pesquisar skills"
                                id="filter" />
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
                                backgroundColor={theme.RED}
                                width={100}
                                height={40}
                                onClick={() => onCancel()}
                            />
                            <Button
                                content="Salvar"
                                backgroundColor="#356F7A"
                                width={100}
                                height={40}
                                onClick={() => handleSave()}
                            />
                        </ButtonContainer>
                    </ModalContainer>
                </>
            )}
        </>
    );
};

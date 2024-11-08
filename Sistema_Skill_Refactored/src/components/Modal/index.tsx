import { useEffect, useState } from "react";
import Button from "../Button";
import CardModal from "../CardModal";
import { addSkillToUser, getAllSkills } from "../../api/api";
import { ModalProps, Skill, UserSkillRequest, Page } from "../../interfaces";
import { ButtonContainer, ModalContainer, ModalContent, ModalHeader, ModalOverlay } from "./styles";
import Input from "../Input";
import { useTheme } from "styled-components";
import Pagination from "../Pagination";

export default function Modal({ isVisibleModal, onCancel, onSave, userSkills }: ModalProps) {
    const [skillsPage, setSkillsPage] = useState<Page<Skill> | null>(null);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [sort] = useState("skillName,asc");
    const [inputValue, setInputValue] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [timer, setTimer] = useState<number | undefined>(undefined);

    const theme = useTheme();

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const data = await getAllSkills(page, size, sort, filter);
                const filteredSkills = (data?.content ?? []).filter(skill =>
                    !userSkills.some(userSkill => userSkill.skill.skillId === skill.skillId)
                );
                const updatedSkills = filteredSkills.map(skill => ({
                    ...skill,
                    checked: selectedSkills.some(s => s.skillId === skill.skillId),
                }));
                setSkillsPage({
                    content: updatedSkills,
                    size: data?.size ?? 0,
                    totalElements: data?.totalElements ?? 0,
                    totalPages: data?.totalPages ?? 0,
                    number: data?.number ?? 0,
                });
            } catch (error) {
                console.error("Erro ao buscar lista de habilidades:", error);
            }
        };
        getSkillsList();
    }, [userSkills, page, size, sort, filter, selectedSkills]);

    const handleChange = (skill: Skill) => {
        setSelectedSkills((prevSelected) => {
            if (prevSelected.some((s) => s.skillId === skill.skillId)) {
                return prevSelected.filter((s) => s.skillId !== skill.skillId);
            } else {
                return [...prevSelected, skill];
            }
        });

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

    function handleFilterChange(value: string) {
        setInputValue(value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            setFilter(value);
        }, 1000));
    };

    const handleSave = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userId") || '""');
            if (!userId) throw new Error("User ID não encontrado");

            await addSkillToUser(
                selectedSkills.map((skill) => ({ skillId: skill.skillId, userId: userId })) as UserSkillRequest[]
            );
            setSelectedSkills([]);
            onSave();
            setInputValue("");
            setFilter("");
            setPage(0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setSelectedSkills([]);
        onCancel();
        setInputValue("");
        setFilter("");
        setPage(0);
    };

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
                                placeholder="Filtrar Skills"
                                id="filter"
                            />
                        </ModalHeader>
                        <ModalContent>
                            {skillsPage?.content && skillsPage.content.length > 0 ? (
                                skillsPage.content.map((skill) => (
                                    <CardModal key={skill.skillId} skill={skill} onChange={() => handleChange(skill)} />
                                ))
                            ) : (
                                <p>Nenhuma skill disponível para adicionar.</p>
                            )}
                        </ModalContent>
                        {skillsPage?.content && skillsPage.content.length > 0 ? (
                            <Pagination
                            page={page}
                            handlePageChange={setPage}
                            totalPages={skillsPage?.totalPages || 0}
                        />
                        ) : <></>}
                        <ButtonContainer>
                            <Button
                                content="Cancelar"
                                backgroundColor={theme.RED}
                                width={100}
                                height={40}
                                onClick={() => handleCancel()}
                            />
                            <Button
                                content="Salvar"
                                backgroundColor={selectedSkills.length === 0 ? theme.GREY : theme.BLUE_700}
                                width={100}
                                height={40}
                                onClick={() => handleSave()}
                                disabled={selectedSkills.length === 0}
                            />
                        </ButtonContainer>
                    </ModalContainer>
                </>
            )}
        </>
    );
};

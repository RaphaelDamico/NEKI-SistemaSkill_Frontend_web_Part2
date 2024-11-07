import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { deleteUserSkill, getUserSkills } from "../../api/api";
import { Page, UserSkill } from "../../interfaces";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { Container, InputContainer, InputContent } from "./styles";
import Pagination from "../../components/Pagination";
import EmptyListCard from "../../components/EmptyListCard";
import Input from "../../components/Input";

export default function HomePage() {
    const [userSkillList, setUserSkillList] = useState<Page<UserSkill> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [filter, setFilter] = useState<string>("");
    const [timer, setTimer] = useState<number | undefined>(undefined);
    const [page, setPage] = useState(0);
    const [size] = useState(3);
    const [sort] = useState("skill.skillName,asc");

    useEffect(() => {
        getUserSkillsList();
    }, [page, size, sort, filter]);

    const getUserSkillsList = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userId") || '""');
            if (!userId) {
                throw new Error("User ID não encontrado");
            }
            const data = await getUserSkills(page, size, sort, filter);
            if (data) {
                setUserSkillList({ ...data });
            } else {
                setUserSkillList(null);
                console.error("Falha ao buscar skills do usuário: os dados estão nulos.");
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveSkills = async () => {
        await getUserSkillsList();
        handleCloseModal();
        toast.success("Skill adicionada à lista do usuário")
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenDeleteModal = (userSkillId: string) => {
        setSkillToDelete(userSkillId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSkillToDelete(null);
    };

    const handleDeleteUserSkill = async (userSkillId: string) => {
        try {
            await deleteUserSkill(userSkillId);
            if (userSkillList?.content.length === 1 && page > 0) {
                setPage(page - 1);
            } else {
                await getUserSkillsList();
            }
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmDelete = async () => {
        if (skillToDelete !== null) {
            await handleDeleteUserSkill(skillToDelete);
            handleCloseModal();
            toast.success("Skill deletada da lista do usuáro")
        }
    };

    function handleFilterChange(value: string) {
        setInputValue(value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(() => {
            setFilter(value);
            setPage(0);
        }, 1000));
    };

    const isSkillListEmpty = !userSkillList?.content || userSkillList.content.length === 0;

    return (
        <Container>
            <Header setIsModalOpen={setIsModalOpen} />
            <InputContainer>
                <InputContent>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        placeholder="Pesquisar skills"
                        id="filter"
                    />
                </InputContent>
            </InputContainer>
            {isSkillListEmpty ? (
                filter ? (
                    <EmptyListCard
                        title="Nenhum resultado encontrado"
                        text="Tente alterar o termo de pesquisa ou adicionar novas skills ao seu perfil."
                    />
                ) : (
                    <EmptyListCard
                        title="Sua lista de skills está vazia!"
                        text="Que tal explorar novas competências e adicionar skills incríveis para impulsionar seu perfil?"
                    />
                )
            ) : (
                userSkillList?.content.map((skill) => (
                    <Card
                        key={skill.userSkillId}
                        userSkill={skill}
                        deleteSkill={handleOpenDeleteModal}
                        refreshSkills={getUserSkillsList}
                    />
                ))
            )}
            {userSkillList?.content && userSkillList?.content.length > 0 &&
                (<Pagination
                    page={page}
                    handlePageChange={setPage}
                    totalPages={userSkillList?.totalPages}
                />)}
            <Modal
                isVisibleModal={isModalOpen}
                onCancel={handleCloseModal}
                onSave={handleSaveSkills}
                userSkills={userSkillList?.content || []}
            />
            <DeleteModal
                isVisibleModal={isDeleteModalOpen}
                onCancel={handleCloseDeleteModal}
                onDelete={handleConfirmDelete}
            />
        </Container>
    );
};
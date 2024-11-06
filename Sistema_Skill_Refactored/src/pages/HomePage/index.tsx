import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { deleteUserSkill, getUserSkills } from "../../api/api";
import { Page, UserSkill } from "../../interfaces";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { Container } from "./styles";
import Pagination from "../../components/Pagination";
import EmptyListCard from "../../components/EmptyListCard";

export default function HomePage() {
    const [userSkillList, setUserSkillList] = useState<Page<UserSkill> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [size] = useState(3);
    const [sort] = useState("skill.skillName,asc");

    useEffect(() => {
        getUserSkillsList();
    }, [page, size, sort]);

    const getUserSkillsList = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("userId") || '""');
            if (!userId) {
                throw new Error("User ID não encontrado");
            }
            const data = await getUserSkills(page, size, sort);
            if (data) {
                console.log(data);
                setUserSkillList({ ...data });
            } else {
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
            await getUserSkillsList();
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

    return (
        <Container>
            <Header setIsModalOpen={setIsModalOpen} />
            {userSkillList?.content.map((skill) => (
                <Card
                    key={skill.userSkillId}
                    userSkill={skill} deleteSkill={handleOpenDeleteModal}
                    refreshSkills={getUserSkillsList}
                />
            ))}
            {userSkillList?.content && userSkillList?.content.length > 0 ?
                (<Pagination
                    page={page}
                    handlePageChange={setPage}
                    totalPages={userSkillList?.totalPages}
                />) : (
                    <EmptyListCard />
                )}
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
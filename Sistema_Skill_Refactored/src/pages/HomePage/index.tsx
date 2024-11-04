import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "./styles.module.css";
import { deleteUserSkill, getUserSkills } from "../../api/api";
import { UserSkill } from "../../interfaces";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import Header from "../../components/Header";
import { toast } from "react-toastify";

export default function HomePage() {
    const [userSkillList, setUserSkillList] = useState<UserSkill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [skillToDelete, setSkillToDelete] = useState<number | null>(null);

    useEffect(() => {
        getUserSkillsList();
    }, []);

    const getUserSkillsList = async () => {
        try {
            const userIdString = localStorage.getItem("userId");
            const userId = userIdString ? parseInt(userIdString, 10) : null;
            if (!userId) {
                throw new Error("User ID não encontrado");
            }
            const data = await getUserSkills(userId);
            if (data) {
                setUserSkillList(data.userSkills);
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

    const handleOpenDeleteModal = (userSkillId: number) => {
        setSkillToDelete(userSkillId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSkillToDelete(null);
    };

    const handleDeleteUserSkill = async (userSkillId: number) => {
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
        <div className={styles.container}>
            <Header setIsModalOpen={setIsModalOpen} />
            {userSkillList.map((skill) => (
                <Card
                    key={skill.userSkillId}
                    userSkill={skill} deleteSkill ={handleOpenDeleteModal}
                    refreshSkills={getUserSkillsList}
                />
            ))}
            <Modal
                isVisibleModal={isModalOpen}
                onCancel={handleCloseModal}
                onSave={handleSaveSkills}
                userSkills={userSkillList}
            />
            <DeleteModal
                isVisibleModal={isDeleteModalOpen}
                onCancel={handleCloseDeleteModal}
                onDelete={handleConfirmDelete}
            />
        </div>
    );
};
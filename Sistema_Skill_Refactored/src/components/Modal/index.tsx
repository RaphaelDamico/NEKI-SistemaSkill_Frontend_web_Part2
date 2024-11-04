import { useEffect, useState } from "react";
import Button from "../Button";
import CardModal from "../CardModal";
import styles from "./styles.module.css"
import { addSkillToUser, getAllSkills } from "../../api/api";
import { ModalProps, Skill, UserSkillRequest } from "../../interfaces";

export default function Modal({ isVisibleModal, onCancel, onSave, userSkills }: ModalProps) {
    const [skillsList, setSkillsList] = useState<Skill[] | null>();

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const data = await getAllSkills();
                const filteredSkills = data?.filter(skill =>
                    !userSkills.some(userSkill => userSkill.skill.skillId === skill.skillId)
                );
                setSkillsList(filteredSkills);
            } catch (error) {
                console.error();
            }
        };
        getSkillsList();
    }, [userSkills]);

    const handleChange = (skill: Skill) => {
        const teste = skillsList?.map((item) => {
            if (item.skillId === skill.skillId) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return item;
        });
        setSkillsList(teste || []);
    };

    const handleSave = async () => {
        try {
            const userIdString = localStorage.getItem("userId");
            const userId = userIdString ? parseInt(userIdString, 10) : null;
            if (!userId)
                throw new Error("User ID não encontrado");
            await addSkillToUser(skillsList?.filter((item) => {
                return item.checked === true;
            }).map((item) => ({
                skillId: item.skillId,
                userId: userId
            }) as UserSkillRequest)|| [] );
            onSave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isVisibleModal &&
                <>
                    <div className={styles.modalOverlay} />
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h1>Selecionar Skill</h1>
                        </div>
                        <div className={styles.modalContent}>
                            {skillsList?.map((skill) => (
                                <CardModal key={skill.skillId} skill={skill} onChange={() => handleChange(skill)} />
                            ))}
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                content={"Cancelar"}
                                backgroundColor="#D9534F"
                                width={100}
                                onClick={() => onCancel()}
                            />
                            <Button
                                content={"Salvar"}
                                backgroundColor="#356F7A"
                                width={100}
                                onClick={() => handleSave()}
                            />
                        </div>
                    </div>
                </>
            }
        </>
    );
};
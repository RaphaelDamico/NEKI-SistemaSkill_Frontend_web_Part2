import { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./styles.module.css";
import { CardProps } from "../../interfaces";
import { updateUserSkillLevel } from "../../api/api";
import StarRating from "../StarRating";
import { toast } from "react-toastify";

export default function Card({ userSkill, deleteSkill, refreshSkills }: CardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [level, setLevel] = useState(userSkill.level);

    const handleRatingChange = (newRating: number) => {
        setLevel(newRating);
    };

    const handleSave = async () => {
        if (level !== undefined) {
            await updateUserSkillLevel({ userSkillId: userSkill.userSkillId, level });
            setIsEditing(false);
            refreshSkills();
            toast.success("Level da skill atualizado")
        }
    };

    return (
        <div className={styles.cardContainer}>
            <div className={styles.buttonContainer}>
                <Button
                    content={
                        <Icon name={"edit"}
                            color="#356F7A"
                        />
                    }
                    onClick={() => setIsEditing(!isEditing)}
                />
                <Button
                    content={
                        <Icon name={"trash"}
                            color="red"
                        />
                    }
                    onClick={() => deleteSkill(userSkill.userSkillId)}
                />
            </div>
            <div className={styles.cardContent}>
                <img src={userSkill.skill.image} alt="Logo da skill" width={150} height={150} />
                <div className={styles.infoContent}>
                    <h1> {userSkill.skill.skillName}</h1>
                    <StarRating rating={level || 1} onRatingChange={handleRatingChange} isEditing={isEditing} onSave={handleSave} />
                    <span> {userSkill.skill.description}</span>
                </div>
            </div>
        </div>
    );
};
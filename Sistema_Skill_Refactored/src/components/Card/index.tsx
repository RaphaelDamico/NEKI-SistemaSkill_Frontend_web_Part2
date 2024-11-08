import { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { CardProps } from "../../interfaces";
import { updateUserSkillLevel } from "../../api/api";
import StarRating from "../StarRating";
import { toast } from "react-toastify";
import { CardContainer, CardContent, IconButtonContainer, InfoContent } from "./styles";
import { useTheme } from "styled-components";

export default function Card({ userSkill, deleteSkill, refreshSkills }: CardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [level, setLevel] = useState(userSkill.level);

    const theme = useTheme();

    const handleRatingChange = (newRating: number) => {
        setLevel(newRating);
    };
    const handleSave = async () => {
        try {
            if (level !== undefined) {
                await updateUserSkillLevel({ userSkillId: userSkill.userSkillId, level });
                setIsEditing(false);
                refreshSkills();
                toast.success("Level da skill atualizado")
            }
        } catch (error) {
            toast.error("Erro ao tentar atualizar o level da skill")
        }
    };

    return (
        <CardContainer>
            <CardContent>
                <img src={userSkill.skill.image} alt="Logo da skill" width={150} height={150} />
                <InfoContent>
                    <h1> {userSkill.skill.skillName}</h1>
                    <StarRating rating={level || 1} onRatingChange={handleRatingChange} isEditing={isEditing} onSave={handleSave} />
                    <span> {userSkill.skill.description}</span>
                </InfoContent>
            </CardContent>
            <IconButtonContainer>
                <Button
                    content={
                        <Icon name={"edit"}
                            size={20}
                            color={theme.BLUE_700}
                        />
                    }
                    onClick={() => setIsEditing(!isEditing)}
                />
                <Button
                    content={
                        <Icon name={"trash"}
                            size={20}
                            color={theme.RED}
                        />
                    }
                    onClick={() => deleteSkill(userSkill.userSkillId)}
                />
            </IconButtonContainer>
        </CardContainer>
    );
};
import { useState } from "react";
import Button from "../Button";
import { StarRatingProps } from "../../interfaces";
import { Star, StarRatingContainer } from "./styles";
import { useTheme } from "styled-components";

export default function StarRating({ rating, onRatingChange, isEditing, onSave }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);
    const [tempRating, setTempRating] = useState(rating);

    const theme = useTheme();

    const handleMouseEnter = (index: number) => {
        if (isEditing) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (isEditing) {
            setHoverRating(0);
        }
    };

    const handleClick = (index: number) => {
        if (isEditing) {
            setTempRating(index);
            onRatingChange(index);
        }
    };

    return (
        <StarRatingContainer>
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
                <Star
                    key={star}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                    isFilled={(hoverRating || tempRating) >= star}
                    theme={theme}
                    isEditing={isEditing}
                >
                    ★
                </Star>
            ))}
            {isEditing && (
                <Button
                    content={"Salvar"}
                    onClick={onSave}
                    backgroundColor={theme.BLUE_700}
                    width={70}
                />
            )}
        </StarRatingContainer>
    );
};

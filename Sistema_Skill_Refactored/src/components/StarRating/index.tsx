import { useState } from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import { StarRatingProps } from "../../interfaces";

export default function StarRating({ rating, onRatingChange, isEditing, onSave }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);
    const [tempRating, setTempRating] = useState(rating);

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
        <div className={styles.starRatingContainer}>
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
                <span
                    key={star}
                    className={styles.star}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(star)}
                    style={{
                        color: (hoverRating || tempRating) >= star ? "#FFD700" : "#ccc",
                        cursor: isEditing ? "pointer" : "default"
                    }}
                >
                    ★
                </span>
            ))}
            {isEditing && (
                <Button
                    content={"Salvar"}
                    onClick={onSave}
                    backgroundColor="#356F7A"
                    width={70}
                />
            )}
        </div>
    );
};

import { styled } from "styled-components";

export const StarRatingContainer = styled.div`
    display: flex;
`;

export const Star = styled.span<{ isFilled: boolean; isEditing: boolean }>`
    font-size: 1.875rem;
    margin-right: .375rem;
    color: ${({ isFilled, theme }) => (isFilled ? theme.YELLOW : theme.GRAY)};
    cursor: ${({ isEditing }) => (isEditing ? "pointer" : "default")};
`;
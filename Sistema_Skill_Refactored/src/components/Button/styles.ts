import { styled } from "styled-components"

export const ButtonContainer = styled.div`
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonContent = styled.button`
    width: 80%;
    height: 80%;
    border: none;
    border-radius: 3.125rem;
    color: ${(props) => props.theme["WHITE"]};
    font-size: 1.125rem;
    font-weight: 500;
    transition: transform 0.3s ease-in-out;
    align-items: center;
    justify-content: center;

    &:hover {
    cursor: pointer;
    transform: scale(1.05);
}
`;

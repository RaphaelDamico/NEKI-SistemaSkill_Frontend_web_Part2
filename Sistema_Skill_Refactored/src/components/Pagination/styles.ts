import { styled } from "styled-components";

export const ArrowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    width: 100%;
    margin: .5rem 0;
    position: relative;
`;

export const ArrowButton = styled.div<{ isDisabled?: boolean }>`
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    color: ${({ isDisabled }) => (isDisabled && "#d9d9d9")};;
    &:hover {
        transform: ${({ isDisabled }) => (!isDisabled && "scale(1.2)")};
        cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
    }
`;

export const PageCounter = styled.span`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    color: ${(props) => props.theme.BLUE_700}
`;
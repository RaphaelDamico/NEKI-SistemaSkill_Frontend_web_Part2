import { styled } from "styled-components";

export const CardModalContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const CardModalContent = styled.div`
    width: 80%;
    background-color: ${(props) => props.theme.BLUE_700};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: .5rem;
    box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.25);
    padding: 5px;

    h3 {
        color: ${(props) => props.theme.WHITE};
    }
`;
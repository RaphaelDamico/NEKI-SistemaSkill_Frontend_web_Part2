import { styled } from "styled-components";

export const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) => props.theme['WHITE']};
    padding: .5rem 1.25rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    width: 27rem;
    max-width: 90%;
    height: 30rem;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    z-index: 999;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.GREY};


    h1 {
        color: ${(props) => props.theme['BLUE_700']};
    }
`;

export const ModalHeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.25rem 0;
    overflow: auto;
    position: relative;
    height: 16.25rem;
    gap: .375rem;

    p {
        color: ${(props) => props.theme.BLUE_700};
        font-size: 1.75rem;
        text-align: center;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
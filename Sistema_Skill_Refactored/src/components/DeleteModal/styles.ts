import { styled } from "styled-components";

export const DeleteModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:${(props) => props.theme.WHITE};
    padding: .5rem 1.25rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    width: 25rem;
    max-width: 90%;
    max-height: 55%;
`;

export const DeleteModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    z-index: 999;
`;

export const DeleteModalHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: .625rem;
    margin-bottom: 1.25rem;

    h1 {
        color: ${(props) => props.theme.BLUE_700};
        text-align: center;
    }
`;

export const DeleteModalContent = styled.div`
    padding: 1.25rem 0;
    overflow: auto;
    position: relative;
    max-height: 15.625rem;
    display: flex;
    flex-direction: column;
    gap: .3125rem;
`;

export const DeleteButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
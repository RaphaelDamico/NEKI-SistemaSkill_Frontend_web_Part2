import { styled } from "styled-components";

export const CardContainer = styled.div`
    background-color: ${(props) => props.theme["WHITE"]};
    padding: 1.25rem;
    border-radius: 1rem;
    box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
`;

export const IconButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

export const CardContent = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;

    img {
        border-radius: 50%;
        box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.25);
    }
`;

export const InfoContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    word-wrap: break-word;
    flex-direction: column;
    gap: .5rem;

    h1 {
        color: ${(props) => props.theme["BLUE_700"]};
    }

    span {
        font-family: sans-serif;
        font-weight: 500;
        margin-bottom: .625rem;
    }
`;
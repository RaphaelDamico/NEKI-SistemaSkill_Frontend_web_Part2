import { styled } from "styled-components";
import BackgroundImage from "../../assets/images/background.png";

export const BodyContainer = styled.main`
    background-image: url(${BackgroundImage});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
`;

export const BodyContent = styled.div`
    margin: auto;
    max-width: 90rem;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media(max-width: 760px) {
        flex-direction: column;
        justify-content: center;
        gap: 6.25rem;
    }
`;

export const TextContainer = styled.section`
    width: 21.875rem;
    height: 9.375rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.h1`
    font-style: italic;
    font-weight: 500;
    font-size: 3.125rem;
    color: ${(props) => props.theme.WHITE};
`;

export const SubTitle = styled.h2`
    font-weight: normal;
    font-size: 1.5625rem;
    color: ${(props) => props.theme.WHITE};
`;
import { styled } from "styled-components";

export const EmptyListCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    background-color: ${(props) => props.theme["WHITE"]};
    padding: 1.875rem 2.5rem;
    border-radius: 1rem;
    box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.25);
    height: 18.75rem;
    margin-top: 6.25rem;

    h1 {
        font-size: 2.5rem;
    }

    p {
        font-size: 1.625rem;
    }
`;

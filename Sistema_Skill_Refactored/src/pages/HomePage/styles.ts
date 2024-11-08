import styled from 'styled-components'

export const Container = styled.main`
    max-width: 50rem;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    @media (min-width: 1600px) {
        max-width: 62.5rem;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 100%;
`;

export const InputContent = styled.div`
    width: 13.75rem;
    margin-right: -10px;
`;

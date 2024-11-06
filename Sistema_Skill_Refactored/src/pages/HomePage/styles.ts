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
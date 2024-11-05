import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    gap: 1.875rem;

    h1 {
        color: ${(props) => props.theme['BLUE_700']};
    }
`
export const WellcomeAndLogoutContent = styled.section`
    display: flex;
    align-items: center;
    gap: 1.25rem;
`

export const ListSkillsAndAddButtonContent = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
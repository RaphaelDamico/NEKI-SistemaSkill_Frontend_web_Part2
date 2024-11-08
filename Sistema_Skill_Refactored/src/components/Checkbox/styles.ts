import { styled } from "styled-components";

export const CheckBoxContainer = styled.div`
    padding: 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.1875rem;
    margin-left: .5rem;
`;

export const CheckBoxLabel = styled.label`
    font-size: .75rem;
    font-weight: 500;
    color: ${(props) => props.theme.BLUE_700};
`;

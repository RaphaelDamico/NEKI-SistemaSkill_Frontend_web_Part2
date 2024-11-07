import { styled } from "styled-components";
import Icon from "../Icon";

export const FormContainer = styled.section`
    background-color: ${(props) => props.theme.WHITE};
    width: 18.75rem;
    min-height: 18.75rem;
    border-radius: 1rem;
    display: flex;
    padding: 8px 0;
`;

export const FormContent = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ErrorContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-inline-start: 1.25rem;
`;

export const ErrorSpan = styled.span`
    font-weight: 500;
    font-size: .75rem;
    color: ${(props) => props.theme.RED};
`;

export const LoadingIcon = styled(Icon)`
    animation: spin 1s linear infinite;

    @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`;



import { styled } from "styled-components";
import Icon from "../Icon";

export const InputContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
export const InputLabel = styled.label`
    font-weight: 500;
    color: ${(props) => props.theme.BLUE_700};
    margin-left: .9375rem;
`;

export const InputArea = styled.input`
    width: 90%;
    align-self: center;
    border-radius: 3.125rem;
    border: none;
    padding: .5rem;
    background-color: ${(props) => props.theme.GREY};
`;

export const ViewIcon = styled(Icon)`
    position: relative;
    left: 85%;
    bottom: 35%;

    &:hover {
        cursor: pointer;
    }
`;
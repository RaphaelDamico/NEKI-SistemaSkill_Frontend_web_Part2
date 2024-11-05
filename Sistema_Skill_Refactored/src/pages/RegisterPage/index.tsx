import RegisterForm from "../../components/RegisterForm";
import { BodyContainer, BodyContent, SubTitle, TextContainer, Title } from "./styles";

export default function RegisterPage() {

    return (
      <BodyContainer>
        <BodyContent>
          <TextContainer>
            <Title>System Skills</Title>
            <SubTitle>Gerencie e desenvolva suas habilidades profissionais.</SubTitle>
          </TextContainer>
          <RegisterForm />
        </BodyContent>
      </BodyContainer>
    )
  };
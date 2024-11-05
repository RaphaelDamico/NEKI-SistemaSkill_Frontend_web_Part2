import LoginForm from "../../components/LoginForm";
import { BodyContainer, BodyContent, SubTitle, TextContainer, Title } from "./Styles";

export default function LoginPage() {

  return (
    <BodyContainer>
      <BodyContent>
        <TextContainer>
          <Title>System Skills</Title>
          <SubTitle>Gerencie e desenvolva suas habilidades profissionais.</SubTitle>
        </TextContainer>
        <LoginForm />
      </BodyContent>
    </BodyContainer>
  )
};


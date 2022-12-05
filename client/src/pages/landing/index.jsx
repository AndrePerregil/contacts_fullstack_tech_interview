import { useNavigate } from "react-router-dom";

import { Container } from "../../components/container";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { PageContainer } from "../../components/pageContainer";
import { Title } from "../../components/title";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageContainer>
        <Header>
          <h1>
            @<span>c</span>onta<span>cts_</span>TI
          </h1>
        </Header>
        <Main>
          <Container>
            <Title color="#f70776">Welcome to @Contacts_TI</Title>
            <p> (TI stands for tech interview)</p>
            <Title color="#01FF70">Manage your contacts!!!</Title>
            <p>(even though everyone has smartphone...)</p>
          </Container>
          <Container direction="row">
            <Button
              color="#2ECC40"
              colorHover="#01FF70"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              color="#c3195d"
              colorHover="#f70776"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Container>
        </Main>
      </PageContainer>
    </>
  );
};
export default Landing;

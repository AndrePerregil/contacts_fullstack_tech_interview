import { useNavigate } from "react-router-dom";

import { Container } from "../../components/container";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { PageContainer } from "../../components/pageContainer";
import { Title } from "../../components/title";
import { ButtonsContainer } from "../../components/buttonsContainer";

const Dashboard = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear("@contact_ti:token", "@contact_ti:username");
    navigate("/");
  };

  const token = localStorage.getItem("@contact_ti:token");
  const username = localStorage.getItem("@contact_ti:username");
  if (!token || !username) {
    logOut();
  }
  return (
    <PageContainer>
      <Header>
        <h1>
          @<span>c</span>onta<span>ct</span>s_TI
        </h1>
        <Button color="#c3195d" colorHover="#f70776" onClick={() => logOut()}>
          Logout
        </Button>
      </Header>
      <Main>
        <Container direction="row" gap="20px">
          <Title interval="1s" color="#f70776">
            Welcome
          </Title>
          <Title interval="1.5s" color="#01FF70">
            {username}
          </Title>
        </Container>
        <ButtonsContainer gap="10px">
          <Button
            color="#2ECC40"
            colorHover="#01FF70"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
          <Button
            color="#c3195d"
            colorHover="#f70776"
            onClick={() => navigate("/contacts")}
          >
            Contacts
          </Button>
        </ButtonsContainer>
      </Main>
    </PageContainer>
  );
};

export default Dashboard;

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";

import { Container } from "../../components/container";
import { OverflowContainer } from "../../components/overflowContainer";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { PageContainer } from "../../components/pageContainer";
import { Title } from "../../components/title";
import { FormField } from "../../components/formField";
import { ButtonsContainer } from "../../components/buttonsContainer";

import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";

import { API } from "../../services/API";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [phones, setPhones] = useState([""]);
  const [emails, setEmails] = useState([""]);
  const [newPhones, setNewPhones] = useState({});
  const [newEmails, setNewEmails] = useState({});

  const addField = (setter, state) => {
    setter([...state, "1234567890"]);
  };

  const subField = (setter, state) => {
    if (state.length > 1) {
      const copy = state.slice(0, -1);
      setter(copy);
    }
  };

  const logout = () => {
    localStorage.clear("@contact_ti:token", "@contact_ti:username");
    navigate("/");
  };

  const token = localStorage.getItem("@contact_ti:token");
  const username = localStorage.getItem("@contact_ti:username");
  useEffect(() => {
    if (!token || !username) {
      navigate("/");
    }
  });

  useEffect(() => {
    API.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.data.data.phones.length > 0) {
        setPhones(res.data.data.phones);
      }
      if (res.data.data.emails.length > 0) {
        setEmails(res.data.data.emails);
      }
    });
  }, [token]);

  const handleChangePhones = (state, setter, field, value) => {
    let data = { [field]: value };
    setter({ ...state, ...data });
  };

  const submitData = () => {
    const data = {
      phones: Object.values(newPhones),
      emails: Object.values(newEmails),
    };

    API.post("/users/profile", data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      navigate("/contacts");
    });
  };

  return (
    <PageContainer>
      <Header>
        <h1>
          @<span>c</span>onta<span>ct</span>s_TI
        </h1>
        <Button color="#c3195d" colorHover="#f70776" onClick={() => logout}>
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
        <OverflowContainer direction="column">
          {phones.map((phone, index) => (
            <Container direction="column" key={phone + index}>
              <FormField
                label="Phone number"
                type="text"
                value={phone.content || "1234567890"}
                Svg={MdPhone}
                key={index + phone}
                field={index}
                setter={setNewPhones}
                state={newPhones}
                onChangeCb={handleChangePhones}
              />
            </Container>
          ))}
          <ButtonsContainer gap="10px">
            <Button
              color="#2ECC40"
              colorHover="#01FF70"
              onClick={() => addField(setPhones, phones)}
            >
              Add
            </Button>
            <Button
              color="#c3195d"
              colorHover="#f70776"
              onClick={() => subField(setPhones, phones)}
            >
              Remove
            </Button>
          </ButtonsContainer>
          {emails.map((email, index) => (
            <Container direction="row" key={email + index}>
              <FormField
                label="Email"
                type="email"
                value={email.content || "email@domain.com"}
                Svg={MdEmail}
                key={index + email}
                field={index}
                setter={setNewEmails}
                state={newEmails}
                onChangeCb={handleChangePhones}
              />
            </Container>
          ))}
          <ButtonsContainer gap="10px">
            <Button
              color="#2ECC40"
              colorHover="#01FF70"
              onClick={() => addField(setEmails, emails)}
            >
              Add
            </Button>
            <Button
              color="#c3195d"
              colorHover="#f70776"
              onClick={() => subField(setEmails, emails)}
            >
              Remove
            </Button>
          </ButtonsContainer>
        </OverflowContainer>
        <Button
          color="#2ECC40"
          colorHover="#01FF70"
          onClick={() => {
            submitData();
          }}
        >
          Submit
        </Button>
        <Container>
          <p>Don't want to do that now?</p>
          <p>
            Go to contacts <Link to={"/contacts"}>here</Link>
          </p>
        </Container>
      </Main>
    </PageContainer>
  );
};

export default Profile;

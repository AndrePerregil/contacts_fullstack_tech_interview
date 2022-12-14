import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/container";
import { ReactiveContainer } from "../../components/overflowContainer";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { PageContainer } from "../../components/pageContainer";
import { Title } from "../../components/title";
import { FormFieldOnChange } from "../../components/formField";
import { ButtonsContainer } from "../../components/buttonsContainer";

import { MdEmail, MdPhone, MdPassword, MdAccountCircle } from "react-icons/md";

import { API } from "../../services/API";
import { addField, subField } from "../../services/helpers";

const Profile = () => {
  const navigate = useNavigate();

  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [newPhones, setNewPhones] = useState({});
  const [newEmails, setNewEmails] = useState({});
  const [emailFields, setEmailFields] = useState([]);
  const [phoneFields, setPhoneFields] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const logOut = () => {
    localStorage.clear("@contact_ti:token", "@contact_ti:username");
    navigate("/");
  };

  const token = localStorage.getItem("@contact_ti:token");
  const username = localStorage.getItem("@contact_ti:username");
  if (!token || !username) {
    logOut();
  }

  useEffect(() => {
    API.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const userPhones = [];
        const userEmails = [];
        if (res.data.data.phones.length > 0) {
          const phoneArray = res.data.data.phones;
          phoneArray.forEach((phone) => {
            userPhones.push(phone.content);
          });
          setPhones(userPhones);
        }
        if (res.data.data.emails.length > 0) {
          const emailArray = res.data.data.emails;
          emailArray.forEach((email) => {
            userEmails.push(email.content);
          });
          setEmails(userEmails);
        }
      })
      .catch((error) => {
        logOut();
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeData = (state, setter, field, value) => {
    setter({ ...state, [field]: value.toString() });
  };

  const singleFieldChangeData = (state, setter, field, value) => {
    setter(value);
  };

  const replaceData = () => {
    const data = {
      username: newUsername,
      password: newPassword,
      phones: Object.values(newPhones),
      emails: Object.values(newEmails),
    };

    API.post("/users/profile", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        localStorage.setItem("@contact_ti:username", data.username);
        navigate("/dashboard");
      })
      .catch((error) => navigate("/landing"));
  };

  const addToExistingData = () => {
    const newPhonesArray = Object.values(newPhones);
    const newEmailsArray = Object.values(newEmails);

    const updatedPhones = newPhonesArray.concat(phones);
    const updatedEmails = newEmailsArray.concat(emails);

    const data = {
      phones: updatedPhones,
      emails: updatedEmails,
    };

    API.post("/users/profile", data, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      navigate("/dashboard");
    });
  };

  return (
    <PageContainer>
      <Header>
        <h1>
          @<span>c</span>onta<span>ct</span>s_TI
        </h1>
        <Button
          color="#c3195d"
          colorHover="#f70776"
          onClick={() => navigate("/")}
        >
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
        <Container>
          <h3>Your current info:</h3>
          {phones.length > 0 ? <p>Phone number(s):</p> : <p>No phones yet</p>}
          <ul>
            {phones.map((phone, index) => (
              <li key={index + "currentPhone"}>{phone}</li>
            ))}
          </ul>
          {emails.length > 0 ? <p>E-mail(s):</p> : <p>No emails yet</p>}
          <ul>
            {emails.map((email, index) => (
              <li key={index + "currentEmail"}>{email}</li>
            ))}
          </ul>
          <FormFieldOnChange
            label="Username"
            type="text"
            placeholder="name here"
            Svg={MdAccountCircle}
            setter={setNewUsername}
            state={newUsername}
            onChangeCb={singleFieldChangeData}
            message="Letters only, 15 chars max"
          />
          <FormFieldOnChange
            label="Password"
            type="password"
            Svg={MdPassword}
            setter={setNewPassword}
            state={newPassword}
            onChangeCb={singleFieldChangeData}
            message="(Upper+lower+integer+symbol)"
          />
        </Container>
        <ReactiveContainer>
          <Container>
            <ButtonsContainer gap="10px">
              <Button
                color="#2ECC40"
                colorHover="#01FF70"
                onClick={() => addField(setPhoneFields, phoneFields)}
              >
                Add field
              </Button>
              <Button
                color="#c3195d"
                colorHover="#f70776"
                onClick={() => subField(setPhoneFields, phoneFields)}
              >
                Sub field
              </Button>
            </ButtonsContainer>
            <FormFieldOnChange
              label="Phone number"
              type="text"
              placeholder={"1234567890"}
              Svg={MdPhone}
              field={0}
              setter={setNewPhones}
              state={newPhones}
              onChangeCb={handleChangeData}
              message="Integers only, 10+ characters"
            />
            {phoneFields.map((phoneField, index) => (
              <FormFieldOnChange
                label="Phone number"
                type="text"
                placeholder={"1234567890"}
                Svg={MdPhone}
                field={index + 1}
                key={index + "phone"}
                setter={setNewPhones}
                state={newPhones}
                onChangeCb={handleChangeData}
                message="Integers only, 10+ characters"
              />
            ))}
          </Container>
          <Container>
            <ButtonsContainer gap="10px">
              <Button
                color="#2ECC40"
                colorHover="#01FF70"
                onClick={() => addField(setEmailFields, emailFields)}
              >
                Add field
              </Button>
              <Button
                color="#c3195d"
                colorHover="#f70776"
                onClick={() => subField(setEmailFields, emailFields)}
              >
                Sub field
              </Button>
            </ButtonsContainer>
            <FormFieldOnChange
              label="Email"
              type="email"
              placeholder={"email@domain.com"}
              Svg={MdEmail}
              field={0}
              setter={setNewEmails}
              state={newEmails}
              onChangeCb={handleChangeData}
              message="Must be a valid e-mail"
            />
            {emailFields.map((emailField, index) => (
              <FormFieldOnChange
                label="Email"
                type="email"
                placeholder={"email@domain.com"}
                Svg={MdPhone}
                key={index + "email"}
                field={index + 1}
                setter={setNewEmails}
                state={newEmails}
                onChangeCb={handleChangeData}
                message="Must be a valid e-mail"
              />
            ))}
          </Container>
        </ReactiveContainer>
        <ButtonsContainer gap="5px" marginTop="20px">
          <Button
            color="#2ECC40"
            colorHover="#01FF70"
            onClick={() => {
              replaceData();
            }}
          >
            Replace all data
          </Button>
          <Button
            color="#DDDDDD"
            colorHover="#fff"
            onClick={() => addToExistingData()}
          >
            Add contacts only
          </Button>
          <Button
            color="#c3195d"
            colorHover="#f70776"
            onClick={() => {
              navigate("/contacts");
            }}
          >
            Cancel
          </Button>
        </ButtonsContainer>
      </Main>
    </PageContainer>
  );
};

export default Profile;

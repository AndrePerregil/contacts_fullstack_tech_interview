import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/container";
import { ReactiveContainer } from "../../components/overflowContainer";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Main } from "../../components/main";
import { PageContainer } from "../../components/pageContainer";
import { Title } from "../../components/title";
import { ButtonsContainer } from "../../components/buttonsContainer";
import { FormFieldOnChange, FormField } from "../../components/formField";
import { API } from "../../services/API";

import { MdAccountCircle, MdPhone, MdEmail } from "react-icons/md";

import { addField, subField } from "../../services/helpers";

const CreateContacts = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newPhones, setNewPhones] = useState({});
  const [newEmails, setNewEmails] = useState({});
  const [emailFields, setEmailFields] = useState([]);
  const [phoneFields, setPhoneFields] = useState([]);

  const logOut = () => {
    localStorage.clear("@contact_ti:token", "@contact_ti:username");
    navigate("/");
  };

  const token = localStorage.getItem("@contact_ti:token");
  const username = localStorage.getItem("@contact_ti:username");
  if (!token || !username) {
    logOut();
  }

  const handleChangeData = (state, setter, field, value) => {
    setter({ ...state, [field]: value.toString() });
  };

  const handleChangeName = (state, setter, field, value) => {
    setter(value);
  };

  const submitData = () => {
    const data = {
      name: newName,
      phones: Object.values(newPhones),
      emails: Object.values(newEmails),
    };

    API.post("/contacts", data, {
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
        <Button color="#c3195d" colorHover="#f70776" onClick={() => logOut()}>
          Logout
        </Button>
      </Header>
      <Main>
        <Container direction="row" gap="20px">
          <Title interval="1s" color="#f70776">
            Create
          </Title>
          <Title interval="1.5s" color="#01FF70">
            Contact
          </Title>
        </Container>
        <FormFieldOnChange
          label="Name"
          type="text"
          placeholder={"Name"}
          Svg={MdAccountCircle}
          field={0}
          message="Letters, 20 characters max"
          setter={setNewName}
          state={newName}
          onChangeCb={handleChangeName}
        />
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
                Sub Field
              </Button>
            </ButtonsContainer>
            <FormFieldOnChange
              label="Email"
              type="email"
              placeholder={"email@domain.com"}
              Svg={MdPhone}
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
        <ButtonsContainer gap="10px" marginTop="20px">
          <Button
            color="#2ECC40"
            colorHover="#01FF70"
            onClick={() => {
              submitData();
            }}
          >
            Create
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

export default CreateContacts;

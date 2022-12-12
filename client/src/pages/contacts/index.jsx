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
import { API } from "../../services/API";

const Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

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
    API.get("/contacts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.data.length > 0) {
          setContacts(res.data.data);
        }
      })
      .catch((error) => {
        logOut();
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setContacts]);

  const DeleteContact = (id) => {
    API.delete(`/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch((error) => {
        logOut();
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
        <ReactiveContainer>
          <Button
            width="200px"
            color="#2ECC40"
            colorHover="#01FF70"
            onClick={() => navigate("/create/contact")}
          >
            Create new contact
          </Button>
          <Button
            width="200px"
            color="#c3195d"
            colorHover="#f70776"
            onClick={() => {
              navigate("/profile");
            }}
          >
            My profile
          </Button>
        </ReactiveContainer>
        <Container direction="row" gap="20px">
          {contacts.length > 0 ? (
            <>
              <Title interval="1s" color="#f70776">
                Your contacts:
              </Title>
            </>
          ) : (
            <Title interval="1s" color="#f70776">
              No contacts yet
            </Title>
          )}
        </Container>
        <ReactiveContainer>
          {
            //looping through contacts list to generate cards, defiently needs it's own component but time ran out
          }
          {contacts.map((contact, index) => (
            <Container key={index + "card"}>
              <Title key={index + "title"}>{contact.name}</Title>
              <Container direction="column">
                {contact.phones.length > 0 ? (
                  <ul>
                    Phone numbers:
                    {contacts[index].phones.map((phone, indexPhone) => (
                      <li key={indexPhone + "phones"}>{phone.content}</li>
                    ))}
                  </ul>
                ) : (
                  <ul>No phones for {contact.name}</ul>
                )}

                {contact.emails.length > 0 ? (
                  <ul>
                    Emails:
                    {contacts[index].emails.map((email, indexEmail) => (
                      <li key={indexEmail + "email"}>{email.content}</li>
                    ))}
                  </ul>
                ) : (
                  <ul>No emails for {contact.name}</ul>
                )}
                <ButtonsContainer gap="5px">
                  <Button color="#2ECC40" colorHover="#01FF70">
                    Edit
                  </Button>
                  <Button
                    color="#c3195d"
                    colorHover="#f70776"
                    onClick={() => {
                      DeleteContact(contact.id);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonsContainer>
              </Container>
            </Container>
          ))}
        </ReactiveContainer>
      </Main>
    </PageContainer>
  );
};

export default Contacts;

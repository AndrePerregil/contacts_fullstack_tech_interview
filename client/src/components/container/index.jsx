import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.direction || "column"};
  gap: ${(props) => props.gap || "10px"};
  max-height: 70vh;
  padding: 10px;

  color: var(--white);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  h1,
  h2 {
    font-size: 16px;
    align-self: center;
    margin-top: 20px;
  }
  p {
    font-size: 8px;
  }

  @media (width>500px) {
    h1,
    h2 {
      font-size: 25px;
    }
    p {
      font-size: 12px;
    }
  }

  @media (width>700px) {
    h1,
    h2 {
      font-size: 30px;
    }
    p {
      font-size: 15px;
    }
  }
`;

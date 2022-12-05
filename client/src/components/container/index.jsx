import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.direction || "column"};
  gap: 10px;

  color: var(--white);

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

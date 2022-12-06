import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  p {
    color: var(--white);
    font-size: 10px;
  }

  a {
    text-decoration: none;
    color: var(--pink);
    transition: 0.5s;

    &:hover {
      color: var(--pinkFocus);
      font-size: 15px;
      text-shadow: 0 0 10px var(--white), 0 0 15px var(--pinkFocus);
    }
  }
`;

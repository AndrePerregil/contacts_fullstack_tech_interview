import styled from "styled-components";

export const Button = styled.button`
  color: var(--black);

  font-family: "Anek Malayalam", sans-serif;
  font-family: "VT323", monospace;
  font-family: "Zen Dots", cursive;

  background-color: ${(props) => `${props.color}`};
  padding: 5px;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  width: 100px;
  transition: all 0.5s;

  margin-top: ${(props) => props.marginTop};

  &:hover {
    background-color: ${(props) => `${props.colorHover}`};
    cursor: pointer;
    color: var(--white);
    box-shadow: 0 0 10px var(--white), 0 0 20px ${(props) => props.colorHover},
      0 0 40px var(--white);
  }
`;

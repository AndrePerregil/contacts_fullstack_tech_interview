import styled from "styled-components";

export const Title = styled.h2`
  color: ${(props) => props.color};
  text-shadow: 0 0 15px var(--white), 0 0 30px ${(props) => props.color},
    0 0 60px var(--white);
`;

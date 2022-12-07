import styled from "styled-components";

export const Title = styled.h2`
  color: ${(props) => props.color};
  text-shadow: 0 0 5px var(--white), 0 0 10px ${(props) => props.color},
    0 0 15px var(--white);
  animation: flash ${(props) => props.interval} infinite;
`;

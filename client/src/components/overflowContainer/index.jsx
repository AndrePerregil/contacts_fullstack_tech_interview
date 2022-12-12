import styled from "styled-components";

export const ReactiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: fit-content;
  gap: 5px;

  @media (width>600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

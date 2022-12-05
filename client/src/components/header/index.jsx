import styled from "styled-components";

export const Header = styled.header`
  @keyframes flicker {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 0.5;
    }
    40% {
      opacity: 1;
    }
    60% {
      opacity: 0.5;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes flash {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.5;
    }
    45% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  width: 100%;
  max-width: 1080px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1% 10% 1% 10%;
  position: fixed;
  top: 0;
  z-index: 1000;

  text-shadow: 0 0 5px var(--white), 0 0 10px var(--white),
    0 0 15px var(--white), 0 0 30px var(--greenFocus),
    0 0 60px var(--greenFocus);

  h1 {
    color: var(--green);
    font-size: 24px;
    animation: flicker 2s infinite alternate;
  }

  span {
    animation: flicker 0.2s infinite alternate;
  }

  @media (width>600px) {
    h1 {
      font-size: 30px;
    }
  }
`;
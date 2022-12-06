import styled from "styled-components";

const FormFieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 300px;
  box-sizing: border-box;
  gap: 5px;

  svg {
    height: 20px;
    width: 20px;
    color: var(--greenFocus);
    position: absolute;
    transform: translateY(130%) translateX(20%);
  }

  input {
    padding: 0.5rem 0.5rem;
    padding-left: 2rem;
    border: 2px solid var(--green);
    border-radius: 10px;
    transition: 0.3s;
    box-sizing: border-box;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
  }

  input[type="text"],
  textarea {
    background-color: var(--black);
    color: var(--white);
  }

  input[type="password"],
  textarea {
    background-color: var(--black);
    color: var(--greenFocus);
  }

  input:focus,
  input:hover {
    outline: none;
    border: 3px solid var(--greenFocus);
    box-shadow: 0 0 20px var(--greenFocus);
  }

  label {
    color: var(--greenFocus);
    font-size: 12px;
  }

  @keyframes flash2 {
    0% {
      opacity: 0.3;
      text-shadow: 0 0 1px var(--white);
    }
    50% {
      opacity: 0.8;
      text-shadow: 0 0 10px var(--pinkFocus);
      text-shadow: 0 0 15px var(--white);
    }
    100% {
      opacity: 1;
      text-shadow: 0 0 1px var(--white);
    }
  }

  span {
    color: var(--pinkFocus);
    height: 20px;
    animation: flash2 0.5s infinite;
  }
`;

export const FormField = ({
  color,
  label,
  type,
  value,
  placeholder,
  Svg,
  message,
  fieldContext,
}) => {
  return (
    <FormFieldStyled color={color}>
      <label>{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        {...fieldContext}
      />
      {Svg && <Svg />}
      <span>{message}</span>
    </FormFieldStyled>
  );
};

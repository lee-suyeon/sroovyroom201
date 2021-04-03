import React from 'react'
import styled, { css } from 'styled-components';

const secondStyle = css`
  ${props =>
    props.second &&
    css`
      color: red;
    `}
`;

const StyledInput = styled.div`
  text-align: center;

  ${secondStyle}

  label {
    display: block;
    color: ${({ theme }) => theme.mainColor };
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    height: 2.5rem;
    font-size: 1rem;
    outline: none;
    background: transparent;
    border: none;
    color: #333;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.mainColor };
    margin-bottom: 2rem;
  }

  input::placeholder {
    font-size: 0.825rem;
  }

  input: focus {
    border-bottom: 2px solid ${({ theme }) => theme.mainColor };
  }

`

function TextInput({ children, label, type, placeholder, value, onChange, mode, ...rest }) {
  return (
    <StyledInput>
      {label && <label>{label}</label>}
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        mode={mode}
        {...rest}
      />
    </StyledInput>
  )
}

export default TextInput

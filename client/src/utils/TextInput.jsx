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
  ${secondStyle}

  input {
    width: 100%;
    height: 2.5rem;
    font-size: 1rem;
    outline: none;
    background: transparent;
    border: none;
    color: #333;
    border-bottom: 1px solid ${({ theme }) => theme.mainColor };
    margin-bottom: 2rem;
  }

  input:focus {
    border-bottom: 2px solid ${({ theme }) => theme.mainColor };
  }
`

const InputLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.mainColor };
  font-weight: 500;
  margin-bottom: 0.5rem;

  span {
    color: ${({ theme }) => theme.pink };
  }
`

function TextInput({ children, className, label, name, type, placeholder, required, value, onChange, mode, ...rest }) {
  return (
    <StyledInput className={className}>
      {label && 
        <InputLabel>
          {label}{' '}
          {required && <span>*</span>}
        </InputLabel>
      }
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        mode={mode}
        {...rest}
      />
    </StyledInput>
  )
}

const StyledTextArea = styled.div`
  textarea {
    width: 100%;
    height: 15rem;
    outline: none;
    background: transparent;
    color: #333;
    line-height: 1.5;
    border: 1px solid ${({ theme }) => theme.mainColor };
    margin: 0.5rem 0;
    padding: 0.5rem;
    resize: none;
  }

  textarea:focus {
    border: 2px solid ${({ theme }) => theme.mainColor };
  }
`

export const TextArea = ({ label, name, value, onChange, placeholder }) => {
  return (
    <StyledTextArea>
      {label && <InputLabel>{label}</InputLabel>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </StyledTextArea>
  )
}

export default TextInput

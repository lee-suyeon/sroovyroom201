import React from 'react'
import styled, { css } from 'styled-components';

const StyledInput = styled.div`
  /* 공통 */
  margin-bottom: 3rem;

  label {
    display: block;
    color: ${({ theme }) => theme.mainColor };
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    height: 3.125rem;
    font-size: 1rem;
    outline: none;
    background: #fff;
    border: none;
    color: #333;
    border-bottom: 1px solid ${({ theme }) => theme.mainColor }
  }

  input: focus {
    border-bottom: 2px solid ${({ theme }) => theme.mainColor };
  }

`

function TextInput({ children, label, type, placeholder, value, onChange, ...rest }) {
  return (
    <StyledInput>
      <label>{label}</label>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </StyledInput>
  )
}

export default TextInput

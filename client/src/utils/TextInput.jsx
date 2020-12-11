import React from 'react'
import styled, { css } from 'styled-components';

const StyledInput = styled.div`
  /* 공통 */
  display: flex;
  margin-bottom: 1.2rem;

  input {
    width: 100%;
    font-size: 1rem;
    outline: none;
    background: #fff;
    border-radius: 4px;
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.05);
  }

  input: focus {
    border: 2px solid ${({ theme }) => theme.mainColor };
  }

`

function TextInput({ children, label, type, placeholder, ...rest }) {
  return (
    <StyledInput>
      <input 
        type={type}
        placeholder={placeholder}
      />
    </StyledInput>
  )
}

export default TextInput

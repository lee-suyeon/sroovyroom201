import React from 'react';
import styled, { css } from 'styled-components';

import { Check } from 'react-feather';

const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 1rem;
`

const CustomCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`

const CheckMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background: ${({ theme }) => theme.lightGreen };
  margin-right: 0.5rem;

  & > svg {
    display:none;
    width: 14px;
    height: 14px;
    color: #fff;
    stroke-width: 3px;
    stroke-linecap: square;
  }

  ${props =>
    props.checked === true &&
    css`
      background-color: ${({ theme }) => theme.mainColor };
      & > svg {
        display: block;
      }
    `}
`

function Checkbox({ props, checked, onChange, name, id }) {
  return (
    <Label htmlFor={id}>
      <CustomCheckbox 
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        id={id}
        {...props}
      />
      <CheckMark checked={checked}>
        <Check/>
      </CheckMark>
      <span className="check-name">{name}</span>
    </Label>
  )
}

Checkbox.defaultProps = {
  checked: false
};

export default Checkbox

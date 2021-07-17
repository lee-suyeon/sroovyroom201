import React from 'react';
import styled, { css } from 'styled-components';

import { Check } from 'react-feather';

const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  margin-right: ${props => `${props.gap}rem` || "1rem"};
`

const CustomCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`

const CheckMark = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid ${({ theme }) => theme.mainColor };
  margin: 0 0.2rem;

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

function Checkbox({ props, checked, onChange, color, name, id, gap, ...rest}) {
  return (
    <Label htmlFor={id} gap={gap}>
      <CustomCheckbox 
        type="checkbox"
        checked={checked}
        onClick={onChange}
        name={name}
        id={id}
        {...props}
      />
      <CheckMark checked={checked}>
        <Check/>
      </CheckMark>
      <span>{name}</span>
    </Label>
  )
}

Checkbox.defaultProps = {
  checked: false
};

export default Checkbox

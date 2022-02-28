import React from 'react'
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const sizes = {
  large: {
    height: '6.5rem',
    fontSize: '1.25rem'
  },
  medium: {
    height: '4rem',
    fontSize: '1.25rem'
  },
  small: {
    height: '2.7rem',
    fontSize: '1rem'
  },
}

const sizeStyle = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`

const colorStyle = css`
  ${({ theme, color }) => {
    const selected = theme[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.05, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }}
`

const StyledButton = styled.button`
  outline: none;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 0 1rem;
  transition: 0.2s;
  
  /* 크기 */
  ${sizeStyle}

  /* 색상 */
  ${colorStyle}

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${props =>
    props.float &&
    css`
      position: absolute;
      left: 0; bottom: 0;
    `}

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      background: ${({ theme }) => theme.gray };
    `}

  & + & {
    margin-left: 1rem;
  }
`;

function Button({ children, color, disabled, float, ...rest }) {
  return (
  <StyledButton 
    color={color}
    disabled={disabled}
    float={float}
    {...rest}
  >
    {children}
  </StyledButton>
  )
}

Button.defaultProps = {
  color: 'mainColor',
  size: 'medium'
};

export default Button

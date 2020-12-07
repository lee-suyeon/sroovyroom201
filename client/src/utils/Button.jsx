import React from 'react'
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem'
  },
  medium: {
    height: '3rem',
    fontSize: '1.25rem'
  },
  small: {
    height: '3rem',
    fontSize: '1.25rem'
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
  /* 공통 */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  padding: 0 1rem;
  
  /* 크기 */
  ${sizeStyle}

  /* 색상 */
  ${colorStyle}

  & + & {
    margin-left: 1rem;
  }
`;

function Button({ children, color, ...rest }) {
  return (
  <StyledButton color={color} {...rest} >{children}</StyledButton>
  )
}

Button.defaultProps = {
  color: 'mainColor',
  size: 'medium'
};

export default Button

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
  // display: inline-flex;
  // justify-content: center;
  // align-items: center;
  outline: none;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 0 1rem;
  transition: 0.2s;
  position: absolute;
  left: 0; bottom: 0;
  
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

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

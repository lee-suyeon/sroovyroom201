import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  large: {
    fontSize: "1.5rem"
  },
  medium: {
    fontSize: "1rem"
  },
  small: {
    fontSize: "0.825rem"
  },
}

const sizeStyle = css`
  ${({ size }) => css`
    font-size: ${sizes[size].fontSize};
  `}
`
const SroovyRoom = styled.div`
  display: inline-block;
  font-family: 'Dosis', sans-serif;
  font-weight: 600;
  color: ${({ theme, color }) => color || theme.mainColor };
  margin-bottom: 0.2rem;

  ${props =>
    props.color === "text" &&
    css`
      color: #333;
    `}

  ${sizeStyle}
`

function TextLogo({ size, color, ...rest }) {
  return (
    <SroovyRoom 
      size={size} 
      color={color} 
      {...rest}
    >SROOVYROOM</SroovyRoom>
  )
}

TextLogo.defaultProps = {
  TextLogo: 'textColor',
  size: 'large'
};

export default TextLogo

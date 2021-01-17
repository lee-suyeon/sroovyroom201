import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  large: {
    fontSize: "1.8rem"
  },
  medium: {
    fontSize: "1.2rem"
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
  font-family: 'Dosis', sans-serif;
  font-weight: 600;
  color: #779482;
  margin-bottom: 0.2rem;

  ${sizeStyle}
`

function TextLogo({ size, ...rest }) {
  return (
    <div>
      <SroovyRoom size={size} {...rest}>SROOVYROOM</SroovyRoom>
    </div>
  )
}

export default TextLogo

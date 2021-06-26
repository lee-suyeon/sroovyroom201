import React from 'react'
import styled from 'styled-components';

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color:  ${({ theme, color }) => color || theme.mainColor };
  line-height: 1.2;
  margin-Bottom: 1.5rem;
`

export const Title = ({ children, size, color, ...rest  }) => {
  return (
    <StyledTitle color={color} {...rest}>{children}</StyledTitle>
  )
}

const StyledText = styled.div`
  color: ${({ theme, color }) => color || theme.mainColor };
  font-weight: 600;
  text-align: center; 
  text-align:  ${({ textAlign }) => textAlign || "left" };
  text-decoration: ${({ textDecoration }) => textDecoration || "none" };
  margin: ${({ margin }) => margin}
`

export const Text = ({ children, size, margin, ...rest }) => {
  return (
  <StyledText 
    size={size}
    margin={margin}
    { ...rest }
  >
    {children}
  </StyledText>
  )
}

const StyledCopyRight = styled.div`
  text-align: center;
  color: ${({ theme, color }) => color || theme.mainColor };
  font-size: 0.825rem;
`

export const CopyRight = ({ color }) => {
  return (
    <StyledCopyRight color={color} >
      &copy; 2020. sroovyroom201. All rights reserved
    </StyledCopyRight>
  )
}

function Typo() {
  return (
    <div>
      
    </div>
  )
}

export default Typo

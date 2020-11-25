import React from 'react';
import styled, { css } from 'styled-components';

const MainLogo = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#04563f' }
`

const LogoText = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  top: ${props => props.top};
  left: ${props => props.left};
`

const Bar = styled.div`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 2px;
  height: 35px;
  background: #fff;
`

function Logo() {
  return (
    <MainLogo>
      <LogoText top="6px" left="13px">S</LogoText>
      <Bar />
      <LogoText top="25px" left="30px">R</LogoText>
    </MainLogo>
  )
}

export default Logo

import React from 'react';
import styled from 'styled-components';

import { Menu } from 'react-feather';

const NavIcon = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: ${({ theme }) => theme.mainColor };
`

function Nav() {
  return (
    <NavIcon>
      <Menu />
    </NavIcon>
  )
}

export default Nav

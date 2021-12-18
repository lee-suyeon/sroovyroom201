import React from 'react';
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { X } from 'react-feather';

import { Logo } from 'utils'

const SideNavWrapper = styled.div`
  width: 80%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.darkGreen };
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;

  svg {
    color: ${({ theme }) => theme.white };
  }

  .logo {
    background: ${({ theme }) => theme.white };
    margin: 0 auto;

    .sroovy, .room {
      color: ${({ theme }) => theme.mainColor };
    }

    &:after {
      background: ${({ theme }) => theme.mainColor };
    }
  }
`

const MenuList = styled.ul`
  text-align: center;
  margin: 1rem 0;

  li {
    color: ${({ theme }) => theme.white };
    font-size: 1.2rem;
    padding: 0.8rem 0;
  }
`

const Footer = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.white };
`

const menuList = [
  { id: 0, name: 'Home', path: '/'},
  { id: 1, name: 'Menu', path: '/menu'},
  { id: 2, name: 'Notice', path: '/notice'},
  { id: 3, name: 'Visitors', path: '/visitors'},
  { id: 4, name: 'Gallery', path: '/gallery'},
]

function SideNav () {
  return (
    <SideNavWrapper>
      <X />
      <div>
        <Logo size="large" color="white" />
        <MenuList>
          {menuList.map(list =>
            <Link to={list.path} key={`menu${list.id}`}>
              <li>{list.name}</li>
            </Link> 
          )}
        </MenuList>
      </div>
      <Footer>
        <span>Sign up</span>
        <span> | </span>
        <span>Sign in</span>
      </Footer>
    </SideNavWrapper>
  )
}

export default SideNav;
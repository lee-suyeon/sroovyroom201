import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Bar from 'utils/Bar';
import Button from 'utils/Button';
import PageContent from 'utils/PageContent';

import { Home } from 'react-feather';

const Menus = [
  { name: "Notice", desc: "우리집 소식", path: "/notice" },
  { name: "Visitors", desc: "방명록", path: "/visitors" },
  { name: "Roomtour", desc: "랜선 집들이", path: "/roomtour" },
  { name: "Instagram", desc: "인스타그램", path: "/instagram" },
]

const MenuList = styled.ul`
  text-align: center;

  a {
    display: block;
    padding: 1rem;
    position: relative;
    z-index: 10;
  }

  li {
    position: relative;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
  
    &:after {
      content: "";
      position: absolute;
      top: 50%; left: 60%;
      transform: translate(-50%, -50%) rotate(135deg);
      width: 0;
      height: 6px;
      transition: 0.3s;
      background: ${({ theme }) => theme.mainColor };
    }

    &:hover:after {
      width: 25%;
    }
  }

  span {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    margin-top: 0.3rem;
  }
`

const HomeIcon = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: ${({ theme }) => theme.mainColor };
`

function MenuPage() {
  return (
    <div>
      <div style={{ padding: '2rem' }}>
        <Link to='/'>
          <HomeIcon><Home /></HomeIcon>
        </Link>
        <PageContent 
          title="방문을 진심으로 환영합니다."
          desc="🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️"
        />
    
        <Bar style={{ marginBottom: '1.5rem' }}/> 
          
        <MenuList>
          {Menus.map((menu, idx) => (
            <Link to={menu.path}>
              <li key={`menu${idx}`}>
                {menu.name}
                <span>{menu.desc}</span>
              </li>
            </Link>
          ))}
        </MenuList>

      </div>
      <div style={{ display: 'flex' }}>
        <Link to='/login'>
          <Button fullWidth size="medium">Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default MenuPage
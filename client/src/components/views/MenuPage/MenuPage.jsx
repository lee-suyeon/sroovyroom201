import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Logo from '../../../utils/Logo';
import TextLogo from '../../../utils/TextLogo';
import { Title, Text } from '../../../utils/Typo';
import Bar from '../../../utils/Bar';
import Button from '../../../utils/Button';

import { Check } from 'react-feather';

const Menus = [
  { name: "Notice", desc: "우리집 소식", path: "/notice" },
  { name: "Visitors", desc: "방명록", path: "/visitors" },
  { name: "Roomtour", desc: "랜선 집들이", path: "/roomtour" },
  { name: "Instagram", desc: "인스타그램", path: "/instagram" },

]

const ContentPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
height: 100%;
margin-bottom: 3rem;
`

const MenuList = styled.ul`
  text-align: center;

  a {
    display: block;
    padding: 1.5rem 1rem;
    position: relative;
    z-index: 10;
  }

   li {
    position: relative;
    font-size: 1.8rem;
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
    font-size: 0.8rem;
    font-weight: 400;
    margin-top: 0.5rem;
  }
`

const List = styled.li`
  
`

function MenuPage() {

  const onClickMenu = () => {

  }

  return (
    <ContentPage>
      <div className="top-content" style={{ padding: '1rem'}}>
        <Logo size="large" />
        <Title>
          <TextLogo size="large" />
          <br />방문을 진심으로<br />환영합니다.
        </Title>
        <span style={{ display: 'block', textAlign: 'right'}}>🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️</span>
      </div>

      <Bar style={{ marginBottom: '1.5rem' }}/>
      
        <MenuList>
          {Menus.map((menu, idx) => (
            <Link to={menu.path}>
              <li key={`menu${idx}`} onClick={onClickMenu}>
                {menu.name}
                <span>{menu.desc}</span>
              </li>
            </Link>
          ))}
        </MenuList>
      
      <Button width="full" size="medium">ENTER</Button>
      
    </ContentPage>
  )
}

export default MenuPage
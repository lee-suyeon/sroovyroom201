import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

import axios from 'axios';

import Button from 'utils/Button';
import PageContent from 'utils/PageContent';

import { Home } from 'react-feather';

const Menus = [
  { name: "Notice", desc: "우리집 소식", path: "/notice" },
  { name: "Visitors", desc: "방명록", path: "/visitors" },
  { name: "Reservation", desc: "예약하기", path: "/reservation" },
  { name: "Gallery", desc: "갤러리", path: "/gallery" },
]

const MenuPageWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
`

const MenuList = styled.ul`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 4rem;

  a {
    display: block;
    padding: 1.2rem;
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

function MenuPage(props) {

  const userData = useSelector(state => state.user.userData);

  const logoutHandler = () => {
    axios.get(`api/users/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <MenuPageWrapper>
        <Link to='/'>
          <HomeIcon><Home /></HomeIcon>
        </Link>
        <PageContent 
          title="방문을 진심으로 환영합니다."
          desc="🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️🙇🏻‍♀️"
        />
          
        <MenuList>
          {Menus.map((menu, idx) => (
            <Link to={menu.path} key={`menu${idx}`}>
              <li>
                {menu.name}
                <span>{menu.desc}</span>
              </li>
            </Link>
          ))}
        </MenuList>

      </MenuPageWrapper>
      {(userData && userData.isAuth) ?
        <Button 
          onClick={logoutHandler}
          fullWidth size="medium">CHECK-OUT
        </Button> :
        <Link to='/login'>
          <Button fullWidth size="medium">CHECK-IN</Button>
        </Link>
      }
    </div>
  )
}

export default withRouter(MenuPage)
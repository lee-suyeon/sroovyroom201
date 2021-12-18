import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { Menu } from 'react-feather';
import SideNav from 'components/views/SideNav/SideNav'

import { toggleSideNav } from '_actions/menu_action';

const SideNavigation = styled.div`

  .nav-icon {
    position: absolute;
    top: 2.5rem;
    right: 2rem;
    color: ${({ theme }) => theme.mainColor };
  }
`

function Nav() {
  const isShowNav = useSelector(state => state.menu.showSideNav)
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(toggleSideNav());
  }

  return (
    <SideNavigation>
      <div className="nav-icon" onClick={onClickHandler}>
        <Menu />
      </div>
      <SideNav 
        visible={isShowNav} 
        toggleSideNav={onClickHandler}
        />
    </SideNavigation>
  )
}

export default Nav

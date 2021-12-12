import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Bell } from 'react-feather';
import Modal from './Modal';

const DoorFrame = styled.div`
  background: ${({ theme }) => theme.baseColor };
  border: 1.2rem solid ${({ theme }) => theme.mainColor };
  border-bottom: none;
  width: 100vw;
  height: 100vh;
`

const openDoor = keyframes`
  0% {
    transform: perspective(650px) rotateY(10deg);
  }
  25% {
    transform: perspective(650px) rotateY(30deg);
  }
  50% {
    transform: perspective(650px) rotateY(50deg);
  }
  75% {
    transform: perspective(650px) rotateY(70deg);
  }
  100% {
    transform: perspective(650px) rotateY(70deg);
  }
`

const Door = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.mainColor };
  color: ${({ theme }) => theme.white };
  padding-top: 9rem;
  border: 1.5px solid ${({ theme }) => theme.baseColor };
  border-bottom: 0;
  transform-origin: 0% 0%;
  transform: perspective(300px) rotate(0deg);
  z-index: 10;

  ${(props) => props.active && css`
    animation: ${openDoor} 2s linear;
  `}

  & > .room {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    letter-spacing: 2px;
  }

  & > .bell {
    width: 60px;
    height: 60px;
    border: 3px solid #fff; 
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  & > .bell:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 30px;
    height: 30px;
  }
`

const Handle = styled.div`
  position: absolute;
  top: 53%;
  right: 1rem;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;

  &::after {
    content: "";
    width: 66px;
    height: 9px;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
  }
`

const Cat = styled.div`
  position: absolute;
  bottom: 0px;
  right: 25px;

  & > div {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.mainColor };
    position: absolute;
    top: 30px;
    right: 30px;
  }
  
  img {
    width: 300px;
  }
`

function LandingPage(props) {
  const [ open, setOpen ] = useState(false);
  const [ ringTheBell, setRingTheBell] = useState(false);

  const onClickDoorBell = () => {
    setRingTheBell(prev => !prev);
  }

  const openTheDoor = (name) => {
    localStorage.setItem('temporaryUser', JSON.stringify(name));
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
      props.history.push('/door-lock');
    }, 2000)
  }


  return (
    <DoorFrame>
      <Door active={open} >
        <div className="room">201</div>
        <div className="bell">
          <Bell onClick={onClickDoorBell}/>
        </div>
        <span>초인종을 눌러주세요!</span>
        <Handle />
      </Door>
        <Cat>
          <div>
            어..왔냥?
          </div>
          <img src="https://pngimg.com/uploads/cat/cat_PNG50509.png" alt="cat" />
        </Cat>
      {
        ringTheBell && 
        <Modal
          toggleModal={onClickDoorBell}
          openTheDoor={openTheDoor}
        />
      }
    </DoorFrame>
  )
}

export default withRouter(LandingPage);

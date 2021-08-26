import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'utils/Button';
import TextLogo from 'utils/TextLogo';
import TextInput from 'utils/TextInput';

import { X } from 'react-feather';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  `
  
const ModalWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.baseColor };
`

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.mainColor };
  border-bottom: 1px solid ${({ theme }) => theme.mainColor };
  padding: 0.5rem 0.7rem;

  svg {
    width: 20px;
  }
`

const ModalBody = styled.div`
  height: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;

  p {
    margin-bottom: 0.5rem;
  }

  input {
    text-align: center;
  }
`

function Modal({ toggleModal, openTheDoor }) {
  const [ name, setName ] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  }

  const enterTheRoom = (userName) => {
    setName("");
    openTheDoor(userName);
    toggleModal();
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13 && name) {
      enterTheRoom(name);
    }
  }

  return (
    <Overlay>
      <ModalWrapper>
        <ModalHeader>
          <TextLogo 
            size="medium" 
            roomNumber 
            style={{ marginBottom: 0}}
            />
          <X onClick={toggleModal}/>
        </ModalHeader>
        <ModalBody>
          <p>누...누구세요? 🙊</p>
          <form 
            style={{ textAlign: "center" }}
            onKeyDown={handleKeyDown}
            >
            <TextInput 
              type="text"
              maxLength="10"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={onChangeName}
              style={{ width: '90%' }}
            />
            <Button
              fullWidth
              size="small"
              color={name ? "mainColor" : "lightGreen"}
              disabled={!name ? true : false}
              onClick={() => enterTheRoom(name)}
            >
              들어가기
            </Button>
          </form>
        </ModalBody>
      </ModalWrapper>
    </Overlay>
  )
}

export default Modal; 
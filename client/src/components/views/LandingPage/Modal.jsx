import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, TextLogo, TextInput } from 'utils';
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
  width: 240px;
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
  width: 100%;
  font-size: 0.9rem;

  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.8rem 1.5rem;
  }

  & p {
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    font-size: 0.9rem;
    height: 2rem;
    margin-bottom: 0;
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
          <div>
            <p>누...누구세요? 정체를 밝혀라🕵🏻‍♀️</p>
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
              />
            </form>
          </div>
          <Button
            fullWidth
            size="small"
            color={name ? "mainColor" : "lightGreen"}
            disabled={!name ? true : false}
            onClick={() => enterTheRoom(name)}
          >
            들어가기
          </Button>
        </ModalBody>
      </ModalWrapper>
    </Overlay>
  )
}

export default Modal; 
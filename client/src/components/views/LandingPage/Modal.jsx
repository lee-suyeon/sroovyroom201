import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../utils/Button';
import TextLogo from '../../../utils/TextLogo';
import TextInput from '../../../utils/TextInput';

import { X } from 'react-feather';

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;
`

const ModalHeader = styled.div`
  padding: 0.5rem 0.7rem;
  background-color: ${({ theme }) => theme.mainColor };
  color: ${({ theme }) => theme.baseColor };
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 20px;
  }
`

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.baseColor };

  p {
    margin-bottom: 0.5rem;
  }

  span {
    color: ${({ theme }) => theme.mainColor };
    padding: 0.5rem;
    transition: 0.2s;
  }

  span:hover {
    background-color: ${({ theme }) => theme.mainColor };
    color: ${({ theme }) => theme.baseColor };
  }

  input {
    text-align: center;
  }
`

function Modal({ toggleModal, openTheDoor }) {
  const [ name, setName ] = useState("");
  const inputRef = useRef();

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
    <ModalWrapper>
      <div>
        <ModalHeader>
          <TextLogo 
            size="medium" 
            roomNumber 
            color="secondary"
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
              style={{ width: '80%', marginBottom: '1.2rem'}}
              value={name}
              onChange={onChangeName}
              ref={inputRef}
            />
            <span onClick={() => enterTheRoom(name)}>들어가기</span>
          </form>
        </ModalBody>
      </div>
    </ModalWrapper>
  )
}

export default Modal; 
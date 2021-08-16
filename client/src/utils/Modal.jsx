import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import TextLogo from './TextLogo';

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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  background-color: ${({ theme }) => theme.baseColor };
`

const Header = styled.div`
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

const Content = styled.div`
  height: 150px;
  position: relative;
  text-align: center;
  padding: 1.5rem;
  line-height: 1.5;
`

export const Modal = ({ children, onClose }) => {
  return (
    <Overlay>
      <ModalWrapper>
        <Header>
        <TextLogo 
          size="medium" 
          roomNumber 
          style={{ marginBottom: 0}}
          />
        <X onClick={onClose}/>
        </Header>
        <Content>
          <p>{children}</p>
        </Content>
        <Button
          fullWidth
          size="small"
          onClick={onClose}
        >
          확인
        </Button>
      </ModalWrapper>
    </Overlay>
  )
}

export default Modal; 
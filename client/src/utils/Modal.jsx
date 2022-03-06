import React from 'react';
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
  width: ${props => props.width || "60%"};
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
  position: relative;
  text-align: center;
  padding: 1.5rem;
  line-height: 1.5;
`

const ModalFooter = styled.div`
  width: 100%;
  display: flex;

  .cancel {
    margin-left: 0;
    background: ${({ theme }) => theme.gray };
  }
`

export const Modal = ({ children, type, onClose, onConfirm, width }) => {
  // Type 
  // alert
  // confirm
  return (
    <Overlay>
      <ModalWrapper width={width}>
        <ModalHeader>
        <TextLogo 
          size="medium" 
          roomNumber 
          style={{ marginBottom: 0}}
          />
        <X onClick={onClose}/>
        </ModalHeader>
        <ModalBody>
          <div>{children}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            size="small"
            className="confirm"
            onClick={onConfirm}
          >
            확인
          </Button>
          {type !== 'confirm' &&
            <Button
              fullWidth
              size="small"
              className="cancel"
              onClick={onClose}
            >
              취소
            </Button>
          }
        </ModalFooter>
      </ModalWrapper>
    </Overlay>
  )
}

export default Modal; 
import React, { useState, useCallback } from 'react'
import styled from 'styled-components';

import { Key, HelpCircle, ArrowLeft } from 'react-feather';
import TextLogo from '../../../utils/TextLogo'
import Button from '../../../utils/Button'

const dial =  Array(9).fill().map((v, i) => i + 1);

const DoorLockWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const Guide = styled.div`
  color: ${({ theme }) => theme.mainColor };
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5;
  margin-top: 1rem;

  svg {
    margin: 0 auto 5px;
    display: block;
  }
`

const DialNumber = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(3, 80px);
  text-align: center;
  color: ${({ theme }) => theme.mainColor };
  
  & > div {
    font-size: 1.7rem;
    line-height: 80px;
  }
  
  $ > .number {
    transition: 0.3s;
  }

  & > .number:active,
  & > .number:hover {
    background: ${({ theme }) => theme.mainColor };
    color: ${({ theme }) => theme.baseColor };
  }
`

const NumberWrapper = styled.div`
  width: 150px;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.mainColor };
  font-size: 3rem;
  font-family: 'Dosis', sans-serif;
  font-weight: 500;
  letter-spacing: 8px;
  color: ${({ theme }) => theme.mainColor };
  text-align: center;
  line-height: 60px;
  padding-left: 0.5rem;
`

const HelpWrapper = styled.div`

  width: 100%;
  color: ${({ theme }) => theme.mainColor };
  
  & > div {
    display: flex;
    justify-content: space-between;
  }
  `
  
  const HelpMessage = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.6;
  background: #e2e8e4;
  color: ${({ theme }) => theme.textColor };
  border-radius: 5px;

  &::before {
    content: "";
    position: absolute;
    top: -0.3rem;
    right: 1rem;
    width: 10px;
    height: 10px;
    background: #e2e8e4;
    transform: rotate(45deg);
  }
`

const Alohomora = styled.div`
  position: absolute;
  bottom: 8rem;
  right: -2.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.mainColor };
  opacity: 0.08;
  transform: rotate(270deg);
`

//#ff9f8e

function DoorLock() {
  const [ numbers, setNumbers ] = useState([]);
  const [ showMessage, setShowMessage ] = useState(false);


  const onClickNumber = (number) => {

    if(numbers.length < 4){
      setNumbers(prev => prev + number);
    } else {
      return;
    }
  }

  const onClickAlohomora = () => {
    alert('정답')
  }

  const onClickHelpCircle = useCallback(() => {
    setShowMessage(prev => !prev);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000)
  },[]);



  return (
    <div>

      <HelpWrapper>
          <div>
            <ArrowLeft />
            <HelpCircle onClick={onClickHelpCircle}/>
          </div>
          {showMessage && 
            <HelpMessage>
              착한 사람 눈에는 문을 여는 주문이 보여요! <br />
              Hint: ⚡️🦉🪶🔮
            </HelpMessage>
          }
        </HelpWrapper>

      <DoorLockWrapper>
        <Guide>
          <Key />
          <TextLogo />에 <br />
          입장하려면 비밀번호가 필요해요. <br />
          문을 여는 주문을 알고 있다면 <br />
          비밀번호는 필요 없어요. 
        </Guide>
        
        <NumberWrapper>
          {numbers}
        </NumberWrapper>

        <DialNumber>
          {dial.map((d, idx) => (
            <div 
              key={`dial-${idx+1}`}
              className="number"
              onClick={() => onClickNumber(d)}
              >{d}</div>
          ))}
        </DialNumber>

        <Button fullWidth >들어가기</Button>

      </DoorLockWrapper>

      <Alohomora onClick={onClickAlohomora}>
        Alohomora
      </Alohomora>
    </div>
  )
}

export default DoorLock
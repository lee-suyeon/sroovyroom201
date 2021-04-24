import React, { useState, useCallback } from 'react'
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Key, HelpCircle, ArrowLeft } from 'react-feather';
import TextLogo from '../../../utils/TextLogo'
import Button from '../../../utils/Button'

const dial =  Array(9).fill().map((v, i) => i + 1);
const defaultPassword = Array(4).fill().map(v => v);

const PASSWORD = '1234';

const Layout = styled.div`
  padding: 2rem;
  height: 100vh;
`

const DoorLockWrapper = styled.div`
  height: calc(100% - 45px);
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

  svg {
    margin: 0 auto;
    display: block;
  }
`

const DialNumber = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(3, 80px);
  text-align: center;
  margin-top: -1.5rem;
  color: ${({ theme }) => theme.mainColor };
  
  & > div {
    font-family: 'Dosis', sans-serif;
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 80px;
    cursor: pointer;
  }
  
  $ > .number {
    transition: 0.3s;
  }

  & > .number:hover {
    background: ${({ theme }) => theme.mainColor };
    color: ${({ theme }) => theme.baseColor };
  }
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
  top: 1rem;
  left: 1.5rem;
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
    top: 1.5rem;
    right: -0.3rem;
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

const NumberCell = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 3px;
  background: #e2e8e4;
  margin-right: 0.5rem;
  text-align: center;
  font-size: 2rem;
  line-height: 45px;
  font-family: 'Dosis', sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor };

  &:last-child {
    margin-right: 0;
  }

  span {
    font-size: 0.825rem;
    color: ${({ theme }) => theme.mainColor };
    cursor: pointer;
  }
`

const ResetMessage = styled.div`
  font-size: 0.825rem;
  margin-top: -1rem;
  color: ${({ theme }) => theme.mainColor };
  font-weight: 500;

  ${props =>
    props.visible &&
    css`
      visibility: hidden;
    `}
`

function DoorLock( props ) {
  const [ numbers, setNumbers ] = useState(defaultPassword);
  const [ showMessage, setShowMessage ] = useState(false);

  const onClickNumber = (number) => {
    let inputNumbers = [ ...numbers ]
    let inputIdx = numbers.findIndex(num => !num);

    if( inputIdx !== -1) {
      inputNumbers[inputIdx] = number;
      setNumbers(inputNumbers)
    } else {
      return;
    }
  }

  const onClickAlohomora = () => {
    alert('정답');
    props.history.push('/menu');
  }

  const onClickReset = () => {
    setNumbers(defaultPassword);
  }

  const onClickHelpCircle = useCallback(() => {
    setShowMessage(prev => !prev);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000)
  },[]);

  const onClickEnter = (pwd) => {
    let arrToStr = pwd.join('');

    if(PASSWORD === arrToStr) {
      alert("환영합니다!");
      props.history.push('/menu');
    } else {
      alert('틀렸습니다. 다시 한번 입력해주세요. ')
      setNumbers(defaultPassword);
    }
    
  }

  return (
    <Layout>
      <HelpWrapper>
          <div>
            <Key />
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
          <TextLogo />에 <br />
          입장하려면 비밀번호가 필요해요. <br />
          문을 여는 주문을 알고 있다면 <br />
          비밀번호는 필요 없어요. 
        </Guide>
        
        <div style={{ display: "flex", marginTop: '1rem' }}>
          {numbers.map((number, i) => 
            <NumberCell key={`number${i+1}`}>{number}</NumberCell>
          )}
        </div>
        <ResetMessage
          visible={numbers[0] ? false : true}
          onClick={onClickReset}
        > 다시 입력하기</ResetMessage>

        <DialNumber>
          {dial.map((d, idx) => (
            <div 
              key={`dial-${idx+1}`}
              className="number"
              onClick={() => onClickNumber(d)}
              >{d}</div>
          ))}
        </DialNumber>

        <Button fullWidth onClick={() => onClickEnter(numbers)}>들어가기</Button>

      </DoorLockWrapper>

      <Alohomora onClick={onClickAlohomora}>
        Alohomora
      </Alohomora>
    </Layout>
  )
}

export default withRouter(DoorLock);
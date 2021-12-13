import React, { useState, useCallback } from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { Key, HelpCircle, Delete } from 'react-feather';
import { TextLogo, Button, Modal } from 'utils';

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

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.lightGreen };
  }
  svg {
    vertical-align: middle;
    width: 14px;
    margin-right: 0.2rem;
  }
`

const DialNumber = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(3, 65px);
  text-align: center;
  margin-top: -1.5rem;
  color: ${({ theme }) => theme.mainColor };

  & > div {
    font-family: 'Dosis', sans-serif;
    font-weight: 500;
    font-size: 1.7rem;
    line-height: 65px;
    cursor: pointer;
  }

  & > .number {
    transition: 0.3s;
  }

  & .clover {
    position: relative;
  }
`

const HelpWrapper = styled.div`
  color: ${({ theme }) => theme.mainColor };
  display: flex;
  justify-content: space-between;
  width: 100%;
  `

const HelpMessage = styled.div`
  position: relative;
`

const BubbleMessage = styled.div`
  position: absolute;
  top: -0.5rem;
  right: 2.2rem;
  width: 200px;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.825rem;
  line-height: 1.6;
  background: #e2e8e4;
  color: ${({ theme }) => theme.textColor };
  border-radius: 3px;

  &::before {
    content: "";
    position: absolute;
    top: 1rem;
    right: -0.3rem;
    width: 10px;
    height: 10px;
    background: #e2e8e4;
    transform: rotate(45deg);
  }
`

const NumberCell = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 3px;
  background: #e2e8e4;
  margin-right: 0.5rem;
  text-align: center;
  font-size: 1.7rem;
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

const dial =  Array(9).fill().map((v, i) => i + 1);
const defaultPassword = Array(4).fill().map(v => v);
const generatePassword = () => {
  let result = [];
  for(var i = 0; i < 4; i++){
    result.push(Math.floor(Math.random() * dial.length));
  }
  return result;
}
const PASSWORD = generatePassword();

function DoorLock( props ) {
  const [ numbers, setNumbers ] = useState(defaultPassword);
  const [ showMessage, setShowMessage ] = useState(false);
  const [ showWelcome, setShowWelcome ] = useState(false);

  const onClickDial = (dial) => {
    let inputNumbers = [ ...numbers ]
    let inputIdx = numbers.findIndex(num => !num);
    
    if(dial !== "delete") { // 지우기 버튼을 클릭했을 때
      let num = dial.toString();
      if( inputIdx !== -1) {
        inputNumbers[inputIdx] = num;
      } 
    } else { // 숫자를 클릭했을 때
      if( inputIdx !== -1) {
        inputNumbers[inputIdx - 1] = "";
      } else {
        inputNumbers[inputNumbers.length - 1] = "";
      }
    }
    setNumbers(inputNumbers)
  }

  const onClickHelpCircle = useCallback(() => {
    setShowMessage(prev => !prev);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000)
  },[]);

  const onClickEnter = (pwd) => {
    if(PASSWORD.join('') === pwd.join('')) {
      setShowWelcome(true);
    } else {
      alert('틀렸습니다. 다시 한번 입력해주세요. ')
      setNumbers(defaultPassword);
    }
  }

  const onClickClover = useCallback(() => {
    setNumbers(PASSWORD);
    setTimeout(() => {
      setNumbers(defaultPassword);
    }, 100)
  }, [numbers])

  const onClickConfirm = () => {
    setShowWelcome(false);
    props.history.push('/menu');
  }

  return (
    <Layout>
      <HelpWrapper>
        <Key />
        <HelpMessage>
          <HelpCircle onClick={onClickHelpCircle}/>
          {showMessage &&
            <BubbleMessage>
              행운을 빌어요! Good Luck 🍀
            </BubbleMessage>
          }
        </HelpMessage>
        </HelpWrapper>

      <DoorLockWrapper>
        <Guide>
          <TextLogo style={{ marginBottom: 0 }}/>에 <br />
          입장하려면 비밀번호가 필요해요. <br />
          <span>🧚🏻 진짜 모르겠으면 <HelpCircle />버튼을 눌러보세요.</span>
        </Guide>

        <div style={{ display: "flex", marginBottom: '1rem' }}>
          {numbers.map((number, i) =>
            <NumberCell key={`number${i+1}`}>{number}</NumberCell>
          )}
        </div>

        <DialNumber>
          {dial.map((d, idx) => (
            <div
              key={`dial-${idx+1}`}
              className="number"
              onClick={() => onClickDial(d)}
              >{d}</div>
          ))}
          <div onClick={onClickClover}>🍀</div>
          <div onClick={() => onClickDial(0)}>0</div>
          <div onClick={() => onClickDial("delete")}><Delete /></div>
        </DialNumber>

        <Button 
          fullWidth 
          float 
          onClick={() => onClickEnter(numbers)}
        >
          들어가기
        </Button>
      </DoorLockWrapper>
      
      {showWelcome &&
        <Modal onClose={onClickConfirm}>
          🤗 👐 🤗 <br />
          환영합니다!!!!!🥳
        </Modal>
      }
    </Layout>
  )
}

export default withRouter(DoorLock);
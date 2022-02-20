import React from 'react';
import styled from 'styled-components';

import { FormTitle } from './ReservationPage';
import { CheckBox } from 'utils';
import { Lock, ChevronDown } from 'react-feather';

const InfoAgreementForm = styled.div`
  details {
    border: 1px solid #CBD2CD;
    padding: 0.8rem;
  }

  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      color: ${({ theme }) => theme.mainColor };
    }
  }

  ul {
    padding: 0.5rem;
    color: ${({ theme }) => theme.lightGray };
    line-height: 1.5;
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
  }

  li {
    margin-bottom: 0.3rem;
  }

  summary::marker {
    color: ${({ theme }) => theme.mainColor };
  }
`

const InfoAgreement = ({ infoAgreement, onChange }) => {
  return (
    <InfoAgreementForm>
      <FormTitle>
        <Lock />
          <div className="sub-title">개인정보수집에 동의해주세요.</div>
      </FormTitle>
      <details>
        <summary>
          <span>개인정보수집동의</span>
          <ChevronDown />
        </summary>
        <ul>
          <li>1. 기본수집항목: [필수] 이름, 이메일 주소</li>
          <li>2. 수집 및 이용목적 : 호스트와 게스트의 원활한 예약 진행, 예약 기록 보존, 고객상담, 민원처리</li>
          <li>3. 보관기간 : 예약일로부터 한달 뒤 폐기</li>
          <li>4. 동의 거부권 등에 대한 고지: 정보주체는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나, 이 경우 스루비룸 예약이 제한될 수 있습니다.</li>
        </ul>

        <CheckBox
          id="agree"
          name={"개인정보수집에 동의하시나요?"}
          checked={infoAgreement}
          onChange={onChange}
        />
      </details>
    </InfoAgreementForm>
  )   
}

export default InfoAgreement;
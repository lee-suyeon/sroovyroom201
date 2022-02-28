import React  from 'react';
import styled from 'styled-components';

import { FormTitle } from './BookingPage';
import { ShoppingCart } from 'react-feather'; 
import { CheckBox } from 'utils';

export const dinnerMenuList = [
  { value: 1, menu: "스루비의 요리조리~", desc: "💁🏻 게스트 이미지에 맞는 요리를 해드립니다." },
  { value: 2, menu: "외식하자!", desc: "💁🏻 스루비룸 주변 맛집을 탐방합니다." },
  { value: 3, menu: "배달시킬까?", desc: "💁🏻 배달의 민족 추천 맛집을 선보입니다." },
]

const DinnerMenuForm = styled.div`
  li {
    margin-bottom: 0.8rem;
  }

  .check-name {
    color: ${({ theme }) => theme.mainColor };
    font-weight: 500;
  }

  .menu-desc {
    font-size: 0.85rem;
    line-height: 1.8;
    padding-left: 1.5rem;
  }

`

function DinnerMenu ({ dinnerMenu, onChange }) {
  return (
    <DinnerMenuForm>
      <FormTitle>
        <ShoppingCart />
        <div className="sub-title">저녁 메뉴를 선택해주세요.</div>
      </FormTitle>
      <ul>
        {dinnerMenuList.map((list) => 
          <li key={`menu-${list.value}`}>
            <CheckBox
              id={list.value}
              name="dinnerMenu"
              label={list.menu}
              onChange={() => onChange('dinnerMenu', list.value)}
              checked={dinnerMenu === list.value ? true : false }
            />
              <p className="menu-desc">{list.desc}</p>
          </li>
        )}
      </ul>
    </DinnerMenuForm>
  )
}

export default DinnerMenu;
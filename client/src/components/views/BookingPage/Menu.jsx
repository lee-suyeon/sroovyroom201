import React from 'react';
import styled from 'styled-components';

import { CheckBox } from 'utils';
import { vegitableList, noodleList, mealList, eatOutList } from './menuList';

const MenuWrapper = styled.div`
  margin-bottom: 1rem;
`

const MenuSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 0.9rem;
  gap: 0.5rem 0;
`

const SelectTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.mainColor };
  margin-bottom: 1rem;
`

export const ShabuShabu = () => {
  return (
    <div style={{ padding: "0.5rem" }}>
      {/* 샤브샤브 */}
      <MenuWrapper>
        <SelectTitle>1. 샤브샤브를 선택해주세요. </SelectTitle>
        <MenuSelect>
          <CheckBox 
            id="sukiyaki"
            name="스키야키"
          />
          <CheckBox 
            id="nabe"
            name="밀푀유나베"
          />
        </MenuSelect>
      </MenuWrapper>

      {/* 육수 */}
      <MenuWrapper>
        <SelectTitle>2. 육수를 선택해주세요.</SelectTitle>
        <MenuSelect>
          <CheckBox 
            id="basic"
            name="맑은육수"
          />
          <CheckBox 
            id="spicy"
            name="얼큰육수"
          />
        </MenuSelect>
      </MenuWrapper>

      {/* 야채 */}
      <MenuWrapper>
        <SelectTitle>3. 야채 5가지를 선택해주세요.</SelectTitle>
        <MenuSelect>
          {vegitableList.map(vegi => 
            <CheckBox key={vegi.idx} id={vegi.idx} name={vegi.name} />
          )}
        </MenuSelect>
      </MenuWrapper>

      {/* 면 */}
      <MenuWrapper>
        <SelectTitle>4. 면을 선택해주세요.</SelectTitle>
        <MenuSelect>
          {noodleList.map(noodle => 
            <CheckBox key={noodle.idx} id={noodle.idx} name={noodle.name} />
          )}
        </MenuSelect>
      </MenuWrapper>
    </div>
  )
}

export const EatOut = () => {
  return (
    <div>
      <SelectTitle>가고싶은 곳을 선택해주세요</SelectTitle>
      <ul>
        {eatOutList.map(eat =>
          <MenuList key={eat.idx}>
            <div className="menu-list">
              <CheckBox id={eat.idx} name={`${eat.name} ${eat.type}`} />
            </div>
            <div className="info">
              <p className="desc">{eat.desc}</p>
              <div className="star-count">{eat.stars}</div>
            </div>
          </MenuList>
        )}
      </ul>
    </div>
  )
}

const MenuList = styled.li`
  margin-bottom: 1rem;
  font-size: 0.9rem;

  & .menu-list,
  & .info {
    display: flex;
    justify-content: space-between;
  }
`

export const SroovyMeal = () => {
  return (
    <div>
      <SelectTitle>원하는 정식 메뉴를 선택해주세요</SelectTitle>
      <ul>
        {mealList.map(meal =>
          <MenuList key={meal.idx}>
            <div className="menu-list">
              <CheckBox id={meal.idx} name={meal.name} />
              <div className="price">{meal.price}</div>
            </div>
            <p className="desc">{meal.desc}</p>
          </MenuList>
        )}
      </ul>
    </div>
  )
}
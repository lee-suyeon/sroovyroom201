import React from 'react';
import styled from 'styled-components';

import Checkbox from 'utils/CheckBox';
import { vegitableList, noodleList } from './menuList';

const MenuWrapper = styled.div`
  margin-bottom: 1rem;

  & .title {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.mainColor };
    margin-bottom: 1rem;
  }
`

const MenuSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 0.9rem;
`

export const ShabuShabu = () => {
  return (
    <div style={{ padding: "0.5rem" }}>
      {/* 샤브샤브 */}
      <MenuWrapper>
        <h4 className="title">1. 샤브샤브를 선택해주세요. </h4>
        <MenuSelect>
          <Checkbox 
            id="sukiyaki"
            name="스키야키"
          />
          <Checkbox 
            id="nabe"
            name="밀푀유나베"
          />
        </MenuSelect>
      </MenuWrapper>

      {/* 육수 */}
      <MenuWrapper>
        <h4 className="title">2. 육수를 선택해주세요.</h4>
        <MenuSelect>
          <Checkbox 
            id="basic"
            name="맑은육수"
          />
          <Checkbox 
            id="spicy"
            name="얼큰육수"
          />
        </MenuSelect>
      </MenuWrapper>

      {/* 야채 */}
      <MenuWrapper>
        <h4 className="title">3. 야채 5가지를 선택해주세요.</h4>
        <MenuSelect>
          {vegitableList.map(vegi => 
            <Checkbox key={vegi.idx} id={vegi.idx} name={vegi.name} />
          )}
        </MenuSelect>
      </MenuWrapper>

      {/* 면 */}
      <MenuWrapper>
        <h4 className="title">4. 면을 선택해주세요.</h4>
        <MenuSelect>
          {noodleList.map(vegi => 
            <Checkbox key={vegi.idx} id={vegi.idx} name={vegi.name} />
          )}
        </MenuSelect>
      </MenuWrapper>
    </div>
  )
}
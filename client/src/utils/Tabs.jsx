import React from 'react';
import styled from 'styled-components';

const StyledTabPanel = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.mainColor };
  border-right: none;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;

  &:last-child {
    border-right: 1px solid ${({ theme }) => theme.mainColor };
  }
`

const StyledTabs = styled.div`
  width: 100%;
  display: flex;
`

export const TabPanel = ({ title, children }) => {
  return (
    <div>
      <StyledTabPanel>{title}</StyledTabPanel>
      <div>
        {children}
      </div>
    </div>
  )
}

function Tabs({ children, defaultActiveKey, onChange }) {
  return (
    <StyledTabs>
      {children}
    </StyledTabs>
  )
}
export default Tabs;
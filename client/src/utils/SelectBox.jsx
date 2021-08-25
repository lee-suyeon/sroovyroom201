import React from 'react';
import styled from 'styled-components';

const StyledSelectBox = styled.div`
  margin-bottom: 2rem;
  width: ${props => `${props.size}%` || "100%"};

  label {
    display: block;
    color: ${({ theme }) => theme.mainColor };
    font-weight: 500;
    margin-bottom: 1.2rem;
  }

  select {
    width: 100%;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.mainColor };
    padding: 0.5rem;
    appearance: none;
  }

  select::placeholder {
    font-size: 0.825rem;
  }

  select:focus {
    outline: 1.5px solid ${({ theme }) => theme.mainColor };
  }

  .dropdown { position: relative; }

  .dropdown:after {
    content: '';
    position: absolute;
    top: 50%; right: 0.7rem;
    transform: translateY(-50%);
    width: 0px;
    height: 0px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid ${({ theme }) => theme.mainColor };
  }
`


const Selectbox = ({
  datas,
  id,
  onChange,
  disabled,
  value,
  showPlaceholder,
  placeholder,
  label,
  size,
  style
}) => {
  const dataList = (datas||[]).map((data) => {
    return (
      <option 
        key={data.idx} 
        value={data.idx}
      >
        {data.desc ? `${data.name} - ${data.desc}` : data.name}
      </option>
    );
  });

  return (
    <StyledSelectBox size={size}>
      <label>{label}</label>
      <div className="dropdown">
        <select
          className="selectbox"
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={style}
        >
          {showPlaceholder && (
            <option value={-1} hidden>
              {placeholder}
            </option>
          )}
          {dataList}
        </select>
      </div>
    </StyledSelectBox>
  );
};

export default Selectbox;
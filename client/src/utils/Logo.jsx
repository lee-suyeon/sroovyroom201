import React from 'react';
import styled, { css } from 'styled-components';

const sizes = {
  large: {
    width: '80px',
    height: '80px',
    fontSize: '1.6rem',
    marginBottom: '1.5rem',
  },
  medium: {
    width: '50px',
    height: '50px',
    fontSize: '1.25rem'
  },
  small: {
    width: '30px',
    height: '30px',
    fontSize: '1rem'
  },
}

const sizeStyle = css`
  ${({ size }) => css`
    width: ${sizes[size].width};
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
    margin-bottom: ${sizes[size].marginBottom};
  `}
`
const MainLogo = styled.div`
  position: relative;
  border-radius: 50%;
  font-weight: bold;
  color: #fff;
  background-color: ${props => props.theme.mainColor};

  /* size*/
  ${sizeStyle}

  &:after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 1.5px;
    height: 80%;
    background: #fff;
  }

  span {
    position: absolute;
  }

  .sroovy {
    ${props =>
      props.size === "large" &&
      css`
        top: 12px;
        left: 20px;
      `}
    ${props =>
      props.size === "medium" &&
      css`
        top: 0;
        left: 0;
      `}
    ${props =>
      props.size === "small" &&
      css`
        top: 0;
        left: 0;
      `}
    }
  }

  .room {
    ${props =>
      props.size === "large" &&
      css`
        right: 20px;
        bottom: 12px;
      `}
    ${props =>
      props.size === "medium" &&
      css`
        top: 0;
        left: 0;
      `}
    ${props =>
      props.size === "small" &&
      css`
        top: 0;
        left: 0;
      `}
    }
  }
`



function Logo({ size, ...rest }) {
  return (
    <MainLogo size={size} >
      <span className="sroovy" >S</span>
      <span className="room">R</span>
    </MainLogo>
  )
}

Logo.defaultProps = {
  size: 'medium'
};

export default Logo

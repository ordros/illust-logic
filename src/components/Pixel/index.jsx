import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const BlackCell = styled.div`
  background: black;
  width: 100%;
  height: 100%;
`;

const WhiteCell = styled.div`
  background: white;
  width: 100%;
  height: 100%;
`;

const CheckedCell = styled.div`
  background-image: linear-gradient(-45deg,
    transparent 49%,
    black 49%,
    black 51%,
    transparent 51%, 
    transparent),
  linear-gradient(45deg, /*角度*/
    transparent 49%,
    black 49%, /*斜線の色*/
    black 51%, /*斜線の色*/
    transparent 51%, 
    transparent);
  width: 100%;
  height: 100%;
`;

const Pixel = ({ status, x, y }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    switch(status) {
      case 'white':
        dispatch({ type: "SET", payload: { position:{ x, y }, cellState: 'black'} });
        return;
      case 'black':
        dispatch({ type: "SET", payload: { position:{ x, y }, cellState: 'checked'} });
        return;
      case 'checked':
      default:
        dispatch({ type: "SET", payload: { position:{ x, y }, cellState: 'white'} });
    }
  };

  const getCell = (status) => {
    switch(status) {
      case 'white':
        return <WhiteCell />;
      case 'black':
        return <BlackCell />;
      case 'checked':
      default:
        return <CheckedCell />;
    }
  }

  return (
    <Wrapper onClick={onClick}>
      {getCell(status)}
    </Wrapper>
  );
  
};

export default Pixel;

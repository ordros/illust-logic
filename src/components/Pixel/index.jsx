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
  background: white;
  background-image: linear-gradient(-45deg,
    transparent 48%,
    black 48%,
    black 52%,
    transparent 52%, 
    transparent),
  linear-gradient(45deg, /*角度*/
    transparent 48%,
    black 48%, /*斜線の色*/
    black 52%, /*斜線の色*/
    transparent 52%, 
    transparent);
  width: 100%;
  height: 100%;
`;

const Pixel = ({ status, x, y, mode }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    if (mode === 'fill') {
      dispatch({ type: 'SET_PIXEL', payload: { position: { x, y }, cellState: 'white' } });
      return;
    }
    switch(status) {
      case 'white':
        dispatch({ type: "SET_PIXEL", payload: { position:{ x, y }, cellState: 'black'} });
        return;
      case 'black':
        dispatch({ type: "SET_PIXEL", payload: { position:{ x, y }, cellState: 'checked'} });
        return;
      case 'checked':
      default:
        dispatch({ type: "SET_PIXEL", payload: { position:{ x, y }, cellState: 'white'} });
    }
  };
  const onMouseHover = () => {
    if (mode === 'click') {
      return;
    }
    dispatch({ type: "SET_PIXEL", payload: { position:{ x, y }, cellState: 'black'} });
    return;
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
    <Wrapper onClick={onClick} onMouseEnter={onMouseHover}>
      {getCell(status)}
    </Wrapper>
  );
  
};

export default Pixel;

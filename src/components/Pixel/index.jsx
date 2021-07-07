import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid black;
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

const Pixel = ({ status, x, y, onClickPixel }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    let cellState = '';
    switch(status) {
      case 'white':
        cellState = 'black';
        break;
      case 'black':
        cellState = 'checked';
        break;
      case 'checked':
      default:
        cellState = 'white';
    }
    dispatch({ type: "SET_PIXEL", payload: { position:{ x, y }, cellState } });
    
    onClickPixel();
  };
  const onMouseHover = (e) => {
    // hover時に左クリックしていないなら何もしない
    if (e.buttons !== 1 ) {
      return;
    }
    dispatch({ type: "SET_PIXEL", payload: { position:{ x, y }, cellState: 'black'} });
    
    onClickPixel();
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

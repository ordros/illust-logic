import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import createHintsFromBoard from "../../utils/createHintsFromBoard";
import getHintsFromString from "../../utils/getHintsFromString";
import PixelTable from "../PixelTable";
import querystring from 'querystring';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Message = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: red;
`;

const SolveQuestionPage = () => {
  const { size, table, hints } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  const [solved, setSolved] = useState(false);
  const [hintValue, setHintValue] = useState(null);

  const setInitalData = () => {
    const initSize = 10;
    dispatch({ type: 'SET_MODE', payload: { mode: 'solve' }});
    if (!location.search) {
      dispatch({ type: "INIT", payload: { size: { x: initSize, y: initSize }}});
      dispatch({ type: 'SET_HINTS', payload: { xHints: Array.from({length: initSize}), yHints: Array.from({length: initSize}) } });
      return;
    }
    const hint = querystring.parse(location.search).hint;
    if (!hint) {
      return;
    }
    const {
      sizeX,
      sizeY,
      hintsX,
      hintsY,
    } = getHintsFromString(hint);

    dispatch({ type: "INIT", payload: { size: { x: sizeX, y: sizeY }}});
    dispatch({ type: 'SET_HINTS', payload: { xHints: hintsX, yHints: hintsY } });
  }

  const deepEqual = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1[0].length; j++) {
        if (arr1[i][j] != arr2[i][j]) {
          return false;
        }
      }
    }
    return true;
  };
 
  const createHintStatus = (hints, currentHints) => {
    const hintStatus = [];
    for (let i = 0; i < hints.length; i++) {
      const line = [];
      for (let j = 0; j < hints[0].length; j++) {
        line.push(hints[i][j] === currentHints[i][j]);
      }
      hintStatus.push(line);
    }
    return hintStatus;
  };

  const checkSolved = () => {
    const current = createHintsFromBoard(table);
    
    if(deepEqual(current.xHints, hints.x) && deepEqual(current.yHints, hints.y)) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }

  const checkHintStatus = () => {
    const current = createHintsFromBoard(table);
    const xHintStatus = createHintStatus(hints.x, current.xHints);
    const yHintStatus = createHintStatus(hints.y, current.yHints);

    dispatch({ type: 'SET_HINTS_STATUS', payload: { xHintStatus, yHintStatus }});
  };

  const onChangeHint = (e) => {
    if (!e.target.value) {
      return;
    }
    setHintValue(e.target.value);
  };

  const onClickPixel = () => {
    checkHintStatus();
    checkSolved();
  };

  const onSetHint = () => {
    const {
      sizeX,
      sizeY,
      hintsX,
      hintsY,
    } = getHintsFromString(hintValue);

    dispatch({ type: "INIT", payload: { size: { x: sizeX, y: sizeY }}});
    dispatch({ type: 'SET_HINTS', payload: { xHints: hintsX, yHints: hintsY } });
  };

  useEffect(() => {
    setInitalData();
  }, []);

  return (
    <Wrapper>
      <PixelTable size={size} table={table} hints={hints} mode='solve' onClickPixel={onClickPixel}/>
      {/* <input onChange={onChangeHint} />
      <button onClick={onSetHint}>Set</button> */}
      <Message>{solved && 'Solved!'}</Message>
    </Wrapper>
  );
};

export default SolveQuestionPage;
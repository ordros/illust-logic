import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import createHintsFromBoard from "../../utils/createHintsFromBoard";
import createStringFromHint from "../../utils/createStringFromHint";
import getHintsFromString from "../../utils/getHintsFromString";
import PixelTable from "../PixelTable";


const SolveQuestionPage = () => {
  const { size, table, hints } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  const [solved, setSolved] = useState(false);

  const setInitalData = () => {
    const initSize = 10;
    if (!location.search) {
      dispatch({ type: "INIT", payload: { size: { x: initSize, y: initSize }}});
      dispatch({ type: 'SET_HINTS', payload: { xHints: Array.from({length: initSize}), yHints: Array.from({length: initSize}) } });
      return;
    }
    const hint = location.search.replace('?hint=', '');
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
 
  const checkSolved = () => {
    const current = createHintsFromBoard(table);
    
    if(deepEqual(current.xHints, hints.x) && deepEqual(current.yHints, hints.y)) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }

  useEffect(() => {
    if (!table) {
      setInitalData();
    }
  });

  return (
    <>
      <PixelTable size={size} table={table} hints={hints} onClickPixel={checkSolved}/>
      {solved && 'Solved!'}
    </>
  );
};

export default SolveQuestionPage;
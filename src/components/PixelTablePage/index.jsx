import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import createHintsFromBoard from "../../utils/createHintsFromBoard";
import createStringFromHint from "../../utils/createStringFromHint";
import getHintsFromString from "../../utils/getHintsFromString";
import Table from "../Table";

const Wrapper = styled.div`
  display: flex;
`;

const PixelTablePage = () => {
  const { size, table, hints, mode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();

  const createStringHints = () => {
    const xStringHint = createStringFromHint(hints.x);
    const yStringHint = createStringFromHint(hints.y);
    const hintString = `${size.x}/${size.y}/${xStringHint}/${yStringHint}`;
    console.log(hintString);
  };

  const TestButton = styled.button`
    
  `;

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

  const createHints = () => {
    const { xHints, yHints } = createHintsFromBoard(table);
    dispatch({ type: 'SET_HINTS', payload: { xHints, yHints } })
  };

  const changeMode = () => {
    switch (mode) {
      case 'fill':
        dispatch({ type: 'SET_MODE', payload: { mode: 'click' }});
        return;
      case 'click':
        dispatch({ type: 'SET_MODE', payload: { mode: 'fill' }});
        return;
    }
  }
  useEffect(() => {
    if (!table) {
      setInitalData();
    }
  });

  return (
    <Wrapper>
      {table && hints && (
        <>
          <Table size={size.x} xHints={hints.x} yHints={hints.y} />
          <button onClick={createHints}>create hints</button>
          <button onClick={createStringHints}>create string hints</button>
          <button onClick={changeMode}>change mode</button>
        </>
      )}
    </Wrapper>
  );
};

export default PixelTablePage;

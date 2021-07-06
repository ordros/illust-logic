import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import createHintsFromBoard from "../../utils/createHintsFromBoard";
import createStringFromHint from "../../utils/createStringFromHint";
import getHintsFromString from "../../utils/getHintsFromString";
import PixelTable from "../PixelTable";

const Wrapper = styled.div`
  display: flex;
`;

const PixelTablePage = () => {
  const { table, hints, mode } = useSelector((state) => state);
  const dispatch = useDispatch();
  const size = 15;

  const location = useLocation();

  const createStringHints = () => {
    const xStringHint = createStringFromHint(hints.x);
    const yStringHint = createStringFromHint(hints.y);
    const hintString = `${size}/${size}/${xStringHint}/${yStringHint}`;
    console.log(hintString);
  };

  const TestButton = styled.button`
    
  `;

  const setInitalData = () => {
    if (!location.search) {
      dispatch({ type: "INIT", payload: { size: { x: size, y: size }}});
      dispatch({ type: 'SET_HINTS', payload: { xHints: Array.from({length: size}), yHints: Array.from({length: size}) } });
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
      <PixelTable size={size} />
      <button onClick={createHints}>create hints</button>
      <button onClick={createStringHints}>create string hints</button>
      <button onClick={changeMode}>change mode</button>
    </Wrapper>
  );
};

export default PixelTablePage;

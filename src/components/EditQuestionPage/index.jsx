import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import createHintsFromBoard from "../../utils/createHintsFromBoard";
import createStringFromHint from "../../utils/createStringFromHint";
import PixelTable from "../PixelTable";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
`

const EditQuestionPage = () => {
  const { size, table, hints } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [questionUrl, setQuestionUrl] = useState('');

  const setInitalData = () => {
    const initSize = 10;
    dispatch({ type: "INIT", payload: { size: { x: initSize, y: initSize }}});
    dispatch({ type: 'SET_HINTS', payload: { xHints: Array.from({length: initSize}), yHints: Array.from({length: initSize}) } });
    dispatch({ type: 'SET_MODE', payload: { mode: 'create' }});
  }

  const createStringHints = () => {
    const xStringHint = createStringFromHint(hints.x);
    const yStringHint = createStringFromHint(hints.y);
    const hintString = `${size.x}_${size.y}_${xStringHint}_${yStringHint}`;

    setQuestionUrl(`/solve?type=solve&hint=${hintString}`);
  };

  const setTableSize = (size) => {
    if (!isNaN(size)) {
      const numSize = parseInt(size);
      if (numSize > 0 && numSize <= 20) {
        dispatch({ type: 'INIT', payload: { size: { x: numSize, y: numSize }}});
        dispatch({ type: 'SET_HINTS', payload: { xHints: Array.from({length: numSize}), yHints: Array.from({length: numSize}) } }); 
      }
    }
  };
  
  const createHints = () => {
    const { xHints, yHints } = createHintsFromBoard(table);
    dispatch({ type: 'SET_HINTS', payload: { xHints, yHints } })
  };

  useEffect(() => {
    if (!table) {
      setInitalData();
    }
  });

  useEffect(() => {
    if (hints && hints.x && hints.y) {
      createStringHints();
    }
  }, [hints]);

  return (
    <Wrapper>
      <PixelTable size={size} table={table} hints={hints} mode='create' onClickPixel={createHints}/>
      <Message>
        table size(max size is 20): <input type="text" onChange={(e) => setTableSize(e.target.value)} max={30}/>
      </Message>
      <Message>
        Let's solve: <a href={questionUrl} target="_blank">{questionUrl && 'here'}</a>
      </Message>
      <button onClick={setInitalData}>Reset!</button>
    </Wrapper>
  );
};

export default EditQuestionPage;
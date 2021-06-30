import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import createHintsFromBoard from "../../utils/createHIntsFromBoard";
import PixelTable from "../PixelTable";

const PixelTablePage = () => {
  const { table } = useSelector((state) => state);
  const dispatch = useDispatch();
  const size = 10;
  const createHints = () => {
    const { xHints, yHints } = createHintsFromBoard(table);
    dispatch({ type: 'SET_HINTS', payload: { xHints, yHints } })
  };
  useEffect(() => {
    if (!table) {
      dispatch({ type: "INIT", payload: { size: { x: size, y: size }}});
      dispatch({ type: 'SET_HINTS', payload: { xHints: Array.from({length: size}), yHints: Array.from({length: size}) } });
    }
  });

  return (
    <>
      <PixelTable size={size} />
      <button onClick={createHints}>create hints</button>
    </>
  );
};

export default PixelTablePage;

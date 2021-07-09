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
  padding: 40px;
`;

const PixelTable = ({ size, table, hints, onClickPixel }) => {
  return (
    <Wrapper>
      {table && hints && (
        <>
          <Table size={size.x} table={table} xHints={hints.x} yHints={hints.y} onClickPixel={onClickPixel}/>
        </>
      )}
    </Wrapper>
  );
};

export default PixelTable;

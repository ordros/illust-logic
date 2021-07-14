import styled from "styled-components";
import Table from "../Table";

const Wrapper = styled.div`
  display: flex;
  padding: 40px;
`;

const PixelTable = ({ size, table, hints, mode, onClickPixel }) => {
  return (
    <Wrapper>
      {table && hints && (
        <>
          <Table size={size.x} table={table} xHints={hints.x} yHints={hints.y} hints={hints} mode={mode} onClickPixel={onClickPixel}/>
        </>
      )}
    </Wrapper>
  );
};

export default PixelTable;

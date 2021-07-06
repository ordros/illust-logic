import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Pixel from '../Pixel';

const Cell = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #999;
`;

const StyledTable = styled.table`
  width: 50px;
  height: 50px;
  
  border: 1px solid black;
  border-spacing: 0;
  border-collapse: collapse;
  td {
   padding: 0;
   margin: 0;
  }
`;

const Index = styled.th`
  font-size: 4px;
`;

const Table = ({size, xHints, yHints}) => {
  const { table, mode } = useSelector((state) => state);
  const getIndexArray = (s) => s ? Array.from({length: s}, (_, index) => index) : [];
  const array = getIndexArray(size);
  
  const xHintMaxLength = xHints && xHints.reduce((a,b) => Math.max(a.length || a, b.length || b));
  const yHintMaxLength = yHints && yHints.reduce((a,b) => Math.max(a.length || a, b.length || b));
  const maxHintsLength = Math.max(xHintMaxLength, yHintMaxLength);
  
  return (
    <StyledTable cellSpacing='0'>
      <thead>
        <tr>
          {getIndexArray(xHintMaxLength).map((v) => <th key={v}></th>)}
          {array.map((v) => <Index key={v}>{v}</Index>)}
        </tr>
      </thead>
      <tbody>
       {
          getIndexArray(maxHintsLength).map((yHintX) => {
            return (
              <tr key={yHintX}>
                {getIndexArray(xHintMaxLength).map((v) => <td key={v}><Cell /></td>)}
                {getIndexArray(size).map((yHinty) => <td key={yHinty}><Cell>{yHints[yHinty][yHintX] || ''}</Cell></td>)}
              </tr>
            );
          })
        }
        {array.map((x) => {
          return (
            <tr key={x}>
              {
                getIndexArray(xHintMaxLength).map((xHintx) => {
                  return (
                    <td key={xHintx}>
                      <Cell isTop={x === 0}>
                        {xHints[x][xHintx] || ''}
                      </Cell>
                    </td>
                  );
                })
              }
              {array.map((y) => {
                return (
                  <td key={y}>
                    <Cell>
                      <Pixel x={x} y={y} status={table && table[x][y]} mode={mode}/>
                    </Cell>
                  </td>
                );
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
};

export default Table;
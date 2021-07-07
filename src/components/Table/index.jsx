import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import createHintsFromBoard from '../../utils/createHintsFromBoard';
import Pixel from '../Pixel';

const Cell = styled.div`
  width: 40px;
  height: 40px;
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
  
  // border: 1px solid black;
  border-spacing: 0;
  border-collapse: collapse;
  td {
   padding: 0;
   margin: 0;
  }
`;

const FrameBorder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-collapse: collapse;
`;

const Index = styled.th`
  font-size: 16px;
  font-weight: bold;
`;

const Spacer = styled.div`
  width: 20px;
  height: 20px;
`;

const Table = ({size, table, xHints, yHints, onClickPixel}) => {
  const getIndexArray = (s) => s ? Array.from({length: s}, (_, index) => index) : [];
  const array = getIndexArray(size);
  
  const xHintMaxLength = xHints && xHints.reduce((a,b) => Math.max(a.length || a, b.length || b));
  const yHintMaxLength = yHints && yHints.reduce((a,b) => Math.max(a.length || a, b.length || b));
  const maxHintsLength = Math.max(xHintMaxLength, yHintMaxLength);

  return (
    <StyledTable cellSpacing='0'>
      <thead>
        <tr>
          <Index><Spacer/></Index>
          {getIndexArray(xHintMaxLength).map((v) => <th key={v}></th>)}
          {array.map((v) => <Index key={v}>{v}</Index>)}
        </tr>
      </thead>
      <tbody>
       {
          getIndexArray(maxHintsLength).map((yHintX) => {
            return (
              <tr key={yHintX}>
                <Index as="td" />
                {getIndexArray(xHintMaxLength).map((v) => <td key={v}>{<Cell><FrameBorder/></Cell> }</td>)}
                {getIndexArray(size).map((yHinty) => <td key={yHinty}><Cell><FrameBorder>{yHints[yHinty][yHintX] || ''}</FrameBorder></Cell></td>)}
              </tr>
            );
          })
        }
        {array.map((x) => {
          return (
            <tr key={x}>
              <Index as="td" key={x}>{x}</Index>
              {
                getIndexArray(xHintMaxLength).map((xHintx) => {
                  return (
                    <td key={xHintx}>
                      <Cell><FrameBorder>{xHints[x][xHintx] || ''}</FrameBorder></Cell>
                    </td>
                  );
                })
              }
              {array.map((y) => {
                return (
                  <td key={y}>
                    <Cell>
                      <Pixel x={x} y={y} status={table && table[x][y]} onClickPixel={onClickPixel}/>
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
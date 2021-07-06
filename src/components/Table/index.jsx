import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
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
  
  border: 1px solid black;
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

const Table = ({size, xHints, yHints}) => {
  const { table, mode } = useSelector((state) => state);
  const getIndexArray = (s) => s ? Array.from({length: s}, (_, index) => index) : [];
  const array = getIndexArray(size);
  
  const xHintMaxLength = xHints && xHints.reduce((a,b) => Math.max(a.length || a, b.length || b));
  const yHintMaxLength = yHints && yHints.reduce((a,b) => Math.max(a.length || a, b.length || b));
  const maxHintsLength = Math.max(xHintMaxLength, yHintMaxLength);
  
  const getFrame = (number) => { return <Cell><FrameBorder>{number}</FrameBorder></Cell> };
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
                {getIndexArray(xHintMaxLength).map((v) => <td key={v}>{getFrame()}</td>)}
                {getIndexArray(size).map((yHinty) => <td key={yHinty}>{getFrame(yHints[yHinty][yHintX] || '')}</td>)}
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
                      {getFrame(xHints[x][xHintx] || '')}
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
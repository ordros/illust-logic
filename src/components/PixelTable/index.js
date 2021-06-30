import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../Table';

const PixelTable = (({ size }) => {
  const { x: xHints, y: yHints } = useSelector((state) => state.hints);
  return <Table size={size} xHints={xHints} yHints={yHints} />
});

export default PixelTable;
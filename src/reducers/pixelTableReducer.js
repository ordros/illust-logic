const initialState = {
  table: [],
};

const pixelTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT': {
      const { size: { x, y } } = action.payload;
      return {
        table: Array.from({length: x}).map((v) => Array.from({length: y}).map(() => 'white'))
      };
    }
    case 'SET': {
      const { position: { x, y }, cellState } = action.payload;
      const newTable = state.table;
      newTable[x][y] = cellState;
      return { ...state, table: newTable };
    }
    default:
      return state;
  }
};

export default pixelTableReducer;
const initialState = {
  size: null,
  table: null,
  hints: { x: null, y: null, xStatus: null, yStatus: null },
  mode: 'create',
};

const pixelTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT': {
      const { size: { x, y } } = action.payload;
      return {
        size: { x, y },
        table: Array.from({length: x}).map((v) => Array.from({length: y}).map(() => 'white')),
        mode: 'create',
      };
    }
    case 'SET_PIXEL': {
      const { position: { x, y }, cellState } = action.payload;
      const newTable = state.table;
      newTable[x][y] = cellState;
      return { ...state, table: newTable };
    }
    case 'SET_HINTS': {
      const { xHints, yHints } = action.payload;
      return {
        ...state,
        hints: {
          ...state.hints,
          x: xHints.map((hint) => (hint || []).concat(Array.from({length: Math.ceil(state.size.y / 2) - (hint ? hint.length : 0) }))),
          y: yHints.map((hint) => (hint || []).concat(Array.from({length: Math.ceil(state.size.x / 2) - (hint ? hint.length : 0) }))),
        },
      };
    }
    case 'SET_HINTS_STATUS': {
      const { xHintStatus, yHintStatus } = action.payload;
      return {
        ...state,
        hints: {
          ...state.hints,
          xStatus: xHintStatus,
          yStatus: yHintStatus,
        },
      }
    }
    case 'SET_MODE': {
      const { mode } = action.payload;
      return {
        ...state,
        mode,
      }
    }
    default:
      return state;
  }
};

export default pixelTableReducer;
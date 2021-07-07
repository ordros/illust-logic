const createHintFromLine = (line) => {
  const hints = [];
  // const binaryline = 
  let cnt = 0;
  line.push("padding");
  line.map((c) => c === 'black' ? "1" : "0").forEach((c, index) => {
    if (c === "1") {
      cnt++;
    } else {
      if (cnt > 0) {
        hints.push(cnt);  
        cnt = 0;
      }
    }
  });
  line.pop();
  return hints.concat(Array.from({length: (line.length/2) - hints.length}));
};

const createHintsFromBoard = (table) => {
  if (!table) {
    return { xHints: null, yHints: null };
  }

  const yLines = []; 
  for (let y = 0; y < table[0].length; y++) {
    const line = Array.from({length: table.length}).map((_, index) => index)
      .map((x) => table[x][y])
    yLines.push(line);
  }
  return {
    xHints: table.map((line) => createHintFromLine(line)),
    yHints: yLines.map((line) => createHintFromLine(line)),
  };
};

export default createHintsFromBoard;

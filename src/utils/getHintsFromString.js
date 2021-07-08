import zlib from 'zlib';

const getHintFromString = (strHint, size) => {
  const deflated = Buffer.from(strHint, 'base64');
  const hintFlatted = JSON.parse(zlib.inflateRawSync(deflated).toString()).map((v) => v === 0 ? null : v);

  const hints = [];
  for (let i = 0; i < size; i++) {
    const start = Math.ceil(size / 2) * i;
    const end = Math.ceil(size / 2) * (i + 1);
    hints.push(hintFlatted.slice(start, end));
  }
  return hints;
}

const getHintsFromString = (str) => {
  const arr = str.split('/');
  const sizeX = parseInt(arr[0]);
  const sizeY = parseInt(arr[1]);
  const hintsX = getHintFromString(arr[2], sizeX);
  const hintsY = getHintFromString(arr[3], sizeY);
  
  return {
    sizeX,
    sizeY,
    hintsX,
    hintsY,
  };
};

export default getHintsFromString;
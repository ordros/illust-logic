import zlib from 'zlib';

const getHintFromString = (strHint) => {
  const deflated = Buffer.from(strHint, 'base64');
  const hint = zlib.inflateRawSync(deflated).toString();
  return JSON.parse(hint);
}

const getHintsFromString = (str) => {
  const arr = str.split('/');
  const sizeX = parseInt(arr[0]);
  const sizeY = parseInt(arr[1]);
  const hintsX = getHintFromString(arr[2]);
  const hintsY = getHintFromString(arr[3]);
  
  return {
    sizeX,
    sizeY,
    hintsX,
    hintsY,
  };
};

export default getHintsFromString;
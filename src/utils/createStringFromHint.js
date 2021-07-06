import zlib from 'zlib';

// めんどくさいので1つのヒントの最大値は16までとして簡易実装する
const createStringFromHint = (hint) => {
  const buf = Buffer.from(JSON.stringify(hint));
  const deflated = zlib.deflateRawSync(buf);
  const base64string = deflated.toString('base64');
  return base64string;
};

export default createStringFromHint;

import zlib from 'zlib';

const createStringFromHint = (hint) => {
  const text = encodeURI(JSON.stringify(hint.flat().map((v) => !v ? 0 : v)));
  const buf = Buffer.from(text);
  const deflated = zlib.deflateRawSync(buf);
  const base64string = deflated.toString('base64');
  return base64string;
};

export default createStringFromHint;

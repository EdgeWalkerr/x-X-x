// Definitions
// ====================
import fs from 'fs';
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
});

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const parseJSON = (contents) => tryCatch(() => JSON.parse(contents));

const readFileSync = (path) => tryCatch(() => fs.readFileSync(path));

const getPort = () =>
  readFileSync('config.json')
    .chain(parseJSON)
    .map((config) => config.port)
    .fold(
      (x) => 2000,
      (x) => x
    );

console.log(getPort());

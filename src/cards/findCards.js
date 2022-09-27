import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = path.resolve();

const findCards = async (cards) => {
  const data = await fs.readFile(path.resolve(__dirname, 'src/cards/resultWithStats.json'));
  const parseData = JSON.parse(data);
  const result = cards.map((id) => parseData[id - 1]);
  return result;
};

export default findCards;

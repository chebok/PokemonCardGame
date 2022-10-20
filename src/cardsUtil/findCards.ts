import fs from 'node:fs/promises';
import path from 'node:path';

// const __dirname = path.resolve();   Это необходимо при компиляции в ES Modules

const findCards = async (cards: number[]) => {
  const data = await fs.readFile(path.resolve(__dirname, 'resultWithStats.json'));
  const parseData = JSON.parse(data.toString());
  const result = cards.map((id) => parseData[id - 1]);
  return result;
};

export default findCards;

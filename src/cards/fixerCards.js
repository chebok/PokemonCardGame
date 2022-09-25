import fs from 'node:fs/promises';
import statsRandomizer from './randomizer.js';

const fixer = async () => {
  const data = await fs.readFile('./result.json');
  const result = JSON.parse(data);
  const newResult = result.map((pokemon) => {
    return {
      ...pokemon,
      ...statsRandomizer(),
    }
  });
  await fs.writeFile('./resultWithStats.json', JSON.stringify(newResult));
};

fixer();

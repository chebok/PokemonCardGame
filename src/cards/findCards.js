import fs from 'node:fs/promises';

const cardNumbers = [1, 46, 79];

const finder = async (cards) => {
  const data = await fs.readFile('./resultWithStats.json');
  const parseData = JSON.parse(data);
  const result = cards.map((id) => parseData[id - 1]);
  console.log(result);
  return result;
};

finder(cardNumbers);

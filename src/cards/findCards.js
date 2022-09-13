const fs = require('node:fs/promises');

const cardNumbers = [5, 51, 99];

const finder = async (cards) => {
  const data = await fs.readFile('./result.json');
  const parseData = JSON.parse(data);
  const result = cards.map((id) => parseData[id - 1]);
  console.log(result);
  return result;
};

finder(cardNumbers);

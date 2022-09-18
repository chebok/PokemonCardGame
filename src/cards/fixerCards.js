const fs = require('node:fs/promises');

const fixer = async () => {
  const data = await fs.readFile('./result.json');
  const result = JSON.parse(data);
  // Тут что-то делать с базой
  await fs.writeFile('./result.json', JSON.stringify(result));
};

fixer();

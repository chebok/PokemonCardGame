import result from './result.json';

const cardsDeckId = [1, 13, 151];
const cardsCollectionId = [1, 2, 3, 13, 56, 151];

findCards(result, cardsDeckId);

export default async function findCards (result, cardsId) {
  const parseData = JSON.parse(result);
  const resultData = cardsId.map((id) => parseData[id - 1]);
  console.log(resultData);
  return resultData;
};

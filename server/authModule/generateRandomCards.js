const generateRandomCards = () => {
  const result = [];
  do {
    const card = Math.floor(Math.random() * 151) + 1;
    if (card !== result.at(-1)) {
      result.push(card.toString());
    }
  } while (result.length !== 3);
  return result;
};

export default generateRandomCards;

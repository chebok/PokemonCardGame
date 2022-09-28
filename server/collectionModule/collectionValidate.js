const collectionValidate = (collection, cardsToAdd) => {
  const existing = cardsToAdd.every((card) => card >= 1 && card <= 151);
  if (!existing) {
    return 'Покемонов под такими номерами нет';
  }
  collection.cards = [...new Set([...collection.cards, ...cardsToAdd.map(Number)])]
    .sort((a, b) => a - b);
};

export default collectionValidate;

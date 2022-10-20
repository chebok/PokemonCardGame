import { IDeckModel } from "./deck.model";

const tryUpdateDeck = (collection: any, deck: IDeckModel, deckToUpdate: number[]) => {
  const updating = [...new Set(deckToUpdate)].length === 3;
  if (!updating) {
    return 'Для обновления колоды необходимо 3 покемона';
  }
  const existing = deckToUpdate.every((card) => card >= 1 && card <= 151);
  if (!existing) {
    return 'Покемонов под такими номерами нет';
  }
  const available = deckToUpdate.every((card) => collection.cards.includes(card));
  if (!available) {
    return 'Покемоны недоступны этому игроку';
  }
  deck.cards = deckToUpdate;
};

export default tryUpdateDeck;

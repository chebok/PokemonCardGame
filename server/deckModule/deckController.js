import Deck from '../models/Deck.js';
import Collection from '../models/Collection.js';
import deckValidate from './deckValidate.js';
import findCards from '../../src/cards/findCards.js';
import generateRandomCards from '../authModule/generateRandomCards.js';

class DeckController {
  async updateDeck(req, res) {
    try {
      const { deckToUpdate } = req.body;
      const { userId } = req.params;
      const deck = await Deck.findOne({ userId });
      const collection = await Collection.findOne({ userId });
      const errors = deckValidate(collection, deck, deckToUpdate);
      if (errors) {
        res.json(errors);
        return;
      }
      await deck.save();
      res.json(deck);
    } catch (error) {
      console.log(error);
    }
  }

  async getDeck(req, res) {
    try {
      const { userId } = req.params;
      const deck = await Deck.findOne({ userId });
      const cardsToSend = await findCards(deck.cards);
      res.json(cardsToSend);
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomDeck(req, res) {
    try {
      const cards = generateRandomCards();
      const cardsToSend = await findCards(cards);
      res.json(cardsToSend);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DeckController();

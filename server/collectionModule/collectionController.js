import Collection from '../models/Collection.js';
import collectionValidate from './collectionValidate.js';
import findCards from '../../src/cards/findCards.js';

class CollectionController {
  async updateCollection(req, res) {
    try {
      const { cardsToAdd } = req.body;
      const { userId } = req.params;
      const collection = await Collection.findOne({ userId });
      const errors = collectionValidate(collection, cardsToAdd);
      if (errors) {
        res.json(errors);
        return;
      }
      await collection.save();
      res.json(collection);
    } catch (error) {
      console.log(error);
    }
  }

  async getCollection(req, res) {
    try {
      const { userId } = req.params;
      const collection = await Collection.findOne({ userId });
      const cardsToSend = await findCards(collection.cards);
      res.json(cardsToSend);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CollectionController();

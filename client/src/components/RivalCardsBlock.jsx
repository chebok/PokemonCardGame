import RivalCard from './RivalCard';
import mockDeck from '../mock/mock.deck';

export default function RivalCardsBlock() {
  return (
    <div className='playerCardsContainer'>
      {mockDeck.map((card) =>
        <RivalCard sprite={card.sprite}/>
      )}
    </div>
  )
}

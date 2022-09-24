import PlayerCard from './PlayerCard';
import mockDeck from '../mock/mock.deck';

export default function PlayerCardsBlock() {
  return (
    <div className='playerCardsContainer'>
      {mockDeck.map((card) =>
        <PlayerCard spriteBack={card.spriteBack}/>
      )}
    </div>
  )
}


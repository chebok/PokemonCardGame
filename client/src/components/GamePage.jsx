import PlayerCardsBlock from "./PlayerCardsBlock";
import RivalCardsBlock from "./RivalCardsBlock";

export default function GamePage() {
  return (
    <div  className='gamePageContainer'>
      <RivalCardsBlock />
      <h1>Fight!</h1>
      <PlayerCardsBlock />
    </div>
  )
};

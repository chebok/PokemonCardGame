import { Space } from 'antd';
import PokeCard from './PokeCard';

const CardsDeck = ({ mockDeck }) => (
  <div style={{ background: '#ECECEC', padding: '15px 30px' }}>
    <Space size={[8, 16]} wrap>
      {mockDeck.map(pokemon =>
        <PokeCard
          image={pokemon.image}
          name={pokemon.name}
          legend={pokemon.legend}
          key={pokemon.id}
          isDeck={true}
        />
      )}
    </Space>
  </div>
);

export default CardsDeck;

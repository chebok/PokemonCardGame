import { Space } from 'antd';
import PokeCard from './PokeCard';

const CardsCollection = ({ mockPokemons }) => (
  <div style={{ background: '#ECECEC', padding: '15px 30px' }}>
    <Space size={[8, 16]} wrap>
      {mockPokemons.map(pokemon =>
          <PokeCard
            image={pokemon.image}
            name={pokemon.name}
            legend={pokemon.legend}
            key={pokemon.id}
            isDeck={false}
          />
      )}
    </Space>
  </div>
);

export default CardsCollection;

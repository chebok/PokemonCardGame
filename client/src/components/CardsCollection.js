import { Card } from 'antd';
import mockPokemons from '../mock/mock.pokemons';
import PokeCard from './PokeCard';
import a001 from '../mock/images/a001.png'

const gridStyle = {
  width: '33%',
  textAlign: 'center',
};

const CardsCollection = () => (
  <Card title="Pokemons Collection">
    {mockPokemons && (
      mockPokemons.map(pokemon => <Card.Grid style={gridStyle}>{
        <PokeCard
          image={a001}
          name={pokemon.name}
          legend={pokemon.legend}
        />
      }</Card.Grid>)
    )}
  </Card>
);

export default CardsCollection;

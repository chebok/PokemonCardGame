const Pokemon = {
  moveStatus: 'ready',
};

const callback = (pok, time) => {
  console.log(pok.moveStatus, `Шкала заполнена на ${time}%`);
}

const waitTimer = (pokemon, cb1 = () => {}, cb2 = () => {}) => {
  pokemon.moveStatus = 'wait';
  let line = 0;
  const step = () => {
    line += 10;
    cb2(pokemon, line);
  };
  const intervalId = setInterval(step, 1000);
  const f = () => {
    pokemon.moveStatus = 'ready';
    clearInterval(intervalId);
    cb1(pokemon, 100);
  };
  setTimeout(f, (10000 * 10) / pokemon.speed);
};

module.exports = waitTimer;

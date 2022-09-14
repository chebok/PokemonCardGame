const Pokemon = {
  turn: 'ready',
};

const callback = (pok, time) => {
  console.log(pok.turn, `Шкала заполнена на ${time}%`);
}

const startTimer = (pokemon, totalTime, cb) => {
  pokemon.turn = 'wait';
  let line = 0;
  const step = () => {
    line += 10;
    cb(pokemon, line);
  };
  const intervalId = setInterval(step, 1000);
  const f = () => {
    pokemon.turn = 'ready';
    clearInterval(intervalId);
    cb(pokemon, 100);
  };
  setTimeout(f, totalTime);
};

startTimer(Pokemon, 10000, callback);

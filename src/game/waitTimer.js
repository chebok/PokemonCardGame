const Pokemon = {
  turn: 'ready',
};

const callback = (pok, time) => {
  console.log(pok.turn, time);
}

const startTimer = (pokemon, totalTime, cb) => {
  pokemon.turn = 'wait';
  let elapsedTime = 0;
  const step = () => {
    elapsedTime += 100;
    cb(pokemon, elapsedTime);
  };
  const intervalId = setInterval(step, 100);
  const f = () => {
    pokemon.turn = 'ready';
    clearInterval(intervalId);
    cb(pokemon, totalTime);
  };
  setTimeout(f, totalTime);
};

startTimer(Pokemon, 1000, callback);

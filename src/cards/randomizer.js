const statsRandomizer = () => {
  const dps = Math.floor(Math.random() * 7) + 9;
  const health = 60 - dps * 2;
  const speed = Math.floor(Math.random() * 6) + 5;
  const damage = Math.round((dps * 6) / speed);
  return {
    health,
    speed,
    damage,
  };
};
statsRandomizer();

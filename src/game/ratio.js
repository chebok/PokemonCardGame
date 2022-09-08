const mappingElements = {
  water: {
    water: 1,
    fire: 1.5,
    air: 1,
    earth: 0.5,
  },
  fire: {
    water: 0.5,
    fire: 1,
    air: 1.5,
    earth: 1,
  },
  earth: {
    water: 1.5,
    fire: 1,
    air: 0.5,
    earth: 1,
  },
  air: {
    water: 1,
    fire: 0.5,
    air: 1,
    earth: 1.5,
  },
};

const ratio = (elem1, elem2) => mappingElements[elem1][elem2];

module.exports = ratio;

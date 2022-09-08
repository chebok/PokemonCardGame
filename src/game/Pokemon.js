const ratio = require('./ratio');

class Pokemon {
  constructor(name, element, health, damage) {
    this.name = name;
    this.element = element;
    this.health = health;
    this.damage = damage;
    this.status = 'alive';
  }

  attack(target) {
    const resultDamage = this.damage * ratio(this.element, target.element);
    return resultDamage;
  }

  takeDamage(amount) {
    this.health -= amount;
    this.status = this.health <= 0 ? 'dead' : this.status;
  }
}

module.exports = Pokemon;

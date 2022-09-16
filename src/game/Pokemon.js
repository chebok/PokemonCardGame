const ratio = require('./ratio');

class Pokemon {
  constructor(name, element, health, damage, speed) {
    this.name = name;
    this.element = element;
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.status = 'alive';
    this.moveStatus = 'wait';
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

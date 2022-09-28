import ratio from './ratio.js';

class Pokemon {
  constructor(name, element, health, damage, speed) {
    this.name = name;
    this.element = element;
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.isAlive = true;
    this.isReadyToMove = false;
  }

  attack(target) {
    const resultDamage = this.damage * ratio(this.element, target.element);
    return resultDamage;
  }

  takeDamage(amount) {
    this.health -= amount;
    this.isAlive = this.health <= 0 ? false : this.isAlive;
  }
}

export default Pokemon;

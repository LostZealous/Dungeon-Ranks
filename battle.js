// battle.js

class Battle {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.battleLog = [];
    }

    rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    playerAttack() {
        const attackRoll = this.rollDice(20); // Roll a d20 for attack
        if (attackRoll > this.enemies.armorClass) {
            const damage = this.rollDice(this.player.weapon.damageDice);
            this.enemies.currentHP -= damage;
            this.battleLog.push(`You hit the ${this.enemies.name} for ${damage} damage!`);
        } else {
            this.battleLog.push(`You missed the ${this.enemies.name}!`);
        }
    }

    enemyAttack() {
        const attackRoll = this.rollDice(20); // Roll a d20 for attack
        if (attackRoll > this.player.armorClass) {
            const damage = this.rollDice(this.enemies.weapon.damageDice);
            this.player.currentHP -= damage;
            this.battleLog.push(`The ${this.enemies.name} hits you for ${damage} damage!`);
        } else {
            this.battleLog.push(`The ${this.enemies.name} missed you!`);
        }
    }

    startBattle() {
        this.battleLog.push("The battle begins!");

        while (this.player.currentHP > 0 && this.enemies.currentHP > 0) {
            this.playerAttack();
            if (this.enemies.currentHP <= 0) {
                this.battleLog.push(`You have defeated the ${this.enemies.name}!`);
                break;
            }

            this.enemyAttack();
            if (this.player.currentHP <= 0) {
                this.battleLog.push("You have been defeated!");
                break;
            }
        }

        return this.battleLog;
    }
}

// Example Usage
const player = {
    name: "Adventurer",
    currentHP: 20,
    armorClass: 15,
    weapon: { name: "Sword", damageDice: 8 } // d8 damage
};

const goblin = {
    name: "Goblin",
    currentHP: 10,
    armorClass: 12,
    weapon: { name: "Dagger", damageDice: 6 } // d6 damage
};

const battle = new Battle(player, goblin);
console.log(battle.startBattle());

export { Battle };

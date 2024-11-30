// battle.js

class Battle {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.battleLog = [];
        this.currentTurn = "player"; // Tracks whose turn it is
    }

    rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    playerAttack() {
        const attackRoll = this.rollDice(20); // Roll a d20 for attack
        if (attackRoll > this.enemy.armorClass) {
            const damage = this.rollDice(this.player.weapon.damageDice);
            this.enemy.currentHP -= damage;
            this.battleLog.push(`You hit the ${this.enemy.name} for ${damage} damage!`);
        } else {
            this.battleLog.push(`You missed the ${this.enemy.name}!`);
        }
        this.currentTurn = "enemy"; // Switch turn
    }

    enemyAttack() {
        const attackRoll = this.rollDice(20); // Roll a d20 for attack
        if (attackRoll > this.player.armorClass) {
            const damage = this.rollDice(this.enemy.weapon.damageDice);
            this.player.currentHP -= damage;
            this.battleLog.push(`The ${this.enemy.name} hits you for ${damage} damage!`);
        } else {
            this.battleLog.push(`The ${this.enemy.name} missed you!`);
        }
        this.currentTurn = "player"; // Switch turn
    }

    isBattleOver() {
        if (this.player.currentHP <= 0) {
            this.battleLog.push("You have been defeated!");
            return true;
        }
        if (this.enemy.currentHP <= 0) {
            this.battleLog.push(`You have defeated the ${this.enemy.name}!`);
            return true;
        }
        return false;
    }
}

export { Battle };

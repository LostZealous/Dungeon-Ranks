export class Battle {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.currentTurn = "player";
        this.battleLog = [];
    }

    rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    playerAttack() {
        const roll = this.rollDice(20);
        const attackRoll = roll + this.player.stats.strength;
        this.battleLog.push(`Player rolls ${roll} + Strength (${this.player.stats.strength}) = ${attackRoll}`);
        if (attackRoll >= this.enemy.armorClass) {
            const damage = this.rollDice(6); // Default weapon damage
            this.enemy.currentHP -= damage;
            this.battleLog.push(`You hit the ${this.enemy.name} for ${damage} damage!`);
        } else {
            this.battleLog.push("You missed!");
        }
        this.currentTurn = "enemy";
    }

    enemyAttack() {
        const roll = this.rollDice(20);
        const attackRoll = roll + this.enemy.stats.strength;
        this.battleLog.push(`Enemy rolls ${roll} + Strength (${this.enemy.stats.strength}) = ${attackRoll}`);
        if (attackRoll >= this.player.armorClass) {
            const damage = this.rollDice(6); // Default enemy damage
            this.player.currentHP -= damage;
            this.battleLog.push(`The ${this.enemy.name} hits you for ${damage} damage!`);
        } else {
            this.battleLog.push(`The ${this.enemy.name} missed!`);
        }
        this.currentTurn = "player";
    }

    isBattleOver() {
        if (this.player.currentHP <= 0) {
            this.battleLog.push("You have been defeated...");
            return true;
        } else if (this.enemy.currentHP <= 0) {
            this.battleLog.push(`You have defeated the ${this.enemy.name}!`);
            return true;
        }
        return false;
    }
}

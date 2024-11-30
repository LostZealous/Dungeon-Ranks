export class Player {
    constructor(name) {
        this.name = name;
        this.rank = 1;
        this.maxHP = 20;
        this.currentHP = 20;
        this.armorClass = 12;
        this.gold = 0;
        this.inventory = [];
        this.stats = {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        };
    }

    levelUp() {
        this.rank++;
        this.maxHP += 5;
        this.currentHP = this.maxHP;
        this.armorClass += 1;
        console.log(`${this.name} has leveled up to Rank ${this.rank}!`);
    }

    takeDamage(amount) {
        this.currentHP -= amount;
        if (this.currentHP <= 0) {
            console.log(`${this.name} has fallen!`);
            this.currentHP = 0;
        }
    }

    heal(amount) {
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
        console.log(`${this.name} heals for ${amount} HP.`);
    }

    addToInventory(item) {
        this.inventory.push(item);
        console.log(`${item} added to inventory.`);
    }

    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            console.log(`${amount} gold spent.`);
        } else {
            console.log("Not enough gold!");
        }
    }
}

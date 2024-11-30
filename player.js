class Player {
    constructor(name) {
        this.name = name;
        this.currentHP = 20;
        this.maxHP = 20;
        this.armorClass = 15;
        this.weapon = { name: "Basic Sword", damageDice: 8 }; // d8 weapon
        this.rank = 1;
        this.gold = 0;
        this.inventory = [];
    }

    levelUp() {
        this.rank++;
        this.maxHP += 5;
        this.currentHP = this.maxHP; // Heal upon leveling up
        console.log(`Congratulations, ${this.name}! You are now Rank ${this.rank}!`);
    }

    addToInventory(item) {
        this.inventory.push(item);
        console.log(`${item} has been added to your inventory.`);
    }

    showStats() {
        console.log(`Name: ${this.name}`);
        console.log(`HP: ${this.currentHP}/${this.maxHP}`);
        console.log(`Armor Class: ${this.armorClass}`);
        console.log(`Weapon: ${this.weapon.name} (d${this.weapon.damageDice})`);
        console.log(`Rank: ${this.rank}`);
        console.log(`Gold: ${this.gold}`);
        console.log("Inventory:", this.inventory);
    }
}

export { Player };

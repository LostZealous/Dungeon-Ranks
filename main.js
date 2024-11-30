// main.js

import { Dungeon } from "./dungeon.js";
import { Battle } from "./battle.js";
import { easyRooms } from "./rooms.js";

function startGame() {
    const player = {
        name: "Adventurer",
        currentHP: 20,
        armorClass: 15,
        weapon: { name: "Sword", damageDice: 8 },
        rank: 1
    };

    const dungeon = new Dungeon(player.rank);
    dungeon.generateDungeon();

    console.log("Dungeon Generated!");
    dungeon.rooms.forEach((room, index) => {
        console.log(`Entering Room ${index + 1}: ${room.name}`);
        console.log(room.description);

        // Handle Room Challenge
        if (room.challenge.includes("combat")) {
            console.log("A fight begins!");
            const goblin = {
                name: "Goblin",
                currentHP: 10,
                armorClass: 12,
                weapon: { name: "Dagger", damageDice: 6 }
            };
            const battle = new Battle(player, goblin);
            console.log(battle.startBattle());
        } else {
            console.log("Solving the challenge...");
            console.log(`Challenge: ${room.challenge}`);
        }

        console.log(`Loot: ${room.loot}`);
    });
}

startGame();

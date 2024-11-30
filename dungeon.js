// dungeon.js

import { easyRooms } from "./rooms.js";

class Dungeon {
    constructor(playerRank) {
        this.playerRank = playerRank;
        this.rooms = [];
        this.bossChance = this.getBossChance(playerRank);
    }

    getBossChance(rank) {
        // Define boss chances by rank
        const rankBossChances = {
            1: 100,
            2: 90,
            3: 80,
            4: 70,
            5: 60,
            6: 50,
            7: 40,
            8: 30,
            9: 20,
            10: 10
        };
        return rankBossChances[rank] || 0;
    }

    generateDungeon() {
        const minRooms = this.playerRank < 5 ? 3 : 5;
        const maxRooms = this.playerRank < 7 ? 7 : 15;
        const roomCount = Math.floor(Math.random() * (maxRooms - minRooms + 1)) + minRooms;

        // Populate regular rooms
        for (let i = 0; i < roomCount - 1; i++) {
            const randomRoom = easyRooms[Math.floor(Math.random() * easyRooms.length)];
            this.rooms.push(randomRoom);
        }

        // Determine if the last room will be a boss room
        if (Math.random() * 100 < this.bossChance) {
            this.rooms.push({
                id: "BOSS",
                name: "Boss Room",
                description: "A massive chamber where a fearsome enemy awaits. The air feels heavy with menace.",
                challenge: "Defeat the dungeon's boss to claim victory!",
                loot: "High-value treasure, a powerful weapon, and rare items."
            });
        } else {
            this.rooms.push({
                id: "TREASURE",
                name: "Treasure Room",
                description: "A glittering chamber filled with gold, gems, and valuable artifacts.",
                challenge: "No challenges, just rewards.",
                loot: "A significant amount of gold, high-value items, and unique trinkets."
            });
        }
    }

    printDungeon() {
        console.log("Generated Dungeon Rooms:");
        this.rooms.forEach((room, index) => {
            console.log(`Room ${index + 1}: ${room.name}`);
            console.log(`  Description: ${room.description}`);
            console.log(`  Challenge: ${room.challenge}`);
            console.log(`  Loot: ${room.loot}`);
        });
    }
}

// Example Usage
const dungeon = new Dungeon(1); // Rank 1 Player
dungeon.generateDungeon();
dungeon.printDungeon();

export { Dungeon };

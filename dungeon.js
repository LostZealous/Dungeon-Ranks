import { easyRooms, mediumRooms, hardRooms, extremeRooms } from "./rooms.js";

export class Dungeon {
    constructor(rank) {
        this.rank = rank;
        this.rooms = [];
    }

    // Generate dungeon based on player rank
    generateDungeon() {
        let roomCount = this.getRoomCountForRank();
        let roomsPool = this.getRoomsPoolForRank();

        for (let i = 0; i < roomCount; i++) {
            const randomIndex = Math.floor(Math.random() * roomsPool.length);
            const room = { ...roomsPool[randomIndex] }; // Clone room to avoid reference issues
            this.rooms.push(room);
        }

        // Decide if the last room has a boss
        const bossChance = this.getBossChanceForRank();
        if (Math.random() * 100 < bossChance) {
            this.rooms[this.rooms.length - 1].challenge = "boss";
            this.rooms[this.rooms.length - 1].challengeDetails = 
                "A powerful boss guards the final room. Prepare for a fierce battle!";
            this.rooms[this.rooms.length - 1].loot = 
                "The boss's treasure hoard contains valuable items and gold.";
        }
    }

    // Determine room count based on rank
    getRoomCountForRank() {
        switch (this.rank) {
            case 1:
            case 2:
            case 3:
                return this.randomInRange(3, 7);
            case 4:
            case 5:
            case 6:
                return this.randomInRange(5, 10);
            case 7:
            case 8:
            case 9:
                return this.randomInRange(8, 15);
            case 10:
                return this.randomInRange(10, 17);
            default:
                return 3;
        }
    }

    // Determine boss chance based on rank
    getBossChanceForRank() {
        switch (this.rank) {
            case 1:
                return 100;
            case 2:
                return 90;
            case 3:
                return 80;
            case 4:
                return 70;
            case 5:
                return 60;
            case 6:
                return 50;
            case 7:
                return 40;
            case 8:
                return 30;
            case 9:
                return 20;
            case 10:
                return 10;
            default:
                return 0;
        }
    }

    // Get appropriate rooms pool based on rank
    getRoomsPoolForRank() {
        if (this.rank <= 3) return easyRooms;
        if (this.rank <= 6) return mediumRooms;
        if (this.rank <= 9) return hardRooms;
        return extremeRooms;
    }

    // Helper to generate a random number within a range
    randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Function to generate a dungeon dynamically
export function generateDungeon(rank) {
    const dungeon = new Dungeon(rank);
    dungeon.generateDungeon();
    return dungeon;
}

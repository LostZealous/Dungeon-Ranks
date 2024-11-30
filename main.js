import { Player } from "./player.js";
import { Dungeon } from "./dungeon.js";
import { Battle } from "./battle.js";
import { easyRooms } from "./rooms.js";

const player = new Player("Adventurer");

// DOM Elements
const statsElement = document.getElementById("stats");
const roomDetailsElement = document.getElementById("room-details");
const startDungeonButton = document.getElementById("start-dungeon");
const viewInventoryButton = document.getElementById("view-inventory");
const rollDieButton = document.getElementById("roll-die"); // New button for dice rolls
const battleLogElement = document.getElementById("battle-log"); // For displaying battle logs

let currentBattle = null;

// Update Player Stats
function updateStats() {
    statsElement.innerHTML = `
        Name: ${player.name} <br>
        HP: ${player.currentHP}/${player.maxHP} <br>
        Armor Class: ${player.armorClass} <br>
        Weapon: ${player.weapon.name} (d${player.weapon.damageDice}) <br>
        Rank: ${player.rank} <br>
        Gold: ${player.gold} <br>
    `;
}

// Display Room Details
function displayRoom(room) {
    roomDetailsElement.innerHTML = `
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <p><strong>Challenge:</strong> ${room.challenge}</p>
    `;
}

// Start Dungeon
startDungeonButton.addEventListener("click", () => {
    const dungeon = new Dungeon(player.rank);
    dungeon.generateDungeon();
    const firstRoom = dungeon.rooms[0];
    displayRoom(firstRoom);

    if (firstRoom.challenge.includes("combat")) {
        const goblin = {
            name: "Goblin",
            currentHP: 10,
            armorClass: 12,
            weapon: { name: "Dagger", damageDice: 6 }
        };
        currentBattle = new Battle(player, goblin);
        battleLogElement.innerHTML = "A battle begins! Click 'Roll Die' to attack.";
    }

    updateStats();
});

// Handle Dice Rolls
rollDieButton.addEventListener("click", () => {
    if (currentBattle) {
        if (currentBattle.currentTurn === "player") {
            currentBattle.playerAttack();
        } else {
            currentBattle.enemyAttack();
        }

        // Update Battle Log
        battleLogElement.innerHTML = currentBattle.battleLog.join("<br>");

        // Check if Battle is Over
        if (currentBattle.isBattleOver()) {
            currentBattle = null;
        }
    } else {
        battleLogElement.innerHTML = "No active battle. Start a dungeon to begin.";
    }
});

// View Inventory
viewInventoryButton.addEventListener("click", () => {
    alert(`Inventory: ${player.inventory.join(", ") || "Empty"}`);
});

// Initialize
updateStats();

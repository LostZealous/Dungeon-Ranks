import { Player } from "./player.js";
import { Dungeon } from "./dungeon.js";
import { easyRooms } from "./rooms.js";

const player = new Player("Adventurer");

// DOM Elements
const statsElement = document.getElementById("stats");
const roomDetailsElement = document.getElementById("room-details");
const startDungeonButton = document.getElementById("start-dungeon");
const viewInventoryButton = document.getElementById("view-inventory");

// Update Player Stats Display
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

// Start Dungeon Event
startDungeonButton.addEventListener("click", () => {
    const dungeon = new Dungeon(player.rank);
    dungeon.generateDungeon();
    const firstRoom = dungeon.rooms[0];
    displayRoom(firstRoom);
    updateStats();
});

// View Inventory Event
viewInventoryButton.addEventListener("click", () => {
    alert(`Inventory: ${player.inventory.join(", ") || "Empty"}`);
});

// Initialize Game
updateStats();

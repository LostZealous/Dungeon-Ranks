import { Player } from "./player.js";
import { Dungeon } from "./dungeon.js";
import { Battle } from "./battle.js";
import { easyRooms } from "./rooms.js";

const player = new Player("Adventurer");

// DOM Elements
const tavernSection = document.getElementById("tavern");
const questBoardSection = document.getElementById("quest-board-section");
const dungeonSection = document.getElementById("dungeon");
const bartenderSection = document.getElementById("bartender");
const roomDetailsElement = document.getElementById("room-details");
const battleLogElement = document.getElementById("battle-log");
const rollDieButton = document.getElementById("roll-die");

// Button Elements
const viewStatsButton = document.getElementById("view-stats");
const viewInventoryButton = document.getElementById("view-inventory");
const restButton = document.getElementById("rest");
const questBoardButton = document.getElementById("quest-board");
const startDungeonButton = document.getElementById("start-dungeon");
const backToTavernButton = document.getElementById("back-to-tavern");
const backToQuestBoardButton = document.getElementById("back-to-quest-board");
const talkToBartenderButton = document.getElementById("talk-to-bartender");
const askAboutDungeonsButton = document.getElementById("ask-about-dungeons");
const askAboutTownButton = document.getElementById("ask-about-town");
const sayGoodbyeButton = document.getElementById("say-goodbye");

// Bartender Dialogue Responses
const bartenderResponses = {
    initial: `"Welcome, adventurer! What can I do for you?"`,
    dungeons: `"The dungeons are dangerous, but the rewards are worth it. Start with the smaller ones to build your strength."`,
    town: `"This town thrives on adventurers like you. The shopkeepers will buy your loot, and the inn has the best food around!"`,
    goodbye: `"Good luck out there, adventurer! Come back in one piece!"`
};

let currentBattle = null;

// Update Player Stats
function updateStats() {
    alert(`
        Name: ${player.name}
        HP: ${player.currentHP}/${player.maxHP}
        Armor Class: ${player.armorClass}
        Weapon: ${player.weapon.name} (d${player.weapon.damageDice})
        Rank: ${player.rank}
        Gold: ${player.gold}
    `);
}

// Show Bartender Section
talkToBartenderButton.addEventListener("click", () => {
    tavernSection.classList.add("hidden");
    bartenderSection.classList.remove("hidden");
    bartenderDialogue.textContent = bartenderResponses.initial;
});

// Bartender Options
askAboutDungeonsButton.addEventListener("click", () => {
    bartenderDialogue.textContent = bartenderResponses.dungeons;
});

askAboutTownButton.addEventListener("click", () => {
    bartenderDialogue.textContent = bartenderResponses.town;
});

sayGoodbyeButton.addEventListener("click", () => {
    bartenderDialogue.textContent = bartenderResponses.goodbye;
    setTimeout(() => {
        bartenderSection.classList.add("hidden");
        tavernSection.classList.remove("hidden");
    }, 2000);
});

// Navigate to Quest Board
questBoardButton.addEventListener("click", () => {
    tavernSection.classList.add("hidden");
    questBoardSection.classList.remove("hidden");
});

// Back to Tavern from Quest Board
backToTavernButton.addEventListener("click", () => {
    questBoardSection.classList.add("hidden");
    tavernSection.classList.remove("hidden");
});

// Start Dungeon
startDungeonButton.addEventListener("click", () => {
    questBoardSection.classList.add("hidden");
    dungeonSection.classList.remove("hidden");

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
        rollDieButton.classList.remove("hidden");
    }
});

// Display Room Details
function displayRoom(room) {
    roomDetailsElement.innerHTML = `
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <p><strong>Challenge:</strong> ${room.challenge}</p>
    `;
}

// Handle Rest
restButton.addEventListener("click", () => {
    player.currentHP = player.maxHP;
    alert("You have fully rested and recovered your health!");
});

// Handle View Stats
viewStatsButton.addEventListener("click", updateStats);

// Handle Inventory View
viewInventoryButton.addEventListener("click", () => {
    alert(`Inventory: ${player.inventory.join(", ") || "Empty"}`);
});

// Handle Dice Rolls in Battle
rollDieButton.addEventListener("click", () => {
    if (currentBattle) {
        if (currentBattle.currentTurn === "player") {
            currentBattle.playerAttack();
        } else {
            currentBattle.enemyAttack();
        }

        battleLogElement.innerHTML = currentBattle.battleLog.join("<br>");

        if (currentBattle.isBattleOver()) {
            rollDieButton.classList.add("hidden");
        }
    }
});

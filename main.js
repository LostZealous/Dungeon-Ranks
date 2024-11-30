import { Player } from "./player.js";
import { Dungeon } from "./dungeon.js";
import { Battle } from "./battle.js";

const player = new Player("Adventurer");

// DOM Elements
const tavernSection = document.getElementById("tavern");
const questBoardSection = document.getElementById("quest-board-section");
const dungeonSection = document.getElementById("dungeon");
const bartenderSection = document.getElementById("bartender");
const roomDetailsElement = document.getElementById("room-details");
const battleLogElement = document.getElementById("battle-log");
const lookAroundButton = document.getElementById("look-around");
const attemptSkillCheckButton = document.getElementById("attempt-skill-check");
const proceedNextRoomButton = document.getElementById("proceed-next-room");
const rollDieButton = document.getElementById("roll-die");

// Button Elements
const viewStatsButton = document.getElementById("view-stats");
const viewInventoryButton = document.getElementById("view-inventory");
const restButton = document.getElementById("rest");
const questBoardButton = document.getElementById("quest-board");
const startDungeonButton = document.getElementById("start-dungeon");
const backToTavernButton = document.getElementById("back-to-tavern");
const talkToBartenderButton = document.getElementById("talk-to-bartender");
const askAboutDungeonsButton = document.getElementById("ask-about-dungeons");
const askAboutTownButton = document.getElementById("ask-about-town");
const sayGoodbyeButton = document.getElementById("say-goodbye");

let currentDungeon = null;
let currentRoomIndex = 0;
let currentBattle = null;

// Helper Functions
function updateStats() {
    alert(`
        Name: ${player.name}
        HP: ${player.currentHP}/${player.maxHP}
        AC: ${player.armorClass}
        Rank: ${player.rank}
        Gold: ${player.gold}
        Inventory: ${player.inventory.join(", ") || "Empty"}
    `);
}

function enterRoom() {
    const room = currentDungeon.rooms[currentRoomIndex];
    roomDetailsElement.innerHTML = `
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <p><strong>Challenge:</strong> ${room.challenge}</p>
    `;

    if (room.challenge.includes("combat")) {
        startBattle(room);
    } else if (room.challenge.includes("skill check")) {
        startSkillCheck(room);
    } else {
        lookAroundButton.classList.remove("hidden");
    }
}

// Battle System
function startBattle(room) {
    const goblin = { name: "Goblin", currentHP: 10, armorClass: 12, weapon: { name: "Dagger", damageDice: 6 } };
    currentBattle = new Battle(player, goblin);
    battleLogElement.innerHTML = "A battle begins! Roll dice to attack.";
    rollDieButton.classList.remove("hidden");

    rollDieButton.addEventListener("click", () => {
        if (currentBattle.currentTurn === "player") {
            currentBattle.playerAttack();
        } else {
            currentBattle.enemyAttack();
        }
        battleLogElement.innerHTML = currentBattle.battleLog.join("<br>");
        if (currentBattle.isBattleOver()) {
            rollDieButton.classList.add("hidden");
            proceedNextRoomButton.classList.remove("hidden");
        }
    });
}

// Skill Check System
function startSkillCheck(room) {
    battleLogElement.innerHTML = "Skill check needed! Attempt to proceed.";
    attemptSkillCheckButton.classList.remove("hidden");

    attemptSkillCheckButton.addEventListener("click", () => {
        const dc = 12; // Example DC
        const roll = Math.floor(Math.random() * 20) + 1 + player.stats.dexterity;
        if (roll >= dc) {
            battleLogElement.innerHTML = "Skill check succeeded!";
            lookAroundButton.classList.remove("hidden");
        } else {
            battleLogElement.innerHTML = "Failed! You take minor damage.";
            player.currentHP -= 5;
            updateStats();
        }
        attemptSkillCheckButton.classList.add("hidden");
    });
}

// Room Exploration
lookAroundButton.addEventListener("click", () => {
    const dc = 12;
    const roll = Math.floor(Math.random() * 20) + 1 + player.stats.wisdom;
    if (roll >= dc) {
        battleLogElement.innerHTML = "You found loot!";
        player.inventory.push("Gold Coin");
    } else {
        battleLogElement.innerHTML = "You found nothing.";
    }
    lookAroundButton.classList.add("hidden");
    proceedNextRoomButton.classList.remove("hidden");
});

// Progression
proceedNextRoomButton.addEventListener("click", () => {
    if (currentRoomIndex < currentDungeon.rooms.length - 1) {
        currentRoomIndex++;
        enterRoom();
    } else {
        battleLogElement.innerHTML = "Dungeon complete! Return to the tavern.";
        proceedNextRoomButton.classList.add("hidden");
        backToTavernButton.classList.remove("hidden");
    }
});

// Event Listeners
viewStatsButton.addEventListener("click", updateStats);

viewInventoryButton.addEventListener("click", () => {
    alert(`Inventory: ${player.inventory.join(", ") || "Empty"}`);
});

restButton.addEventListener("click", () => {
    player.currentHP = player.maxHP;
    alert("You have fully rested and recovered your health!");
});

questBoardButton.addEventListener("click", () => {
    tavernSection.classList.add("hidden");
    questBoardSection.classList.remove("hidden");
});

backToTavernButton.addEventListener("click", () => {
    questBoardSection.classList.add("hidden");
    tavernSection.classList.remove("hidden");
});

startDungeonButton.addEventListener("click", () => {
    questBoardSection.classList.add("hidden");
    dungeonSection.classList.remove("hidden");
    currentDungeon = new Dungeon(player.rank);
    currentDungeon.generateDungeon();
    currentRoomIndex = 0;
    enterRoom();
});

talkToBartenderButton.addEventListener("click", () => {
    tavernSection.classList.add("hidden");
    bartenderSection.classList.remove("hidden");
});

askAboutDungeonsButton.addEventListener("click", () => {
    document.getElementById("bartender-dialogue").innerText = `"The dungeons are dangerous, but worth it. Start small!"`;
});

askAboutTownButton.addEventListener("click", () => {
    document.getElementById("bartender-dialogue").innerText = `"The town thrives on adventurers. Visit the shops for upgrades!"`;
});

sayGoodbyeButton.addEventListener("click", () => {
    document.getElementById("bartender-dialogue").innerText = `"Good luck, adventurer! Come back safe."`;
    setTimeout(() => {
        bartenderSection.classList.add("hidden");
        tavernSection.classList.remove("hidden");
    }, 2000);
});

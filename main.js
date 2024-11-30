import { Player } from "./player.js";
import { Dungeon } from "./dungeon.js";

const player = new Player("Adventurer");

// DOM Elements
const tavernSection = document.getElementById("tavern");
const questBoardSection = document.getElementById("quest-board-section");
const dungeonSection = document.getElementById("dungeon");
const roomDetailsElement = document.getElementById("room-details");
const battleLogElement = document.getElementById("battle-log");
const lookAroundButton = document.getElementById("look-around");
const attemptSkillCheckButton = document.getElementById("attempt-skill-check");
const proceedNextRoomButton = document.getElementById("proceed-next-room");

// Button Elements
const startDungeonButton = document.getElementById("start-dungeon");
const backToTavernButton = document.getElementById("back-to-tavern");

let currentDungeon = null;
let currentRoomIndex = 0;

// Start Dungeon
startDungeonButton.addEventListener("click", () => {
    questBoardSection.classList.add("hidden");
    dungeonSection.classList.remove("hidden");

    currentDungeon = new Dungeon(player.rank);
    currentDungeon.generateDungeon();
    currentRoomIndex = 0;
    enterRoom();
});

// Enter a Room
function enterRoom() {
    const room = currentDungeon.rooms[currentRoomIndex];
    roomDetailsElement.innerHTML = `
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <p><strong>Challenge:</strong> ${room.challenge}</p>
    `;

    if (room.challenge === "combat") {
        startBattle(room);
    } else if (room.challenge === "skill check") {
        startSkillCheck(room);
    } else if (room.challenge === "boss") {
        startBossBattle(room);
    } else {
        lookAroundButton.classList.remove("hidden");
    }
}

// Battle System
function startBattle(room) {
    battleLogElement.innerHTML = "A battle begins!";
    lookAroundButton.classList.remove("hidden"); // Replace this with actual battle logic
}

// Boss Battle System
function startBossBattle(room) {
    battleLogElement.innerHTML = "A boss battle begins!";
    lookAroundButton.classList.remove("hidden"); // Replace this with boss battle logic
}

// Skill Check System
function startSkillCheck(room) {
    battleLogElement.innerHTML = "Skill check needed! Attempt to proceed.";
    attemptSkillCheckButton.classList.remove("hidden");

    attemptSkillCheckButton.addEventListener("click", () => {
        const roll = Math.floor(Math.random() * 20) + 1; // Add skill modifiers as needed
        if (roll >= 12) {
            battleLogElement.innerHTML = "Skill check succeeded!";
            lookAroundButton.classList.remove("hidden");
        } else {
            battleLogElement.innerHTML = "Failed! You triggered a trap and lost health.";
            player.currentHP -= 5;
        }
        attemptSkillCheckButton.classList.add("hidden");
    });
}

// Progression through the dungeon
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

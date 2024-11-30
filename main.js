import { Player } from "./player.js";
import { generateDungeon } from "./dungeon.js";

document.addEventListener("DOMContentLoaded", () => {
    const interactionArea = document.getElementById("interaction-area");
    const currentPlayer = new Player("Hero");
    let currentDungeon = null;

    // Quest Board Button
    document.getElementById("quest-board-button").addEventListener("click", () => {
        interactionArea.innerHTML = `
            <h2>Quest Board</h2>
            <p>The quest board is filled with notices and maps, each promising rewards for daring adventurers.</p>
            <button id="start-dungeon-button">Start a Dungeon</button>
        `;

        document.getElementById("start-dungeon-button").addEventListener("click", () => {
            const playerRank = currentPlayer.rank || 1;
            currentDungeon = generateDungeon(playerRank);
            console.log("Dungeon Generated:", currentDungeon);
            enterDungeon(currentDungeon);
        });
    });

    // Bartender Button
    document.getElementById("bartender-button").addEventListener("click", () => {
        interactionArea.innerHTML = `
            <h2>The Bartender</h2>
            <p>The bartender looks up from polishing a glass and greets you with a warm smile.</p>
            <div id="bartender-dialogue">
                <p>"Welcome, adventurer! Care for a drink, or perhaps some advice on your next journey?"</p>
                <button id="ask-for-advice">Ask for Advice</button>
                <button id="order-drink">Order a Drink</button>
                <button id="leave-bartender">Leave the Bartender</button>
            </div>
        `;

        // Bartender options
        document.getElementById("ask-for-advice").addEventListener("click", () => {
            interactionArea.querySelector("#bartender-dialogue").innerHTML = `
                <p>"Stay sharp and always carry a healing potion. Those dungeons can be tricky!"</p>
                <button id="back-to-tavern">Back to Tavern</button>
            `;
            document.getElementById("back-to-tavern").addEventListener("click", resetTavern);
        });

        document.getElementById("order-drink").addEventListener("click", () => {
            interactionArea.querySelector("#bartender-dialogue").innerHTML = `
                <p>The bartender pours you a refreshing drink. You feel rejuvenated!</p>
                <button id="back-to-tavern">Back to Tavern</button>
            `;
            document.getElementById("back-to-tavern").addEventListener("click", resetTavern);
        });

        document.getElementById("leave-bartender").addEventListener("click", resetTavern);
    });

    // Reset to Tavern View
    function resetTavern() {
        interactionArea.innerHTML = `
            <p>Welcome back to the tavern. What would you like to do?</p>
            <button id="quest-board-button">Quest Board</button>
            <button id="bartender-button">Talk to Bartender</button>
        `;
        document.getElementById("quest-board-button").addEventListener("click", () => {
            interactionArea.innerHTML = `
                <h2>Quest Board</h2>
                <p>The quest board is filled with notices and maps, each promising rewards for daring adventurers.</p>
                <button id="start-dungeon-button">Start a Dungeon</button>
            `;
            document.getElementById("start-dungeon-button").addEventListener("click", () => {
                const playerRank = currentPlayer.rank || 1;
                currentDungeon = generateDungeon(playerRank);
                console.log("Dungeon Generated:", currentDungeon);
                enterDungeon(currentDungeon);
            });
        });

        document.getElementById("bartender-button").addEventListener("click", () => {
            interactionArea.innerHTML = `
                <h2>The Bartender</h2>
                <p>The bartender looks up from polishing a glass and greets you with a warm smile.</p>
                <div id="bartender-dialogue">
                    <p>"Welcome, adventurer! Care for a drink, or perhaps some advice on your next journey?"</p>
                    <button id="ask-for-advice">Ask for Advice</button>
                    <button id="order-drink">Order a Drink</button>
                    <button id="leave-bartender">Leave the Bartender</button>
                </div>
            `;

            document.getElementById("ask-for-advice").addEventListener("click", () => {
                interactionArea.querySelector("#bartender-dialogue").innerHTML = `
                    <p>"Stay sharp and always carry a healing potion. Those dungeons can be tricky!"</p>
                    <button id="back-to-tavern">Back to Tavern</button>
                `;
                document.getElementById("back-to-tavern").addEventListener("click", resetTavern);
            });

            document.getElementById("order-drink").addEventListener("click", () => {
                interactionArea.querySelector("#bartender-dialogue").innerHTML = `
                    <p>The bartender pours you a refreshing drink. You feel rejuvenated!</p>
                    <button id="back-to-tavern">Back to Tavern</button>
                `;
                document.getElementById("back-to-tavern").addEventListener("click", resetTavern);
            });

            document.getElementById("leave-bartender").addEventListener("click", resetTavern);
        });
    }

    // Enter Dungeon
    function enterDungeon(dungeon) {
        let currentRoomIndex = 0;

        function showRoom() {
            const room = dungeon.rooms[currentRoomIndex];
            interactionArea.innerHTML = `
                <h2>${room.name}</h2>
                <p>${room.description}</p>
                <button id="explore-room">Explore Room</button>
                <button id="leave-dungeon">Leave Dungeon</button>
            `;

            document.getElementById("explore-room").addEventListener("click", () => {
                if (room.challenge === "combat") {
                    startBattle(room);
                } else if (room.challenge === "skill check") {
                    attemptSkillCheck(room);
                }
            });

            document.getElementById("leave-dungeon").addEventListener("click", resetTavern);
        }

        function startBattle(room) {
            interactionArea.innerHTML = `
                <h2>Battle!</h2>
                <p>Enemies appear in ${room.name}!</p>
                <button id="fight">Fight</button>
            `;

            document.getElementById("fight").addEventListener("click", () => {
                interactionArea.innerHTML = `
                    <p>You defeated the enemies and found: ${room.loot}</p>
                    <button id="next-room">Next Room</button>
                `;
                document.getElementById("next-room").addEventListener("click", nextRoom);
            });
        }

        function attemptSkillCheck(room) {
            interactionArea.innerHTML = `
                <h2>Skill Check</h2>
                <p>${room.challengeDetails}</p>
                <button id="roll-skill">Roll Skill</button>
            `;

            document.getElementById("roll-skill").addEventListener("click", () => {
                const roll = Math.floor(Math.random() * 20) + 1;
                if (roll >= room.dc) {
                    interactionArea.innerHTML = `
                        <p>Success! You found: ${room.loot}</p>
                        <button id="next-room">Next Room</button>
                    `;
                } else {
                    interactionArea.innerHTML = `
                        <p>Failure! You must try again or find another way.</p>
                        <button id="try-again">Try Again</button>
                    `;
                    document.getElementById("try-again").addEventListener("click", () => attemptSkillCheck(room));
                }
                document.getElementById("next-room").addEventListener("click", nextRoom);
            });
        }

        function nextRoom() {
            currentRoomIndex++;
            if (currentRoomIndex < dungeon.rooms.length) {
                showRoom();
            } else {
                interactionArea.innerHTML = `
                    <h2>Dungeon Complete!</h2>
                    <p>You successfully cleared the dungeon and return to the tavern as a hero!</p>
                    <button id="return-to-tavern">Return to Tavern</button>
                `;
                document.getElementById("return-to-tavern").addEventListener("click", resetTavern);
            }
        }

        showRoom();
    }
});

import { generateDungeon } from './dungeon.js'; // Ensure dungeon generation logic is imported

document.addEventListener("DOMContentLoaded", () => {
    const interactionArea = document.getElementById("interaction-area");

    // Quest Board Button
    document.getElementById("quest-board-button").addEventListener("click", () => {
        interactionArea.innerHTML = `
            <h2>Quest Board</h2>
            <p>The quest board is filled with notices and maps, each promising rewards for daring adventurers.</p>
            <button id="start-dungeon-button">Start a Dungeon</button>
        `;

        // Add event listener for starting a dungeon
        document.getElementById("start-dungeon-button").addEventListener("click", () => {
            startDungeon();
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

        // Bartender interaction handlers
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

    function resetTavern() {
        interactionArea.innerHTML = "";
    }

    function startDungeon() {
        const dungeon = generateDungeon(); // Generate dungeon dynamically
        interactionArea.innerHTML = `
            <h2>Dungeon Entrance</h2>
            <p>You stand at the foreboding entrance of the dungeon. Darkness and mystery await inside.</p>
            <button id="enter-dungeon">Enter the Dungeon</button>
        `;

        document.getElementById("enter-dungeon").addEventListener("click", () => {
            playDungeon(dungeon);
        });
    }

    function playDungeon(dungeon) {
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
                if (room.challenge === 'combat') {
                    startBattle(room);
                } else if (room.challenge === 'skill check') {
                    attemptSkillCheck(room);
                }
            });

            document.getElementById("leave-dungeon").addEventListener("click", resetTavern);
        }

        function startBattle(room) {
            interactionArea.innerHTML = `
                <h2>Battle Begins!</h2>
                <p>You encounter enemies in ${room.name}.</p>
                <button id="fight">Fight</button>
            `;

            document.getElementById("fight").addEventListener("click", () => {
                interactionArea.innerHTML = `
                    <p>You fought bravely and cleared the room.</p>
                    <button id="claim-loot">Claim Loot</button>
                `;

                document.getElementById("claim-loot").addEventListener("click", () => {
                    interactionArea.innerHTML = `
                        <p>You found: ${room.loot}</p>
                        <button id="next-room">Continue</button>
                    `;

                    document.getElementById("next-room").addEventListener("click", nextRoom);
                });
            });
        }

        function attemptSkillCheck(room) {
            interactionArea.innerHTML = `
                <h2>Skill Check</h2>
                <p>${room.challengeDetails}</p>
                <button id="roll-skill-check">Roll Skill Check</button>
            `;

            document.getElementById("roll-skill-check").addEventListener("click", () => {
                const roll = Math.floor(Math.random() * 20) + 1; // Roll a d20
                if (roll >= room.dc) {
                    interactionArea.innerHTML = `
                        <p>Success! You navigated the challenge and found: ${room.loot}</p>
                        <button id="next-room">Continue</button>
                    `;
                } else {
                    interactionArea.innerHTML = `
                        <p>Failure! You must find another way forward.</p>
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
                    <p>You successfully completed the dungeon and return to the tavern victorious.</p>
                    <button id="return-to-tavern">Return to Tavern</button>
                `;
                document.getElementById("return-to-tavern").addEventListener("click", resetTavern);
            }
        }

        showRoom();
    }
});

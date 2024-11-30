// rooms.js

export const easyRooms = [
    {
        id: 1,
        name: "Entrance Hall",
        description: "A grand hall with towering arches and a faded banner bearing the insignia of a forgotten kingdom. The air smells of dust and time.",
        challenge: "Loose stones scatter the floor. Stepping on the wrong one triggers falling rocks. A careful eye and steady footwork are needed to navigate.",
        loot: "A small healing potion lies under a collapsed column and becomes reachable after the rocks are cleared."
    },
    {
        id: 2,
        name: "Treasure Vault",
        description: "Stacks of tarnished gold coins and dusty jewels are piled haphazardly in the room. The faint hum of magic lingers in the air.",
        challenge: "Pressure plates hidden beneath the floor release a volley of darts when triggered. You must carefully disarm the trap or avoid the plates entirely.",
        loot: "Once the traps are disabled, you can safely collect a handful of coins and a small gem."
    },
    {
        id: 3,
        name: "Puzzle Room",
        description: "Ancient symbols cover the walls, glowing faintly. Levers protrude from the floor, inviting curious hands.",
        challenge: "Match glowing symbols on the wall to those on the floor levers. A wrong match triggers a harmless but disorienting flash of light.",
        loot: "Solving the puzzle reveals a hidden compartment containing a small, enchanted key."
    },
    {
        id: 4,
        name: "Prison",
        description: "The room is lined with rusted iron bars, and faint moans echo in the damp air. Skeletal remains lie in one cell.",
        challenge: "A locked cell holds valuable items, but the rusted lock is fragile. You can either pick the lock or smash it with brute force.",
        loot: "The unlocked cell contains a basic weapon, such as a dagger, leaning against the wall."
    },
    {
        id: 5,
        name: "The Spider's Den",
        description: "The walls and ceiling are covered in thick webs. The faint skittering of spiders echoes around the chamber.",
        challenge: "Small venomous spiders descend when you disturb the webs. Combat or a clever distraction is required to safely proceed.",
        loot: "After defeating the spiders, you can collect a vial of spider venom from their remains."
    },
    {
        id: 6,
        name: "The Smuggler's Hideout",
        description: "Crates and barrels line the room, with the scent of stale alcohol in the air. An old lantern swings faintly from the ceiling.",
        challenge: "Tripwires connected to crude alarms and traps are strung across the room. Disarm or carefully avoid them to proceed.",
        loot: "Once the tripwires are neutralized, you find a stash of coins and a potion in one of the crates."
    },
    {
        id: 7,
        name: "Crypt of the Fallen Kings",
        description: "Dusty tombs carved with intricate patterns lie in neat rows. An eerie chill fills the air.",
        challenge: "As you approach the tombs, a few skeletal warriors animate to protect their resting place. Defeat them to advance.",
        loot: "After defeating the skeletons, you discover a small amount of gold hidden among the tombstones."
    },
    {
        id: 8,
        name: "The Alchemist's Lab",
        description: "Tables with bubbling cauldrons and scattered vials line the walls. The air smells acrid and sharp.",
        challenge: "The lab's volatile chemicals are dangerously unstable. Avoid or neutralize bubbling traps to prevent explosions.",
        loot: "After securing the lab, you collect a minor healing potion from the alchemist's table."
    },
    {
        id: 9,
        name: "Hall of Statues",
        description: "Rows of statues depicting past kings and adventurers stretch along the hall. A faint magical hum is in the air.",
        challenge: "When you step into the room, some statues animate to block your way. A fight or clever use of magic disables them.",
        loot: "After dealing with the animated statues, you find a trinket left behind by a previous adventurer."
    },
    {
        id: 10,
        name: "Raven's Nest",
        description: "A massive nest sits in the corner, with the sounds of cawing and flapping wings echoing in the room.",
        challenge: "Aggressive ravens swarm you as you approach. You can fight them off or distract them with food to reach the nest.",
        loot: "Once the ravens are dealt with, you collect a feather talisman from their nest."
    },
    {
        id: 11,
        name: "The Hidden Workshop",
        description: "The workshop is cluttered with tools, broken gears, and unfinished projects. Dust coats every surface.",
        challenge: "Malfunctioning devices spring to life, sparking with danger. Avoid the hazards or disable the rogue machines.",
        loot: "Once the devices are silenced, you find a small gadget useful for crafting."
    },
    {
        id: 12,
        name: "The Undead Gardener's Plot",
        description: "Rows of overgrown plants and weeds are tended by a slow-moving, undead gardener wielding a rusty rake.",
        challenge: "The undead gardener attacks anyone who disturbs their work. Defeat them to continue.",
        loot: "The gardener drops a handful of rare herbs useful for alchemy."
    },
    {
        id: 13,
        name: "The Druid’s Grove",
        description: "Lush greenery fills the room, and small woodland creatures dart among the plants.",
        challenge: "Protective magical wards in the grove block intruders. Solve a simple nature riddle to dispel the wards.",
        loot: "Once the wards are lifted, you gather some potent healing herbs."
    },
    {
        id: 14,
        name: "The Dead End",
        description: "The path seems to end abruptly, but faint scratch marks hint at a hidden door.",
        challenge: "Find and activate a hidden mechanism to reveal the door. Failure may trigger a harmless gust of wind as a deterrent.",
        loot: "Once the hidden door is opened, you discover a small stash of gold."
    },
    {
        id: 15,
        name: "The Insect Swarm Room",
        description: "The walls and floor are covered with swarms of crawling insects, making it hard to see clearly.",
        challenge: "A swarm of small insects tries to overwhelm you. Use fire or evasive maneuvers to clear the area.",
        loot: "After dispersing the swarm, you collect a pouch of insect parts useful for crafting."
    },
    {
        id: 16,
        name: "Clockwork Hall",
        description: "Mechanical gears and devices tick and hum as they work in unison.",
        challenge: "Some gears activate simple traps when disturbed. Disable the mechanisms or carefully navigate through them.",
        loot: "Once safe, you collect a piece of clockwork material useful for crafting."
    },
    {
        id: 17,
        name: "The Echoing Corridor",
        description: "Every step echoes loudly, making it hard to judge distance or direction.",
        challenge: "The echoes mask the sound of hidden traps. Carefully proceed to avoid triggering them.",
        loot: "When you reach the end, you find a charm that improves stealth."
    },
    {
        id: 18,
        name: "The Great Library",
        description: "Shelves filled with dusty tomes line the walls. Some books hum faintly with magic.",
        challenge: "Touching the wrong book triggers a minor magical pulse, causing disorientation. Find the correct book to advance.",
        loot: "The correct book reveals a scroll with a basic spell."
    },
    {
        id: 19,
        name: "Prismatic Room",
        description: "Colored lights dance across the walls, creating beautiful but dizzying patterns.",
        challenge: "Navigate through the shifting lights without getting disoriented. Careful timing and observation are key.",
        loot: "Once you cross the room, you collect a glowing gemstone."
    },
    {
        id: 20,
        name: "Hall of Whispers",
        description: "Faint whispers echo through the room, making it hard to concentrate.",
        challenge: "The whispers grow louder and more confusing. Focus your mind to overcome the distraction.",
        loot: "After silencing the whispers, you gain a talisman of mental clarity."
    },
    {
        id: 21,
        name: "The Lantern Room",
        description: "Dim lanterns hang from the ceiling, casting eerie, flickering shadows on the walls.",
        challenge: "Some lanterns are rigged with simple traps that release smoke or falling shards. Carefully inspect them to proceed.",
        loot: "After disarming the traps, you acquire a magical lantern that dispels darkness."
    },
    {
        id: 22,
        name: "The Spider's Web Chamber",
        description: "Thick webs cover the room, stretching from floor to ceiling. The faint movement of small spiders is visible.",
        challenge: "Avoid getting caught in the sticky webs while dealing with a few small but venomous spiders.",
        loot: "Clearing the room yields a vial of spider venom and some sticky webbing, useful for crafting."
    },
    {
        id: 23,
        name: "The Sacrificial Altar",
        description: "An ancient stone altar sits in the center, surrounded by faded runes and faint stains of long-dried blood.",
        challenge: "Stepping too close triggers a simple but harmless magical ward that flashes brightly. Dispel the ward to proceed.",
        loot: "Once the altar is safe, you find an ancient relic inscribed with runes, useful for trading or study."
    },
    {
        id: 24,
        name: "The Arena (Small)",
        description: "The room is circular, with high stone walls and a sandy floor. It feels like an area designed for combat practice.",
        challenge: "A few weak creatures, like goblins or giant rats, emerge from hidden doors to challenge you in combat.",
        loot: "After defeating the foes, you find a basic weapon, such as a shield or sword, left behind by a previous combatant."
    },
    {
        id: 25,
        name: "The Forgotten Vault",
        description: "Wooden crates and chests are stacked haphazardly in this room, each covered with a thick layer of dust.",
        challenge: "Opening the crates or chests triggers simple magical wards, releasing a harmless puff of light. Deactivate or avoid them.",
        loot: "Once the wards are neutralized, you recover a small stash of coins and a basic potion."
    }

];

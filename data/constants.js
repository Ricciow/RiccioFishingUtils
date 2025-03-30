export const playerName = Player.getName();
export const Chats = ['pc ', 'gc ', 'ac ', '', ''];
export const colorsRegex = /§([0-9]|[a-z])/gi;
export const Bobber = Java.type("net.minecraft.entity.projectile.EntityFishHook");
export const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
export const Firework = Java.type("net.minecraft.entity.item.EntityFireworkRocket")

export const DeathSound = new Sound ({ source: "death.ogg"});
export const MythicDetectSound = new Sound ({ source: "mythicsc.ogg"});

const allSeaCreatures = [
    {
      "name": "Night Squid",
      "message": "Pitch darkness reveals a Night Squid."
    },
    {
      "name": "Agarimoo",
      "message": "Your Chumcap Bucket trembles, it's an Agarimoo."
    },
    {
      "name": "Carrot King",
      "message": "Is this even a fish? It's the Carrot King!"
    },
    {
      "name": "Squid",
      "message": "A Squid appeared."
    },
    {
      "name": "Sea Walker",
      "message": "You caught a Sea Walker."
    },
    {
      "name": "Sea Guardian",
      "message": "You stumbled upon a Sea Guardian."
    },
    {
      "name": "Sea Archer",
      "message": "You reeled in a Sea Archer."
    },
    {
      "name": "Sea Witch",
      "message": "It looks like you've disrupted the Sea Witch's brewing session. Watch out, she's furious!"
    },
    {
      "name": "Catfish",
      "message": "Huh? A Catfish!"
    },
    {
      "name": "Sea Leech",
      "message": "Gross! A Sea Leech!"
    },
    {
      "name": "Guardian Defender",
      "message": "You've discovered a Guardian Defender of the sea."
    },
    {
      "name": "Rider of the Deep",
      "message": "The Rider of the Deep has emerged."
    },
    {
      "name": "Deep Sea Protector",
      "message": "You have awoken the Deep Sea Protector, prepare for a battle!"
    },
    {
      "name": "Water Hydra",
      "message": "The Water Hydra has come to test your strength."
    },
    {
      "name": "Sea Emperor",
      "message": "The Sea Emperor arises from the depths."
    },
    {
      "name": "Frozen Steve",
      "message": "Frozen Steve fell into the pond long ago, never to resurface...until now!"
    },
    {
      "name": "Frosty",
      "message": "It's a snowman! He looks harmless."
    },
    {
      "name": "Grinch",
      "message": "The Grinch stole Jerry's Gifts...get them back!"
    },
    {
      "name": "Nutcracker",
      "message": "You found a forgotten Nutcracker laying beneath the ice."
    },
    {
      "name": "Yeti",
      "message": "What is this creature!?"
    },
    {
      "name": "Reindrake",
      "message": "A Reindrake forms from the depths."
    },
    {
      "name": "Scarecrow",
      "message": "Phew! It's only a Scarecrow."
    },
    {
      "name": "Nightmare",
      "message": "You hear trotting from beneath the waves, you caught a Nightmare."
    },
    {
      "name": "Werewolf",
      "message": "It must be a full moon, a Werewolf appears."
    },
    {
      "name": "Phantom Fisher",
      "message": "The spirit of a long lost Phantom Fisher has come to haunt you."
    },
    {
      "name": "Grim Reaper",
      "message": "This can't be! The manifestation of death himself!"
    },
    {
      "name": "Nurse Shark",
      "message": "A tiny fin emerges from the water, you've caught a Nurse Shark."
    },
    {
      "name": "Blue Shark",
      "message": "You spot a fin as blue as the water it came from, it's a Blue Shark."
    },
    {
      "name": "Tiger Shark",
      "message": "A striped beast bounds from the depths, the wild Tiger Shark!"
    },
    {
      "name": "Great White Shark",
      "message": "Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!"
    },
    {
      "name": "Oasis Sheep",
      "message": "An Oasis Sheep appears from the water."
    },
    {
      "name": "Oasis Rabbit",
      "message": "An Oasis Rabbit appears from the water."
    },
    {
      "name": "Lava Blaze",
      "message": "A Lava Blaze has surfaced from the depths!"
    },
    {
      "name": "Lava Pigman",
      "message": "A Lava Pigman arose from the depths!"
    },
    {
      "name": "Flaming Worm",
      "message": "A Flaming Worm surfaces from the depths!",
      "categories": [ "worm" ]
    },
    {
      "name": "Water Worm",
      "message": "A Water Worm surfaces",
      "categories": [ "worm" ]
    },
    {
      "name": "Poisoned Water Worm",
      "message": "A Poisoned Water Worm surfaces",
      "categories": [ "worm" ]
    },
    {
      "name": "Abyssal Miner",
      "message": "An Abyssal Miner breaks out of the water!"
    },
    {
      "name": "Moogma",
      "message": "You hear a faint Moo from the lava... A Moogma appears.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Magma Slug",
      "message": "From beneath the lava appears a Magma Slug.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Pyroclastic Worm",
      "message": "You feel the heat radiating as a Pyroclastic Worm surfaces.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Lava Flame",
      "message": "A Lava Flame flies out from beneath the lava.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Fire Eel",
      "message": "A Fire Eel slithers out from the depths.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Lava Leech",
      "message": "A small but fearsome Lava Leech emerges.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Thunder",
      "message": "You hear a massive rumble as Thunder emerges.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Taurus",
      "message": "Taurus and his steed emerge.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Lord Jawbus",
      "message": "You have angered a legendary creature... Lord Jawbus has arrived.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Phlhlegblast",
      "message": "WOAH! A Plhlegblast appeared.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Fried Chicken",
      "message": "Smells of burning. Must be a Fried Chicken.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Fireproof Witch",
      "message": "Trouble's brewing, it's a Fireproof Witch!",
      "categories": [ "crimson" ]
    },
    {
      "name": "Fiery Scuttler",
      "message": "A Fiery Scuttler inconspicuously waddles up to you, friends in tow.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Ragnarok",
      "message": "The sky darkens and the air thickens. The end times are upon us: Ragnarok is here.",
      "categories": [ "crimson" ]
    },
    {
      "name": "Frog Man",
      "message": "Is it a frog? Is it a man? Well, yes, sorta, IT'S FROG MAN!!!!!!"
    },
    {
      "name": "Snapping Turtle",
      "message": "A Snapping Turtle is coming your way, and it's ANGRY!"
    },
    {
      "name": "Blue-Ringed Octopus",
      "message": "A garish set of tentacles arise. It's a Blue Ringed Octopus!"
    },
    {
      "name": "Wiki Tiki",
      "message": "The water bubbles and froths. A massive form emerges- you have disturbed the Wiki Tiki! You shall pay the price."
    },
    {
      "name": "Trash Gobbler",
      "message": "The Trash Gobbler is hungry for you!"
    },
    {
      "name": "Dumpster Diver",
      "message": "A Dumpster Diver has emerged from the swamp!"
    },
    {
      "name": "Banshee",
      "message": "The desolate wail of a Banshee breaks the silence."
    },
  
    {
      "name": "Bayou Sludge",
      "message": "A swampy mass of slime emerges, the Bayou Sludge!"
    },
    {
      "name": "Alligator",
      "message": "A long snout breaks the surface of the water. It's an Alligator!"
    },
    {
      "name": "Titanoboa",
      "message": "A massive Titanoboa surfaces. It's body stretches as far as the eye can see."
    },
    {
      "name": "Mithril Grubber",
      "message": "A leech of the mines surfaces... you've caught a Mithril Grubber."
    },
    {
      "name": "Medium Mithril Grubber",
      "message": "A leech of the mines surfaces... you've caught a Medium Mithril Grubber."
    },
    {
      "name": "Large Mithril Grubber",
      "message": "A leech of the mines surfaces... you've caught a Large Mithril Grubber."
    },
    {
      "name": "Bloated Mithril Grubber",
      "message": "A leech of the mines surfaces... you've caught a Bloated Mithril Grubber."
    }
];


function inCategory(creature, category) {
    return creature.categories?.includes(category) ?? false;
}

export const seaCreatures = allSeaCreatures.map(creature => creature.name);

export const seaCreaturesNW = allSeaCreatures.filter(creature => !inCategory(creature, "worm")).map(creature => creature.name);

export const seaCreatureMessages = allSeaCreatures.map(creature => creature.message);

const crimsonSeaCreatures =  allSeaCreatures.filter(creature => inCategory(creature, "crimson"));

export const CrimsonMessages = crimsonSeaCreatures.map(creature => creature.message);

export const CrimsonCreatures = crimsonSeaCreatures.map(creature => creature.name);

export const VialRegex = /^RARE DROP! Radioactive Vial \(\+\d+% ✯ Magic Find\)$/;

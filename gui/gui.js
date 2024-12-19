import { playerData } from "../data/data"
import { updateUI } from "../utils/newsettings/onClose"
import Manager from "./guiManager"

const ScalingModes = {
    X: "X",
    Y: "Y",
    BOTH: "BOTH",
    NONE: "NONE"
}

//*Creation of the UI Elements:

//?General Stuff

// BossBar
Manager.createElement("BossBar", "BossBar", true, 140, 85, 350, 9, 1, ScalingModes.X, [])

// Sea Creature Count
Manager.createElement("SeaCreatureCount", "TimedText", true, 5, 5, 10, 10, 1, ScalingModes.Y, {
    "Text": "&9&lCreatures: &e(1) &8(&e(2)&8)",
    "Hidden": false,
    "Placeholder": "&9&lCreatures: &e0 &8(&e0s&8)",
    "Times": {
        "(1)": [1],
        "(2)": 1734492015610
    }
})

// Bobber Count
Manager.createElement("BobberCount", "DataText", true, 5, 15, 10, 10, 1, ScalingModes.Y, {
    "Text": "&a&lBobbers: &e(1)",
    "Hidden": false,
    "Placeholder": "&a&lBobbers: &e0",
    "Data": {
        "(1)": 0
    }
})

// Phoenix Timer
Manager.createElement("PhoenixTimer", "TimedText", true, 5, 25, 10, 10, 1, ScalingModes.Y, {
    "Text": "&c&lPhoenix: &4&l(1)",
    "Hidden": false,
    "Placeholder": "&c&lPhoenix: &a&lActive",
    "Times": {
        "(1)": ["&a&lActive"]
    }
})

// Spirit Mask Timer
Manager.createElement("SpiritMaskTimer", "TimedText", true, 5, 35, 10, 10, 1, ScalingModes.Y, {
    "Text": "&f&lSpirit Mask: &4&l(1)",
    "Hidden": false,
    "Placeholder": "&f&lSpirit Mask: &a&lActive",
    "Times": {
        "(1)": ["&a&lActive"]
    }
})

// Power Orb Timer
Manager.createElement("PowerOrbTimer", "DataText", true, 5, 45, 10, 10, 1, ScalingModes.Y, {
    "Text": "&d&lPower Orb: &e(1)",
    "Hidden": false,
    "Placeholder": "&d&lPower Orb: &eNo Orb",
    "Data": {
        "(1)": "No Orb"
    }
})

// Flare Timer
Manager.createElement("FlareTimer", "DataText", true, 5, 55, 10, 10, 1, ScalingModes.Y, {
    "Text": "&6&lFlare: &e(1) &b(2)",
    "Hidden": false,
    "Placeholder": "&d&lPower Orb: &eNo Flare",
    "Data": {
        "(1)": "No Flare",
        "(2)": ""
    }
})

// Totem Timer
Manager.createElement("TotemTimer", "DataText", true, 140, 55, 10, 10, 1, ScalingModes.Y, {
    "Text": "&5&lTotem: &e(1)",
    "Hidden": false,
    "Placeholder": "&5&lTotem: &eNo Totem",
    "Data": {
        "(1)": "No Totem"
    }
})

// Rod Timer
Manager.createElement("RodTimer", "DataText", true, 5, 65, 10, 10, 1, ScalingModes.Y, {
    "Text": "",
    "Hidden": false,
    "Placeholder": "&c&lClick!",
    "Data": {}
})

// Sea Creatures Per Hour
Manager.createElement("SeaCreatureHour", "TimedText", true, 140, 5, 10, 10, 1, ScalingModes.Y, {
        "Text": "&8&lSc/h: &e&l(1) ((2) in (3))",
        "Hidden": false,
        "Placeholder": "&8&lSc/h: &e&l0 (0 in 0s)",
        "Times": {
            "(1)": [400],
            "(2)": [800],
            "(3)": 1734492015610
        }
})

//?Tfish Stuff

//Golden Fish Timer
Manager.createElement("GoldenFishTimer", "TimedText", true, 5, 75, 10, 30, 1, ScalingModes.Y, {
    "Text": "&e&lGolden Fish\n&6Next Spawn: &f(1)\n&6Cast Until: &f(2)",
    "Hidden": false,
    "Placeholder": "&e&lGolden Fish\n&6Next Spawn: &f8m 0s\n&6Cast Until: &f3m 0s",
    "Times": {
        "(1)": "8m 0s",
        "(2)": "3m 0s"
    }
})

//?Crimson Isle Stuff

// Plhlegblast Timer
Manager.createElement("PlhlegblastTimer", "TimedText", true, 140, 15, 10, 10, 1, ScalingModes.Y, {
    "Text": "&4&lPlhlegblast: &e&l(1) ((2)) &7&l(3)",
    "Hidden": false,
    "Placeholder": "&4&lPlhlegblast: &e&l0 (0) &7&l0s",
    "Times": {
        "(1)": [152],
        "(2)": [255],
        "(3)": 1734492015610
    }
})

// Jawbus Timer
Manager.createElement("JawbusTimer", "TimedText", true, 140, 25, 10, 10, 1, ScalingModes.Y, {
    "Text": "&c&lJawbus: &e&l(1) ((2)) &7&l(3)",
    "Hidden": false,
    "Placeholder": "&4&lJawbus: &e&l0 (0) &7&l0s",
    "Times": {
        "(1)": [152],
        "(2)": [255],
        "(3)": 1734492015610
    }
})

// Thunder Timer
Manager.createElement("ThunderTimer", "TimedText", true, 140, 35, 10, 10, 1, ScalingModes.Y, {
    "Text": "&b&lThunder: &e&l(1) ((2)) &7&l(3)",
    "Hidden": false,
    "Placeholder": "&b&lThunder: &e&l0 (0) &7&l0s",
    "Times": {
        "(1)": [152],
        "(2)": [255],
        "(3)": 1734492015610
    }
})

// Vanquisher Timer
Manager.createElement("VanquisherTimer", "TimedText", true, 140, 45, 10, 10, 1, ScalingModes.Y, {
    "Text": "&5&lVanquisher: &e&l(1) ((2)) &7&l(3)",
    "Hidden": false,
    "Placeholder": "&5&lVanquisher: &e&l0 (0) &7&l0s",
    "Times": {
        "(1)": [152],
        "(2)": [255],
        "(3)": 1734492015610
    }
})

//Jawbus Vial Timer

Manager.createElement("JawbusVialTimer", "TimedText", true, 140, 65, 10, 10, 1, ScalingModes.Y, {
    "Text": "&cJawbus &6since &aVial&6: &f(1) ((2)) &e(3)",
    "Hidden": false,
    "Placeholder": "&5&lVanquisher: &e&l0 (0) &7&l0s",
    "Times": {
        "(1)": [152],
        "(2)": [255],
        "(3)": 1734492015610
    }
})

//?Pet Stuff

//Pet Display

Manager.createElement("PetDisplay", "DataText", true, 140, 75, 10, 10, 1, ScalingModes.Y, {
    "Text": "&7[Lvl (1)] (2)(3)",
    "Hidden": false,
    "Placeholder": "&7[Lvl 100] &6Flying Fish",
    "Data": {
        "(1)": 100,
        "(2)": "",
        "(3)": "&6Flying Fish"
    }
})

//? Code to convert OLD gui positioning
const oldToNewMap = {
    "CrimsonBossBar" : "BossBar",
    "SeaCreatures" : "SeaCreatureCount",
    "Bobbers" : "BobberCount",
    "creatureHour" : "SeaCreatureHour",
    "Power Orb" : "PowerOrbTimer",
    "plhlegblast" : "PlhlegblastTimer",
    "jawbus": "JawbusTimer",
    "thunder" : "ThunderTimer",
    "vanquisher": "VanquisherTimer",
    "Pet": "PetDisplay",
    "Totem": "TotemTimer",
    "Vial": "JawbusVialTimer",
    "Phoenix": "PhoenixTimer",
    "SpiritMask": "SpiritMaskTimer",
    "Flare": "FlareTimer",
    "FishingRod": "RodTimer",
    "GoldenFish": "GoldenFishTimer"
}

if(!playerData.GUI.Updated) {
    let oldToggle = playerData.GUI.Toggle
    let oldTogglePets = playerData.GUI.TogglePets
    Object.keys(playerData.GUI).forEach((key) => {
        let data = playerData.GUI[key]
        let newKey = oldToNewMap[key]
        if(newKey) {
            Manager.updateElement(newKey, undefined, data[0], data[1], data[3]/data[2], data[4]/data[2], data[2])
        }
    })
    playerData["GUI"] = {
        Updated : true,
        Toggle : oldToggle,
        TogglePets : oldTogglePets
    }

    playerData.save()
}

updateUI()

Manager.saveData()
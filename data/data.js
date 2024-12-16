import PogObject from "../../PogData";

export let playerData = new PogObject('RiccioFishingUtils', {
    "PARTY": {
        "logOff": 564004800000,
        "inParty": false,
        "isLeader": false
    },
    "SETTINGS": {
        "WarnBait": true,
        "BaitBag": true,
        "Inventory": true
    },
    "WORM": {
        "Timer": 564004800000,
        "TTimer": 564004800000,
    },
    "GUI": {
        "Toggle": true,
        "TogglePets": false,
        "SeaCreatures": [3, 20, 1, 8 ,8]
    },
    "GENERALFISHING": {
        "Sound": false
    },
    "FISHING": {
        "SeaTimer": 564004800000,
        "SeaTTimer": 564004800000,
        "Tbottle": 564004800000
    },
    "PETS": {
        "EquippedPet": 'None',
        "PetLevel": 0,
        "CosmeticLevel": 0,
        "Skinned": false
    }
}, 'data/playerData.json');
//'Magma Slug', 'Moogma', 'Lava Leech', 'Pyroclastic Worm', 'Lava Flame', 'Fire Eel', 'Taurus', 'Plhlegblast', 'Thunder', 'Lord Jawbus'
export let seaCreatureData = new PogObject('RiccioFishingUtils', {
    "CATCHES":{
        "LastCatch": 564004800000,
        "ThisCatches": 0,
        "FirstCatch": 564004800000
    },
    "DROPS": {
        "RadioactiveVial": 0,
        "RadioactiveVialTime": 564004800000,
        "VialHistory": [],
        "Flash": 0,
        "FlashTime": 564004800000,
        "FlashHistory": []
    },
    "CRIMSON": {
        "PlhlegblastCount": 1,
        "PlhlegblastTime": 564004800000,
        "JawbusCount": 1,
        "JawbusTime": 564004800000,
        "ThunderCount": 1,
        "ThunderTime": 564004800000,
        "VanquisherCount": 0,
        "VanquisherTime": 564004800000,
        "Plhlegblast": 0,
        "Lord Jawbus": 0,
        "Thunder": 0,
        "Taurus": 0,
        "Fire Eel": 0,
        "Lava Flame": 0,
        "Pyroclastic Worm": 0,
        "Lava Leech": 0,
        "Moogma": 0,
        "Magma Slug": 0,
        "PlhlegblastAllCount": [],
        "JawbusAllCount": [],
        "ThunderAllCount": [],
        "VanquisherAllCount": [],
    },
    "GOLDEN": {
        "StartTime": 564004800000,
        "LastCast": 564004800000,
        "Cooking": false
    }
}, 'data/seaCreatureData.json');
import Settings from "../../AmaterasuModded/core/Settings"
import DefaultConfig from "../../Amaterasu/core/DefaultConfig"
import { playerData } from "../data/data"
import oldValues from "../utils/settings"

const config = new DefaultConfig("RiccioFishingUtils", "settings/settings.json")

.addSwitch({
    category: "Chat Commands",
    configName: "partyCommands",
    title: "Toggle Party Commands",
    description: "Enable the party commands",
    subcategory: "Party Commands",
    value : true
})
.addSlider({
    category: "Chat Commands",
    configName: "partyCooldown",
    title: "Command Cooldown",
    description: "Cooldown between commands in seconds, default: 1s",
    options: [0, 60],
    value: 1,
    subcategory: "General Commands"
})
.addTextInput({
    category: "Chat Commands",
    configName: "partyPrefix",
    title: "Command Prefix",
    description: "The prefix used for commands, default: !",
    value: "!",
    placeHolder: "",
    subcategory: "General Commands"
})
.addSwitch({
    category: "Chat Commands",
    configName: "partyJoinHelp",
    title: "New Member Help Command",
    description: "Runs the help command whenever a new player joins",
    subcategory: "Party Commands",
    value: false
})
.addSwitch({
    category: "Chat Commands",
    configName: "partyJoinHelpLeader",
    title: "● Leader Only New Member Help",
    description: "Only triggers the New Member Help if you`re party leader",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyHelp",
    title: "help",
    description: "Enable the help command",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyInvite",
    title: "invite",
    description: "Enable the invite command",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyWarp",
    title: "warp",
    description: "Enable the warp command",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyToggleWarp",
    title: "togglewarp",
    description: "Enable the togglewarp command, which allows a player in the party to get kicked before warping and repartied",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyTransfer",
    title: "transfer",
    description: "Enable the transfer and pt command",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyAllinvite",
    title: "allinvite",
    description: "Enable the allinvite command",
    subcategory: "Party Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "partyCoords",
    title: "coords",
    description: "Enable the coords command",
    subcategory: "Party Commands",
    value: true
})
.addSwitch({
    category: "Chat Commands",
    configName: "partyWarpMuted",
    title: "Warp on Im muted!",
    description: "Makes it so the im muted message warps the party",
    subcategory: "Party Commands",
    value: false
})
.addTextInput({
    category: "Chat Commands",
    configName: "partyBlacklist",
    title: "Command Blacklist",
    description: "players who wont be able to use chat commands, use commas to separate names, example: steve,alex,joe",
    value: "",
    placeHolder: "",
    subcategory: "General Commands"
})
.addToggle({
    category: "Chat Commands",
    configName: "infoJawbus",
    title: "jawbusinfo",
    description: "Enable the jawbusinfo command, which sends your jawbus count/avg and last jawbus time in chat",
    subcategory: "Info Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "infoThunder",
    title: "thunderinfo",
    description: "Enable the jawbusinfo command, which sends your thunder count/avg and last thunder time in chat",
    subcategory: "Info Commands",
    value: true
})
.addToggle({
    category: "Chat Commands",
    configName: "infoVial",
    title: "vialinfo",
    description: "Enable the vialinfo command, which sends your vial jawbus count and last vial time in chat",
    subcategory: "Info Commands",
    value: true
})
.addSwitch({
    category: "Crystal Hollows Fishing",
    configName: "wormToggle",
    title: "Toggle Worm Counter",
    description: "Enables the worm fishing counters\nMust be on if you want to use any features below",
    subcategory: "Worm Fishing",
    value: true
})
.addSwitch({
    category: "Crystal Hollows Fishing",
    configName: "wormMessageToggle",
    title: "Toggle worm party messages",
    description: "Sends messages whenever a certain number of worms is spawned",
    subcategory: "Worm Fishing",
    value: false
})
.addSlider({
    category: "Crystal Hollows Fishing",
    configName: "wormLimit",
    title: "● Worm number message alert",
    description: "Set the number of worms needed to send the message\nif you use 59 ur weird ¯\\_(ツ)_/¯",
    options: [1, 60],
    value: 60,
    subcategory: "Worm Fishing"
})
.addTextInput({
    category: "Crystal Hollows Fishing",
    configName: "wormMessage",
    title: "● Worm party message",
    description: "Customize the worm cap message.\n write ([number]) to show the worm count, write ([time]) to show the time it took",
    value: "Worm cap reached! ([number]) worms in ([time])",
    placeHolder: "",
    subcategory: "Worm Fishing"
})
.addSwitch({
    category: "Crystal Hollows Fishing",
    configName: "wormTitleToggle",
    title: "Alert worm count on screen",
    description: "Sends the message in the middle of screen through titles",
    subcategory: "Worm Fishing",
    value: true
})
.addSlider({
    category: "Crystal Hollows Fishing",
    configName: "wormTitleLimit",
    title: "● Worm number title alert",
    description: "Set the number of worms needed to show the title message",
    options: [1, 60],
    value: 60,
    subcategory: "Worm Fishing"
})
.addTextInput({
    category: "Crystal Hollows Fishing",
    configName: "wormTitleMessage",
    title: "● Worm Cap Title message",
    description: "Customize the worm count title message.\n write ([number]) to show the worm count, write ([time]) to show the time it took",
    value: "&cWorm cap reached!",
    placeHolder: "",
    subcategory: "Worm Fishing"
})
.addTextInput({
    category: "Crystal Hollows Fishing",
    configName: "wormTitleMessageSubtitle",
    title: "● Worm Cap Title message subtitle",
    description: "Customize the text below the title message.\n write ([number]) to show the worm count, write ([time]) to show the time it took",
    value: "&c([number]) worms in ([time])!",
    placeHolder: "",
    subcategory: "Worm Fishing"
})
.addSwitch({
    category: "Crystal Hollows Fishing",
    configName: "wormSoundToggle",
    title: "Toggle worm count Sound",
    description: "Plays a sound when there is a certain number of worms",
    subcategory: "Worm Fishing",
    value: true
})
.addSwitch({
    category: "Crystal Hollows Fishing",
    configName: "wormNametagToggle",
    title: "Hide worm nametag",
    description: "Hides the worms nametags, you wont know the hp tho ¯\\_(ツ)_/¯",
    subcategory: "Worm Fishing",
    value: false
})
.addSlider({
    category: "Crystal Hollows Fishing",
    configName: "wormSoundLimit",
    title: "● Worm number sound",
    description: "Set the number of worms needed to play the sound",
    options: [1, 60],
    value: 60,
    subcategory: "Worm Fishing"
})
.addTextInput({
    category: "Crystal Hollows Fishing",
    configName: "wormSound",
    title: "● Worm Sound",
    description: "Customize the worm count sound, Default: random.orb",
    value: "random.orb",
    placeHolder: "",
    subcategory: "Worm Fishing"
})
.addSlider({
    category: "Crystal Hollows Fishing",
    configName: "wormSoundVolume",
    title: "● Worm sound volume",
    description: "The volume of the worm count sound",
    options: [0.001, 1],
    value: 1,
    subcategory: "Worm Fishing"
})
.addSlider({
    category: "Crystal Hollows Fishing",
    configName: "wormSoundPitch",
    title: "● Worm sound pitch",
    description: "The pitch of the worm count sound",
    options: [0, 200],
    value: 100,
    subcategory: "Worm Fishing"
})
.addSwitch({
    category: "Deployables",
    configName: "totemToggle",
    title: "Toggle corruption totem tracker",
    description: "Enable corruption totem utils\nMust be on if you want to use any features below",
    subcategory: "Corruption Totem",
    value: true
})
.addSwitch({
    category: "Deployables",
    configName: "totemTitleToggle",
    title: "Alert Totem Expired on Screen",
    description: "Sends the message in the middle of screen through titles",
    subcategory: "Corruption Totem",
    value: true
})
.addTextInput({
    category: "Deployables",
    configName: "totemTitleMessage",
    title: "● Totem Expired Title message",
    description: "Customize the totem expired title message.",
    value: "&5Corruption Totem Expired!",
    placeHolder: "",
    subcategory: "Corruption Totem"
})
.addSwitch({
    category: "Deployables",
    configName: "totemMessageToggle",
    title: "Toggle corruption totem expire messages",
    description: "Sends messages whenever the corruption totem expires",
    subcategory: "Corruption Totem",
    value: false
})
.addSwitch({
    category: "Deployables",
    configName: "totemTimerToggle",
    title: "Toggle corruption totem timer",
    description: "Shows the corruption totem timer on your screen\n/rfumove to move it",
    subcategory: "Corruption Totem",
    value: true
})
.addSwitch({
    category: "General Fishing",
    configName: "seaCreatureCounterToggle",
    title: "Toggle Sea Creature Counter",
    description: "Enable Counter Utilities, must be on to use any features below",
    subcategory: "Creature Counting",
    value: true
})
.addSwitch({
    category: "General Fishing",
    configName: "seaCreatureCounterUiToggle",
    title: "Sea Creature Counter UI",
    description: "Shows the amount of sea creatures on your screen",
    subcategory: "Creature Counting",
    value: true
})
.addToggle({
    category: "General Fishing",
    configName: "seaCreatureCountWorms",
    title: "Count worms anyways",
    description: "Makes it so the features that dont count worms in this page also count worms",
    subcategory: "Other Settings",
    value: false
})
.addSwitch({
    category: "General Fishing",
    configName: "seaCreatureSoundToggle",
    title: "Toggle sea creature count Sound",
    description: "Plays a sound when there is a certain amount of sea creatures, doesnt count worms",
    subcategory: "Creature Counting",
    value: false
})
.addSlider({
    category: "General Fishing",
    configName: "seaCreatureSoundLimit",
    title: "● Sea creature number sound",
    description: "Set the number of sea creatures needed to play the sound",
    options: [1, 60],
    value: 15,
    subcategory: "Creature Counting"
})
.addTextInput({
    category: "General Fishing",
    configName: "seaCreatureSound",
    title: "● Sea creature count Sound",
    description: "Customize the sea creature sound, Default: random.orb",
    value: "random.orb",
    placeHolder: "",
    subcategory: "Creature Counting"
})
.addSlider({
    category: "General Fishing",
    configName: "seaCreatureSoundVolume",
    title: "● Sea creature sound volume",
    description: "The volume of the sea creature sound",
    options: [0.001, 1],
    value: 1,
    subcategory: "Creature Counting"
})
.addSlider({
    category: "General Fishing",
    configName: "seaCreatureSoundPitch",
    title: "● Sea creature sound pitch",
    description: "The pitch of the sea creature sound",
    options: [0, 200],
    value: 100,
    subcategory: "Creature Counting"
})
.addSwitch({
    category: "General Fishing",
    configName: "seaCreatureTitleToggle",
    title: "Alert sea creature count on screen",
    description: "Sends the message in the middle of screen through titles, doesnt count worms",
    subcategory: "Creature Counting",
    value: true
})
.addSlider({
    category: "General Fishing",
    configName: "seaCreatureTitleLimit",
    title: "● Creature number title alert",
    description: "Set the number of sea creatures needed to show the title message, wont count worms\nif you're a barn fisher, please use this on 10-30",
    options: [1, 60],
    value: 15,
    subcategory: "Creature Counting"
})
.addTextInput({
    category: "General Fishing",
    configName: "seaCreatureTitleMessage",
    title: "● Sea Creature Title message",
    description: "Customize the sea creature count title message.\n write ([number]) to show the catch count, write ([time]) to show the time it took",
    value: "&4&lKill Creatures!",
    placeHolder: "",
    subcategory: "Creature Counting"
})
.addTextInput({
    category: "General Fishing",
    configName: "seaCreatureTitleMessageSubtitle",
    title: "● Sea Creature Title message subtitle",
    description: "Customize the text below the title message.\n write ([number]) to show the catch count, write ([time]) to show the time it took",
    value: "&e([number]) sea creatures in ([time])!",
    placeHolder: "",
    subcategory: "Creature Counting"
})
.addSwitch({
    category: "General Fishing",
    configName: "seaCreatureMessageToggle",
    title: "Toggle sea creature party messages",
    description: "Sends messages whenever a certain number of sea creatures is spawned, wont count worms",
    subcategory: "Creature Counting",
    value: false
})
.addSlider({
    category: "General Fishing",
    configName: "seaCreatureLimit",
    title: "● Sea Creature number message alert",
    description: "Set the number of sea creatures needed to send the message",
    options: [1, 60],
    value: 60,
    subcategory: "Creature Counting"
})
.addTextInput({
    category: "General Fishing",
    configName: "seaCreatureMessage",
    title: "● Sea Creature party message",
    description: "Customize the sea creature count message.\n write ([number]) to show the sea creature count, write ([time]) to show the time it took",
    value: "Reached ([number]) sea creatures in ([time])",
    placeHolder: "",
    subcategory: "Creature Counting"
})
.addSwitch({
    category: "General Fishing",
    configName: "bobberUIToggle",
    title: "Toggle bobber counter UI",
    description: "Shows the bobber count on your screen\n/rfumove to move it",
    subcategory: "Bobbin Features",
    value: true
})
.addSwitch({
    category: "General Fishing",
    configName: "seacreatureHourUIToggle",
    title: "Sea creatures per hour UI",
    description: "Shows the status for jawbus",
    subcategory: "Creature Counting",
    value: true
})
.addSlider({
    category: "General Fishing",
    configName: "seacreatureHourResetTime",
    title: "● Sc/hr time to reset",
    description: "The amount of downtime it takes for the sc/h counter to reset in minutes",
    options: [1, 60],
    value: 30,
    subcategory: "Creature Counting"
})
.addSwitch({
    category: "General Fishing",
    configName: "doubleHookMessageToggle",
    title: "Toggle double hook messages",
    description: "Sends messages whenever you get a double hoook",
    subcategory: "Double Hook",
    value: false
})
.addTextInput({
    category: "General Fishing",
    configName: "doubleHookMessage",
    title: "● Double hook message",
    description: "Customize the double hook message.You can add multiple messages that will play in order separated by \"|\"",
    value: "><))))`> <'((((><|><))))`> ❤ <'((((><|><))))`> ><))`>|<'((>< <'((((><",
    placeHolder: "",
    subcategory: "Double Hook"
})
.addSwitch({
    category: "General Fishing",
    configName: "doubleHookRandomToggle",
    title: "● Toggle random messages",
    description: "Makes double hook messages random from the list of messages\n&8Older ([random]) in the messages still works.",
    subcategory: "Double Hook",
    value: false
})
.addSwitch({
    category: "General Fishing",
    configName: "generalHideUIToggle",
    title: "Hide UI if not relevant - General",
    description: "Hides the UIs in this page if not fishing",
    subcategory: "Other Settings",
    value: false
})
.addSwitch({
    category: "General Fishing",
    configName: "creatureDhHideToggle",
    title: "Hide creature/dh messages",
    description: "Hides the dh/creature chat messages",
    subcategory: "Other Settings",
    value: false
})
.addSwitch({
    category: "Deployables",
    configName: "fluxToggle",
    title: "Toggle power orb tracker",
    description: "Enable power orb utils\nMust be on if you want to use any features below",
    subcategory: "Power Orbs",
    value: true
})
.addSwitch({
    category: "Deployables",
    configName: "fluxTitleToggle",
    title: "Alert power orb expired on screen",
    description: "Sends the message in the middle of screen through titles",
    subcategory: "Power Orbs",
    value: true
})
.addTextInput({
    category: "Deployables",
    configName: "fluxTitleMessage",
    title: "● Power orb expired title message",
    description: "Customize the power orb expired title message.",
    value: "&dPower Orb Expired!",
    placeHolder: "",
    subcategory: "Power Orbs"
})
.addSwitch({
    category: "Deployables",
    configName: "fluxMessageToggle",
    title: "Toggle power orb expired messages",
    description: "Sends messages whenever the power orb expires",
    subcategory: "Power Orbs",
    value: false
})
.addSwitch({
    category: "Deployables",
    configName: "fluxTimerToggle",
    title: "Toggle power orb timer",
    description: "Shows the power orb timer on your screen\n/rfumove to move it",
    subcategory: "Power Orbs",
    value: true
})
.addSwitch({
    category: "Deployables",
    configName: "flareToggle",
    title: "Toggle flare tracker",
    description: "Enable flare utils\nMust be on if you want to use any features below",
    subcategory: "Flares",
    value: true
})
.addSwitch({
    category: "Deployables",
    configName: "flareTitleToggle",
    title: "Alert flare expired on screen",
    description: "Sends the message in the middle of screen through titles",
    subcategory: "Flares",
    value: true
})
.addTextInput({
    category: "Deployables",
    configName: "flareTitleMessage",
    title: "● Flare expired title message",
    description: "Customize the flare expired title message.",
    value: "&6Flare Expired!",
    placeHolder: "",
    subcategory: "Flares"
})
.addSwitch({
    category: "Deployables",
    configName: "flareMessageToggle",
    title: "Toggle flare expired messages",
    description: "Sends messages whenever the flare expires",
    subcategory: "Flares",
    value: false
})
.addSwitch({
    category: "Deployables",
    configName: "flareTimerToggle",
    title: "Toggle flare timer",
    description: "Shows the flare timer on your screen\n/rfumove to move it",
    subcategory: "Flares",
    value: true
})
.addTextInput({
    category: "Deployables",
    configName: "deployableMessage",
    title: "Deployable chat message",
    description: "Customize the deployable expired message. Write ([deployable]) to show the deployable's name",
    value: "([tableflip]) ([deployable]) Expired!",
    placeHolder: "",
    subcategory: "All Deployables"
})
.addSwitch({
    category: "Deployables",
    configName: "deployableSoundToggle",
    title: "Toggle deployable sound",
    description: "Plays a sound when a flare expires",
    subcategory: "All Deployables", 
    value: false
})
.addTextInput({
    category: "Deployables",
    configName: "deployableSound",
    title: "● Deployable expired sound",
    description: "Customize the deployable expired sound, Default: mob.irongolem.death",
    value: "mob.irongolem.death",
    placeHolder: "",
    subcategory: "All Deployables"
})
.addSlider({
    category: "Deployables",
    configName: "deployableSoundVolume",
    title: "● Deployable sound volume",
    description: "The volume of the deployable expired sound",
    options: [0.001, 1],
    value: 1,
    subcategory: "All Deployables"
})
.addSlider({
    category: "Deployables",
    configName: "deployableSoundPitch",
    title: "● Deployable sound pitch",
    description: "The pitch of the deployable expired sound",
    options: [0, 200],
    value: 100,
    subcategory: "All Deployables"
})
.addSwitch({
    category: "Deployables",
    configName: "deployableHideToggle",
    title: "Hide UI if not present",
    description: "Hides the UI if there is no deployable",
    subcategory: "All Deployables",
    value: false
})
.addSwitch({
    category: "Player Stats",
    configName: "manaTitleToggle",
    title: "Alert when mana goes below a percentage",
    description: "Sends the message in the middle of screen through titles",
    subcategory: "Mana",
    value: true
})
.addSlider({
    category: "Player Stats",
    configName: "manaWarnPercentage",
    title: "● Mana percentage",
    description: "The percentage needed for the title message",
    options: [0.001, 1],
    value: 0.3,
    subcategory: "Mana"
})
.addTextInput({
    category: "Player Stats",
    configName: "manaTitleMessage",
    title: "● Mana low Title message",
    description: "Customize the mana low title message.",
    value: "&b&lMana low!",
    placeHolder: "",
    subcategory: "Mana"
})
.addSwitch({
    category: "Pets",
    configName: "petDisplayToggle",
    title: "Toggle pet display",
    description: "Shows the currently equipped pet on your screen\n/rfumove to move it",
    subcategory: "Pet Display",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "bossHealthBarToggle",
    title: "Toggle boss health bar",
    description: "Shows a health bar for bosses on your screen\n/rfumove to move it",
    subcategory: "Boss Bar",
    value: true
})
.addSlider({
    category: "Crimson Fishing",
    configName: "BossHealthBarLength",
    title: "● Boss health bar length",
    description: "Change the length of the health bar",
    options: [200, 600],
    value: 200,
    subcategory: "Boss Bar"
})
.addToggle({
    category: "Crimson Fishing",
    configName: "jawbusHealthBarToggle",
    title: "● Toggle jawbus health bar",
    description: "Shows a health bar for jawbus on the boss bar",
    subcategory: "Boss Bar",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "thunderHealthBarToggle",
    title: "● Toggle thunder health bar",
    description: "Shows a health bar for thunder on the boss bar",
    subcategory: "Boss Bar",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "plhlegblastHealthBarToggle",
    title: "● Toggle plhlegblast health bar",
    description: "Shows a health bar for plhlegblast on the boss bar",
    subcategory: "Boss Bar",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "fishermanTrackingToggle",
    title: "Toggle fisherman tracking",
    description: "Saves the location of fishermans upon seeing them fish and detects player deaths",
    subcategory: "Fisherman Tracking",
    value: false
})
.addToggle({
    category: "Crimson Fishing",
    configName: "jawbusDeathWarnToggle",
    title: "● Warn upon Jawbus Death",
    description: "Warns you if a player dies to jawbus",
    subcategory: "Fisherman Tracking",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "thunderDeathWarnToggle",
    title: "● Warn upon Thunder Death",
    description: "Warns you if a player dies to thunder",
    subcategory: "Fisherman Tracking",
    value: false
})
.addSlider({
    category: "Crimson Fishing",
    configName: "deathWarnCooldown",
    title: "● Warn cooldown",
    description: "The minimum amount of time in seconds between warns",
    options: [0, 300],
    value: 60,
    subcategory: "Fisherman Tracking"
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "deathWarnCoordsToggle",
    title: "● Player coords on warn",
    description: "Shows you the last known coords of the fisherman who died",
    subcategory: "Fisherman Tracking",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "deathWarnRenderToggle",
    title: "● Render box on coords on warn",
    description: "Renders a box in the last known coords of the fisherman who died, getting close to it will stop showing it\nrequires player coords on warn to be active",
    subcategory: "Fisherman Tracking",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "deathWarnSoundToggle",
    title: "● Sound on warn",
    description: "Plays a sound whenever someone dies to one of the rare creatures",
    subcategory: "Fisherman Tracking",
    value: true
})
.addSlider({
    category: "Crimson Fishing",
    configName: "deathWarnSoundVolume",
    title: "● Warn sound volume",
    description: "The volume of the death warn sound",
    options: [0.001, 1],
    value: 0.1,
    subcategory: "Fisherman Tracking"
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "plhlegblastUIToggle",
    title: "Plhlegblast UI",
    description: "Shows the status for plhlegblast",
    subcategory: "Mythic Creatures UI",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "jawbusUIToggle",
    title: "Jawbus UI",
    description: "Shows the status for jawbus",
    subcategory: "Mythic Creatures UI",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "thunderUIToggle",
    title: "Thunder UI",
    description: "Shows the status for thunder",
    subcategory: "Mythic Creatures UI",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "vanquisherUIToggle",
    title: "Vanquisher UI",
    description: "Shows the status for vanquishers",
    subcategory: "Vanquisher",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "mythicMessageToggle",
    title: "Toggle Mythic Creature party messages",
    description: "Sends messages whenever you spawn a mythic sc",
    subcategory: "Mythic Creatures Messages",
    value: true
})
.addTextInput({
    category: "Crimson Fishing",
    configName: "mythicPlhlegblastMessage",
    title: "● Plhlegblast",
    description: "Customize the plhlegblast message.\n write ([number]) to show the catch count, write ([time]) to show the time it took , write ([coords]) to show the coords, write ([double]) on where you want \"Double\" on whenever you get a dh, leave empty to disable it",
    value: "([hooray]) ([double])Plhlegblast (([number]) catches, ([time]))",
    placeHolder: "",
    subcategory: "Mythic Creatures Messages"
})
.addTextInput({
    category: "Crimson Fishing",
    configName: "mythicJawbusMessage",
    title: "● Jawbus",
    description: "Customize the jawbus message.\n write ([number]) to show the catch count, write ([time]) to show the time it took , write ([coords]) to show the coords, write ([double]) on where you want \"Double\" on whenever you get a dh, leave empty to disable it",
    value: "([surprised]) ([double])Lord Jawbus (([number]) catches, ([time]))",
    placeHolder: "",
    subcategory: "Mythic Creatures Messages"
})
.addTextInput({
    category: "Crimson Fishing",
    configName: "mythicThunderMessage",
    title: "● Thunder",
    description: "Customize the thunder message.\n write ([number]) to show the catch count, write ([time]) to show the time it took , write ([coords]) to show the coords, write ([double]) on where you want \"Double\" on whenever you get a dh, leave empty to disable it",
    value: "([mixface]) ([double])Thunder (([number]) catches, ([time]))",
    placeHolder: "",
    subcategory: "Mythic Creatures Messages"
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "vanquisherMessageToggle",
    title: "Toggle vanquisher party messages",
    description: "Sends messages whenever you spawn a vanquisher",
    subcategory: "Vanquisher",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "mythicDetectionToggle",
    title: "Toggle Mythic Creature Detection",
    description: "Warns you if there is a mythic creature nearby",
    subcategory: "Mythic Creatures Detection",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "plhlegblastDetectionToggle",
    title: "● Plhlegblast Detection",
    description: "Warns you if there is a plhlegblast nearby",
    subcategory: "Mythic Creatures Detection",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "jawbusDetectionToggle",
    title: "● Jawbus Detection",
    description: "Warns you if there is a jawbus nearby",
    subcategory: "Mythic Creatures Detection",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "thunderDetectionToggle",
    title: "● Thunder Detection",
    description: "Warns you if there is a thunder nearby",
    subcategory: "Mythic Creatures Detection",
    value: true
})
.addTextInput({
    category: "Crimson Fishing",
    configName: "mythicDetectionMessage",
    title: "● Mythic Creature Detection Title",
    description: "Customize the detection message. Write ([mob]) to see the mob name",
    value: "&4&l([mob]) detected!",
    placeHolder: "",
    subcategory: "Mythic Creatures Detection"
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "mythicDetectionSoundToggle",
    title: "● Sound on detection",
    description: "Plays a sound whenever a mythic creature is detected",
    subcategory: "Mythic Creatures Detection",
    value: true
})
.addSlider({
    category: "Crimson Fishing",
    configName: "mythicDetectionSoundVolume",
    title: "● Mythic detection sound volume",
    description: "The volume of the death warn sound",
    options: [0.001, 1],
    value: 1,
    subcategory: "Mythic Creatures Detection"
})
.addTextInput({
    category: "Crimson Fishing",
    configName: "vanquisherMessage",
    title: "● Vanquisher message",
    description: "Customize the vanquisher message.\n write ([number]) to show the kill count, write ([time]) to show the time it took , write ([coords]) to show the coords",
    value: "Vanquisher (([number]) sea creature kills, ([time]))",
    placeHolder: "",
    subcategory: "Vanquisher"
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "mythicLootshareToggle",
    title: "Toggle Mythic Creature lootshare range",
    description: "shows you the lootshare range if there is a mythic creature nearby",
    subcategory: "Mythic Creatures Lootsharing",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "mythicLootsharePlhlegblastToggle",
    title: "● Plhlegblast lootshare range",
    description: "shows you the lootshare range if there is a plhlegblast nearby",
    subcategory: "Mythic Creatures Lootsharing",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "mythicLootshareJawbusToggle",
    title: "● Jawbus lootshare range",
    description: "shows you the lootshare range if there is a jawbus nearby",
    subcategory: "Mythic Creatures Lootsharing",
    value: true
})
.addToggle({
    category: "Crimson Fishing",
    configName: "mythicLootshareThunderToggle",
    title: "● Thunder lootshare range",
    description: "shows you the lootshare range if there is a thunder nearby",
    subcategory: "Mythic Creatures Lootsharing",
    value: true
})
.addSwitch({
    category: "Crimson Fishing",
    configName: "crimsonHideUIToggle",
    title: "Hide UI if not relevant - Crimson",
    description: "Hides the UIs in this page if not fishing in a relevant spot",
    subcategory: "Other Settings",
    value: false
})
.addSwitch({
    category: "Rare Drops",
    configName: "vialMessageToggle",
    title: "Toggle radioactive vial message",
    description: "Sends messages upon dropping vial",
    subcategory: "Radioactive Vial",
    value: true
})
.addTextInput({
    category: "Rare Drops",
    configName: "vialMessage",
    title: "● Vial dropped message",
    description: "Customize the vial message.\n write ([number]) to show the kill count, write ([time]) to show the time it took, write ([mf]) for magic find",
    value: "RARE DROP! Radioactive Vial (+([mf])% ✯ Magic Find (([number]) Jawbus Kills, ([time]))",
    placeHolder: "",
    subcategory: "Radioactive Vial"
})
.addToggle({
    category: "Rare Drops",
    configName: "vialPartyChatToggle",
    title: "● Party Chat",
    description: "The message will be sent to party chat",
    subcategory: "Radioactive Vial",
    value: true
})
.addToggle({
    category: "Rare Drops",
    configName: "vialGuildChatToggle",
    title: "● Guild Chat",
    description: "The message will also be sent to guild chat",
    subcategory: "Radioactive Vial",
    value: true
})
.addToggle({
    category: "Rare Drops",
    configName: "vialAllChatToggle",
    title: "● All Chat",
    description: "The message will also be sent to all chat",
    subcategory: "Radioactive Vial",
    value: false
})
.addToggle({
    category: "Rare Drops",
    configName: "vialCoopChatToggle",
    title: "● Coop Chat",
    description: "The message will also be sent to coop chat",
    subcategory: "Radioactive Vial",
    value: false
})
.addSwitch({
    category: "Rare Drops",
    configName: "vialUIToggle",
    title: "Toggle radioactive vial UI",
    description: "Ui that shows jawbus and time since last vial",
    subcategory: "Radioactive Vial",
    value: true
})
.addSwitch({
    category: "Rare Drops",
    configName: "dropsMessageToggle",
    title: "Toggle random drops message",
    description: "Sends messages upon dropping Attribute Shards/Magma Lord frags/ Flash book / Bobbin",
    subcategory: "Other Drops",
    value: true
})
.addSwitch({
    category: "Rare Drops",
    configName: "dropsAirMessageToggle",
    title: "● Toggle air drop",
    description: "Sends an air dropped message if you dont drop anything lol, will trigger for any Thunders/Jawbus that die near you",
    subcategory: "Other Drops",
    value: true
})
.addSwitch({
    category: "Pets",
    configName: "petTitleToggle",
    title: "Toggle pet level up titles",
    description: "Shows a title whenever a pet levels up",
    subcategory: "Pet Level Up",
    value: true
})
.addSlider({
    category: "Pets",
    configName: "petTitleLimit",
    title: "● Pet level title alert",
    description: "Set the number of levels needed to start showing the title message",
    options: [1, 100],
    value: 100,
    subcategory: "Pet Level Up"
})
.addTextInput({
    category: "Pets",
    configName: "petTitleMessage",
    title: "● Pet level Title message",
    description: "Customize the level up title message.\n write ([level]) to show the level, write ([pet]) to show the pet name",
    value: "&6&l([pet]) level ([level])",
    placeHolder: "",
    subcategory: "Pet Level Up"
})
.addSwitch({
    category: "Other",
    configName: "phoenixTitleToggle",
    title: "Toggle phoenix pet used title",
    description: "Shows a title whenever you die with phoenix and whenever the cooldown ends",
    subcategory: "Death",
    value: true
})
.addSwitch({
    category: "Other",
    configName: "spiritTitleToggle",
    title: "Toggle spirit mask used title",
    description: "Shows a title whenever you die with spirit mask and whenever the cooldown ends",
    subcategory: "Death",
    value: true
})
.addSwitch({
    category: "Other",
    configName: "deathItemSpiritMaskStatusToggle",
    title: "Spirit mask status UI",
    description: "Shows the status of spirit mask on your screen",
    subcategory: "Death",
    value: true
})
.addSwitch({
    category: "Other",
    configName: "deathItemPhoenixStatusToggle",
    title: "Phoenix mask status UI",
    description: "Shows the status of phoenix on your screen",
    subcategory: "Death",
    value: true
})
.addSwitch({
    category: "Other",
    configName: "deathItemStatusUIToggle",
    title: "Hide UI for Phoenix/Spirit Mask if not using",
    description: "Hides the phoenix/spirit mask UI if you dont have a phoenix/spirit mask equipped",
    subcategory: "Death",
    value: false
})
.addSwitch({
    category: "Other",
    configName: "rodTimerToggle",
    title: "Toggle rendering fishing rod timer on screen",
    description: "renders the fishing rod timer on your screen",
    subcategory: "Fishing rod timer",
    value: true
})
.addTextInput({
    category: "Other",
    configName: "rodTimerUI",
    title: "● Rod Timer UI text",
    description: "Customize rod timer UI.\n write ([time]) to show the timer\nThis is a different one, you should write it like this: ([time])|Click! , the things to the left of | will appear on the timer and the things to the right will appear when the timer is on !!!\n(you may need to add some spaces so it gets centered)",
    value: " &e&l([time])|&c&lClick!",
    placeHolder: "",
    subcategory: "Fishing rod timer"
})
.addSlider({
    category: "Other",
    configName: "titleFadeIn",
    title: "Title fade in",
    description: "Time in ticks it takes for the title to appear, default: 10",
    options: [0, 200],
    value: 10,
    subcategory: "Title times"
})
.addSlider({
    category: "Other",
    configName: "titleDuration",
    title: "Title duration",
    description: "Time in ticks the title remains fully visible, default: 40",
    options: [1, 200],
    value: 40,
    subcategory: "Title times"
})
.addSlider({
    category: "Other",
    configName: "titleFadeOut",
    title: "Title fade out",
    description: "Time in ticks it takes for the title to disappear, default: 10",
    options: [0, 200],
    value: 10,
    subcategory: "Title times"
})
.addDropDown({
    category: "Other",
    configName: "ChatSelected",
    title: "Messages chat",
    description: "Select the chat all the mod messages will be sent to. Default: Party/Local",
    options: ["Party","Guild","AllChat","Party/Local","Local","Coop"],
    value: 3,
    subcategory: "Chat"
})
.addSlider({
    category: "Other",
    configName: "renderDuration",
    title: "Render box duration",
    description: "The amount of time in seconds a render box stays up if you dont get close to it",
    options: [1, 300],
    value: 60,
    subcategory: "Rendering"
})
.addSwitch({
    category: "Other",
    configName: "renderChatCoords",
    title: "Toggle chat coords",
    description: "Renders coords sent in chat",
    subcategory: "Rendering",
    value: true
})
.addSwitch({
    category: "Other",
    configName: "renderItems",
    title: "Toggle cool item rendering",
    description: "Renders a bg and the attributes of useful pieces",
    subcategory: "Rendering",
    value: true
})
.addSwitch({
    category: "Other",
    configName: "renderItemsBg",
    title: "Toggle cool item rendering Background",
    description: "Renders the background on useful pieces",
    subcategory: "Rendering",
    value: true
})
.addSlider({
    category: "Other",
    configName: "seaCreaturePollingrate",
    title: "General Fishing Detection Rate",
    description: "The ammout of times per second the detections on the general fishing page, higher values will lead to more accurate readings but may cause lag, Default: 3 \nOnly updates with /ct reload",
    options: [1, 60],
    value: 3,
    subcategory: "Detection Rate"
})
.addSlider({
    category: "Other",
    configName: "chPollingrate",
    title: "Crimson Fishing Detection Rate",
    description: "The ammout of times per second the detections on the Crimson Fishing page are made, higher values will lead to more accurate readings but may cause lag, Default: 3 \nOnly updates with /ct reload",
    options: [1, 60],
    value: 3,
    subcategory: "Detection Rate"
})
.addSlider({
    category: "Other",
    configName: "chBossPollingrate",
    title: "Crimson BarDetection Rate",
    description: "The ammout of times per second the crismon health bar updates, higher values will lead to more accurate readings but may cause lag, Default: 10 \nOnly updates with /ct reload",
    options: [1, 60],
    value: 10,
    subcategory: "Detection Rate"
})
.addTextInput({
    category: "Other",
    configName: "FunMessages",
    title: "Add characters to messages",
    description: "Every custom message in this mod can have faces added to them, they can be called by using ([name])\nUse this to add more faces!\nto add a face it must be composed of 2 names separated by \",\" if you wanna add more faces use \"|\" to separate them, example: shrug,¯\\_(ツ)_/¯|kiss,٩(*❛⊰❛)～❤\nuse /rfufaces to check which faces are enabled",
    value: "shrug,¯\\_(ツ)_/¯|kiss,٩(*❛⊰❛)～❤|flowersmile,(◕‿◕✿)|disapointed,(ㆆ _ ㆆ)|tableflip,(╯°o°)╯︵ ┻━┻|tablefliprage,(ノಠ益ಠ)ノ彡┻━┻|eyes,(ಠ_ಠ)|dog,▼・ᴥ・▼|hooray,\\ (•◡•) /|meh,(¬_¬)|mad,ಠ╭╮ಠ|wink,◕‿↼|surprised,(╯°o°)╯|mixface,┌( ಠ_ಠ)┘",
    placeHolder: "",
    subcategory: "Fun Messaging"
})
.addSwitch({
    category: "Other",
    configName: "lobbyTracking",
    title: "Lobby Tracking",
    description: "Sends a chat message if you`ve been to a lobby before",
    subcategory: "Other Settings",
    value: true
})
.addSwitch({
    category: "Trophy Fishing",
    configName: "sulphurRightClickToggle",
    title: "Show sulphur range on right click",
    description: "Shows the range of the sulphur block when right clicking it, click again to stop showing\nFun fact: it actually makes sense now!",
    subcategory: "Sulphur Block",
    value: true
})
.addSwitch({
    category: "Trophy Fishing",
    configName: "goldenTimerToggle",
    title: "Golden Fish Timer",
    description: "A golden fish timer!",
    subcategory: "Golden Fish",
    value: true
})
.addSwitch({
    category: "Trophy Fishing",
    configName: "trophyHideUIToggle",
    title: "Hide UI if not relevant - Trophy Fishing",
    description: "Hides the UIs in this page if not fishing",
    subcategory: "Other Settings",
    value: false
})

const setting = new Settings("RiccioFishingUtils", config, "settings/ColorScheme.json")
.addChangelog(FileLib.read("RiccioFishingUtils", "changelog.md"))
.setCommand("rfu", ["ricciofishingutils"]) 
.setSize(90, 90)
.setPos(5, 5)
.apply()

export default () => setting.settings

//? Code to update from old settings to new settings

function setConfigValue(category, key, value) {
    if(setting.settings[key] !== value) {
        setting.setConfigValue(category, key, value)
    }
}


function convertOldConfigToNew() {
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Chat Commands Settings")
    //Chat Commands
    setConfigValue("Chat Commands", "partyCommands", oldValues.partyCommands)
    setConfigValue("Chat Commands", "partyCooldown", oldValues.partyCooldown)
    setConfigValue("Chat Commands", "partyPrefix", oldValues.partyPrefix)
    setConfigValue("Chat Commands", "partyJoinHelp", oldValues.partyJoinHelp)
    setConfigValue("Chat Commands", "partyJoinHelpLeader", oldValues.partyJoinHelpLeader)
    setConfigValue("Chat Commands", "partyHelp", oldValues.partyHelp)
    setConfigValue("Chat Commands", "partyInvite", oldValues.partyInvite)
    setConfigValue("Chat Commands", "partyWarp", oldValues.partyWarp)
    setConfigValue("Chat Commands", "partyToggleWarp", oldValues.partyToggleWarp)
    setConfigValue("Chat Commands", "partyTransfer", oldValues.partyTransfer)
    setConfigValue("Chat Commands", "partyAllinvite", oldValues.partyAllinvite)
    setConfigValue("Chat Commands", "partyCoords", oldValues.partyCoords)
    setConfigValue("Chat Commands", "partyWarpMuted", oldValues.partyWarpMuted)
    setConfigValue("Chat Commands", "partyBlacklist", oldValues.partyBlacklist)
    setConfigValue("Chat Commands", "infoJawbus", oldValues.infoJawbus)
    setConfigValue("Chat Commands", "infoThunder", oldValues.infoThunder)
    setConfigValue("Chat Commands", "infoVial", oldValues.infoVial)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Crystal Hollows Fishing Settings")
    //Crystal Hollows
    setConfigValue("Crystal Hollows Fishing", "wormToggle", oldValues.wormToggle)
    setConfigValue("Crystal Hollows Fishing", "wormMessageToggle", oldValues.wormMessageToggle)
    setConfigValue("Crystal Hollows Fishing", "wormLimit", oldValues.wormLimit)
    setConfigValue("Crystal Hollows Fishing", "wormMessage", oldValues.wormMessage)
    setConfigValue("Crystal Hollows Fishing", "wormTitleToggle", oldValues.wormTitleToggle)
    setConfigValue("Crystal Hollows Fishing", "wormTitleLimit", oldValues.wormTitleLimit)
    setConfigValue("Crystal Hollows Fishing", "wormTitleMessage", oldValues.wormTitleMessage)
    setConfigValue("Crystal Hollows Fishing", "wormTitleMessageSubtitle", oldValues.wormTitleMessageSubtitle)
    setConfigValue("Crystal Hollows Fishing", "wormSoundToggle", oldValues.wormSoundToggle)
    setConfigValue("Crystal Hollows Fishing", "wormNametagToggle", oldValues.wormNametagToggle)
    setConfigValue("Crystal Hollows Fishing", "wormSoundLimit", oldValues.wormSoundLimit)
    setConfigValue("Crystal Hollows Fishing", "wormSound", oldValues.wormSound)
    setConfigValue("Crystal Hollows Fishing", "wormSoundVolume", oldValues.wormSoundVolume)
    setConfigValue("Crystal Hollows Fishing", "wormSoundPitch", oldValues.wormSoundPitch)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Deployable Settings")
    //Deployables
    //  Totem
    setConfigValue("Deployables", "totemToggle", oldValues.totemToggle)
    setConfigValue("Deployables", "totemTitleToggle", oldValues.totemTitleToggle)
    setConfigValue("Deployables", "totemTitleMessage", oldValues.totemTitleMessage)
    setConfigValue("Deployables", "totemMessageToggle", oldValues.totemMessageToggle)
    setConfigValue("Deployables", "totemTitleToggle", oldValues.totemTitleToggle)
    setConfigValue("Deployables", "totemTimerToggle", oldValues.totemTimerToggle)
    //  Flux
    setConfigValue("Deployables", "fluxToggle", oldValues.fluxToggle)
    setConfigValue("Deployables", "fluxTitleToggle", oldValues.fluxTitleToggle)
    setConfigValue("Deployables", "fluxTitleMessage", oldValues.fluxTitleMessage)
    setConfigValue("Deployables", "fluxMessageToggle", oldValues.fluxMessageToggle)
    setConfigValue("Deployables", "fluxTimerToggle", oldValues.fluxTimerToggle)
    //  Flare
    setConfigValue("Deployables", "flareToggle", oldValues.flareToggle)
    setConfigValue("Deployables", "flareTitleToggle", oldValues.flareTitleToggle)
    setConfigValue("Deployables", "flareTitleMessage", oldValues.flareTitleMessage)
    setConfigValue("Deployables", "flareMessageToggle", oldValues.flareMessageToggle)
    setConfigValue("Deployables", "flareTimerToggle", oldValues.flareTimerToggle)
    //  All
    setConfigValue("Deployables", "deployableMessage", oldValues.deployableMessage)
    setConfigValue("Deployables", "deployableSoundToggle", oldValues.deployableSoundToggle)
    setConfigValue("Deployables", "deployableSound", oldValues.deployableSound)
    setConfigValue("Deployables", "deployableSoundVolume", oldValues.deployableSoundVolume)
    setConfigValue("Deployables", "deployableSoundPitch", oldValues.deployableSoundPitch)
    setConfigValue("Deployables", "deployableHideToggle", oldValues.deployableHideToggle)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting General Fishing Settings")
    //General Fishing
    setConfigValue("General Fishing", "seaCreatureCounterToggle", oldValues.seaCreatureCounterToggle)
    setConfigValue("General Fishing", "seaCreatureCounterUiToggle", oldValues.seaCreatureCounterUiToggle)
    setConfigValue("General Fishing", "seaCreatureCountWorms", oldValues.seaCreatureCountWorms)
    setConfigValue("General Fishing", "seaCreatureSoundToggle", oldValues.seaCreatureSoundToggle)
    setConfigValue("General Fishing", "seaCreatureSoundLimit", oldValues.seaCreatureSoundLimit)
    setConfigValue("General Fishing", "seaCreatureSound", oldValues.seaCreatureSound)
    setConfigValue("General Fishing", "seaCreatureSoundVolume", oldValues.seaCreatureSoundVolume)
    setConfigValue("General Fishing", "seaCreatureSoundPitch", oldValues.seaCreatureSoundPitch)
    setConfigValue("General Fishing", "seaCreatureTitleToggle", oldValues.seaCreatureTitleToggle)
    setConfigValue("General Fishing", "seaCreatureTitleLimit", oldValues.seaCreatureTitleLimit)
    setConfigValue("General Fishing", "seaCreatureTitleMessage", oldValues.seaCreatureTitleMessage)
    setConfigValue("General Fishing", "seaCreatureTitleMessageSubtitle", oldValues.seaCreatureTitleMessageSubtitle)
    setConfigValue("General Fishing", "seaCreatureMessageToggle", oldValues.seaCreatureMessageToggle)
    setConfigValue("General Fishing", "seaCreatureLimit", oldValues.seaCreatureLimit)
    setConfigValue("General Fishing", "seaCreatureMessage", oldValues.seaCreatureMessage)
    setConfigValue("General Fishing", "bobberUIToggle", oldValues.bobberUIToggle)
    setConfigValue("General Fishing", "seacreatureHourUIToggle", oldValues.seacreatureHourUIToggle)
    setConfigValue("General Fishing", "seacreatureHourResetTime", oldValues.seacreatureHourResetTime)
    setConfigValue("General Fishing", "doubleHookMessageToggle", oldValues.doubleHookMessageToggle)
    setConfigValue("General Fishing", "doubleHookMessage", oldValues.doubleHookMessage)
    setConfigValue("General Fishing", "doubleHookRandomToggle", oldValues.doubleHookRandomToggle)
    setConfigValue("General Fishing", "generalHideUIToggle", oldValues.generalHideUIToggle)
    setConfigValue("General Fishing", "creatureDhHideToggle", oldValues.creatureDhHideToggle)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Player Stats Settings")
    //Player Stats
    setConfigValue("Player Stats", "manaTitleToggle", oldValues.manaTitleToggle)
    setConfigValue("Player Stats", "manaWarnPercentage", oldValues.manaWarnPercentage)
    setConfigValue("Player Stats", "manaTitleMessage", oldValues.manaTitleMessage)
    
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Pets Settings")
    //Pets
    setConfigValue("Pets", "petDisplayToggle", oldValues.petDisplayToggle)
    setConfigValue("Pets", "petTitleToggle", oldValues.petTitleToggle)
    setConfigValue("Pets", "petTitleLimit", oldValues.petTitleLimit)
    setConfigValue("Pets", "petTitleMessage", oldValues.petTitleMessage)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Crimson Fishing Settings")
    //Crimson Fishing
    setConfigValue("Crimson Fishing", "bossHealthBarToggle", oldValues.bossHealthBarToggle)
    setConfigValue("Crimson Fishing", "BossHealthBarLength", oldValues.BossHealthBarLength)
    setConfigValue("Crimson Fishing", "jawbusHealthBarToggle", oldValues.jawbusHealthBarToggle)
    setConfigValue("Crimson Fishing", "thunderHealthBarToggle", oldValues.thunderHealthBarToggle)
    setConfigValue("Crimson Fishing", "plhlegblastHealthBarToggle", oldValues.plhlegblastHealthBarToggle)
    setConfigValue("Crimson Fishing", "fishermanTrackingToggle", oldValues.fishermanTrackingToggle)
    setConfigValue("Crimson Fishing", "jawbusDeathWarnToggle", oldValues.jawbusDeathWarnToggle)
    setConfigValue("Crimson Fishing", "thunderDeathWarnToggle", oldValues.thunderDeathWarnToggle)
    setConfigValue("Crimson Fishing", "deathWarnCooldown", oldValues.deathWarnCooldown)
    setConfigValue("Crimson Fishing", "deathWarnCoordsToggle", oldValues.deathWarnCoordsToggle)
    setConfigValue("Crimson Fishing", "deathWarnRenderToggle", oldValues.deathWarnRenderToggle)
    setConfigValue("Crimson Fishing", "deathWarnSoundToggle", oldValues.deathWarnSoundToggle)
    setConfigValue("Crimson Fishing", "deathWarnSoundVolume", oldValues.deathWarnSoundVolume)
    setConfigValue("Crimson Fishing", "plhlegblastUIToggle", oldValues.plhlegblastUIToggle)
    setConfigValue("Crimson Fishing", "jawbusUIToggle", oldValues.jawbusUIToggle)
    setConfigValue("Crimson Fishing", "thunderUIToggle", oldValues.thunderUIToggle)
    setConfigValue("Crimson Fishing", "vanquisherUIToggle", oldValues.vanquisherUIToggle)
    setConfigValue("Crimson Fishing", "mythicMessageToggle", oldValues.mythicMessageToggle)
    setConfigValue("Crimson Fishing", "mythicPlhlegblastMessage", oldValues.mythicPlhlegblastMessage)
    setConfigValue("Crimson Fishing", "mythicJawbusMessage", oldValues.mythicJawbusMessage)
    setConfigValue("Crimson Fishing", "mythicThunderMessage", oldValues.mythicThunderMessage)
    setConfigValue("Crimson Fishing", "vanquisherMessageToggle", oldValues.vanquisherMessageToggle)
    setConfigValue("Crimson Fishing", "mythicDetectionToggle", oldValues.mythicDetectionToggle)
    setConfigValue("Crimson Fishing", "plhlegblastDetectionToggle", oldValues.plhlegblastDetectionToggle)
    setConfigValue("Crimson Fishing", "jawbusDetectionToggle", oldValues.jawbusDetectionToggle)
    setConfigValue("Crimson Fishing", "thunderDetectionToggle", oldValues.thunderDetectionToggle)
    setConfigValue("Crimson Fishing", "mythicDetectionMessage", oldValues.mythicDetectionMessage)
    setConfigValue("Crimson Fishing", "mythicDetectionSoundToggle", oldValues.mythicDetectionSoundToggle)
    setConfigValue("Crimson Fishing", "mythicDetectionSoundVolume", oldValues.mythicDetectionSoundVolume)
    setConfigValue("Crimson Fishing", "vanquisherMessage", oldValues.vanquisherMessage)
    setConfigValue("Crimson Fishing", "mythicLootshareToggle", oldValues.mythicLootshareToggle)
    setConfigValue("Crimson Fishing", "mythicLootsharePlhlegblastToggle", oldValues.mythicLootsharePlhlegblastToggle)
    setConfigValue("Crimson Fishing", "mythicLootshareJawbusToggle", oldValues.mythicLootshareJawbusToggle)
    setConfigValue("Crimson Fishing", "mythicLootshareThunderToggle", oldValues.mythicLootshareThunderToggle)
    setConfigValue("Crimson Fishing", "crimsonHideUIToggle", oldValues.crimsonHideUIToggle)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Rare Drops Settings")
    //Rare Drops
    setConfigValue("Rare Drops", "vialMessageToggle", oldValues.vialMessageToggle)
    setConfigValue("Rare Drops", "vialMessage", oldValues.vialMessage)
    setConfigValue("Rare Drops", "vialPartyChatToggle", oldValues.vialPartyChatToggle)
    setConfigValue("Rare Drops", "vialGuildChatToggle", oldValues.vialGuildChatToggle)
    setConfigValue("Rare Drops", "vialAllChatToggle", oldValues.vialAllChatToggle)
    setConfigValue("Rare Drops", "vialCoopChatToggle", oldValues.vialCoopChatToggle)
    setConfigValue("Rare Drops", "vialUIToggle", oldValues.vialUIToggle)
    setConfigValue("Rare Drops", "dropsMessageToggle", oldValues.dropsMessageToggle)
    setConfigValue("Rare Drops", "dropsMessageToggle", oldValues.dropsAirMessageToggle)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Other Settings")
    //Other
    setConfigValue("Other", "phoenixTitleToggle", oldValues.phoenixTitleToggle)
    setConfigValue("Other", "spiritTitleToggle", oldValues.spiritTitleToggle)
    setConfigValue("Other", "deathItemSpiritMaskStatusToggle", oldValues.deathItemSpiritMaskStatusToggle)
    setConfigValue("Other", "deathItemPhoenixStatusToggle", oldValues.deathItemPhoenixStatusToggle)
    setConfigValue("Other", "deathItemStatusUIToggle", oldValues.deathItemStatusUIToggle)
    setConfigValue("Other", "rodTimerToggle", oldValues.rodTimerToggle)
    setConfigValue("Other", "rodTimerUI", oldValues.rodTimerUI)
    setConfigValue("Other", "titleFadeIn", oldValues.titleFadeIn)
    setConfigValue("Other", "titleDuration", oldValues.titleDuration)
    setConfigValue("Other", "titleFadeOut", oldValues.titleFadeOut)
    setConfigValue("Other", "ChatSelected", oldValues.ChatSelected)
    setConfigValue("Other", "renderDuration", oldValues.renderDuration)
    setConfigValue("Other", "renderChatCoords", oldValues.renderChatCoords)
    setConfigValue("Other", "renderItems", oldValues.renderItems)
    setConfigValue("Other", "renderItemsBg", oldValues.renderItemsBg)
    setConfigValue("Other", "seaCreaturePollingrate", oldValues.seaCreaturePollingrate)
    setConfigValue("Other", "chPollingrate", oldValues.chPollingrate)
    setConfigValue("Other", "chBossPollingrate", oldValues.chBossPollingrate)
    setConfigValue("Other", "FunMessages", oldValues.FunMessages)
    setConfigValue("Other", "lobbyTracking", oldValues.lobbyTracking)
    ChatLib.chat("&5[&b&lRFU&5] &6&lConverting Trophy Fishing Settings")
    //Trophy Fishing
    setConfigValue("Trophy Fishing", "sulphurRightClickToggle", oldValues.sulphurRightClickToggle)
    setConfigValue("Trophy Fishing", "goldenTimerToggle", oldValues.goldenTimerToggle)
    setConfigValue("Trophy Fishing", "trophyHideUIToggle", oldValues.trophyHideUIToggle)

    playerData.SETTINGS.Updated = true
    playerData.save()
    ChatLib.chat("&5[&b&lRFU&5] &a&lDone Updating! &f&lRecomended Restarting Game")
}

register("command", convertOldConfigToNew).setName("rfurunconfigconversion")

register("command", () => {
    ChatLib.chat("&5[&b&lRFU&5] &eMessage wont be seen again.")
    playerData.SETTINGS.Updated = true
    playerData.save()
}).setName("rfusetsettingstoupdated")

const updateSettingsRegister = register("worldLoad", () => {
    if(!playerData.SETTINGS.Updated) {
        ChatLib.chat(
            new Message(
                new TextComponent(`\n&5[&b&lRFU&5] &e&lRfu has updated to a new settings system!\n&a&l[Click to convert old settings]`)
                .setHover("show_text", "&cThis is a compute intensive task.\n&cIt may lag your computer or not work at all :(")
                .setClick("run_command", "rfurunconfigconversion"),
                new TextComponent(`\n&c&l[Click to not see this again]\n`)
                .setClick("run_command", "rfusetsettingstoupdated"),
            )
        )
    }
    updateSettingsRegister.unregister()
})
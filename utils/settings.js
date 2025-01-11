import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @NumberProperty,
    @ColorProperty,
    @SliderProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
} from 'Vigilance/index';
@Vigilant('RiccioFishingUtils', 'RiccioFishingUtils V0.1.1', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General Fishing', 'Crimson Fishing', 'Crystal Hollows Fishing', 'Trophy Fishing' , 'Chat Commands', 'Pets', 'Rare Drops' , 'Player Stats','Deployables','Other'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {

    //Party Commands Tab
    @SwitchProperty({
        name: 'Toggle Party Commands',
        description: 'Enable the party commands',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyCommands = true;

    @SliderProperty({
        name: 'Command Cooldown',
        description: 'Cooldown between commands in seconds, default: 1s',
        category: 'Chat Commands',
        subcategory: 'General Commands',
        min: 0,
        max: 60
    })
    partyCooldown = 1;

    @TextProperty({
        name: 'Command Prefix',
        description: 'The prefix used for commands, default: !',
        category: 'Chat Commands',
        subcategory: 'General Commands',
    })
    partyPrefix = '!';

    @SwitchProperty({
        name: 'New Member Help Command',
        description: 'Runs the help command whenever a new player joins',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyJoinHelp = false;

    @SwitchProperty({
        name: '● Leader Only New Member Help',
        description: 'Only triggers the New Member Help if you`re party leader',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyJoinHelpLeader = true;

    @CheckboxProperty({
        name: 'help',
        description: 'Enable the help command',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyHelp = true;

    @CheckboxProperty({
        name: 'invite',
        description: 'Enable the invite command',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyInvite = true;

    @CheckboxProperty({
        name: 'warp',
        description: 'Enable the warp command',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyWarp = true;

    @CheckboxProperty({
        name: 'togglewarp',
        description: 'Enable the togglewarp command, which allows a player in the party to get kicked before warping and repartied',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyToggleWarp = true;

    @CheckboxProperty({
        name: 'transfer',
        description: 'Enable the transfer and pt command',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyTransfer = true;

    @CheckboxProperty({
        name: 'allinvite',
        description: 'Enable the allinvite command',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyAllinvite = true;

    @CheckboxProperty({
        name: 'coords',
        description: 'Enable the coords command',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyCoords = true;

    @SwitchProperty({
        name: 'Warp on Im muted!',
        description: 'Makes it so the im muted message warps the party',
        category: 'Chat Commands',
        subcategory: 'Party Commands',
    })
    partyWarpMuted = false;

    @TextProperty({
        name: 'Command Blacklist',
        description: 'players who wont be able to use chat commands, use commas to separate names, example: steve,alex,joe',
        category: 'Chat Commands',
        subcategory: 'General Commands',
    })
    partyBlacklist = '';

    @CheckboxProperty({
        name: 'jawbusinfo',
        description: 'Enable the jawbusinfo command, which sends your jawbus count/avg and last jawbus time in chat',
        category: 'Chat Commands',
        subcategory: 'Info Commands',
    })
    infoJawbus = true;

    @CheckboxProperty({
        name: 'thunderinfo',
        description: 'Enable the jawbusinfo command, which sends your thunder count/avg and last thunder time in chat',
        category: 'Chat Commands',
        subcategory: 'Info Commands',
    })
    infoThunder = true;

    @CheckboxProperty({
        name: 'vialinfo',
        description: 'Enable the vialinfo command, which sends your vial jawbus count and last vial time in chat',
        category: 'Chat Commands',
        subcategory: 'Info Commands',
    })
    infoVial = true;

    // CRYSTAL HOLLOWS FISHING
    //Worms
    @SwitchProperty({
        name: 'Toggle Worm Counter',
        description: 'Enables the worm fishing counters\nMust be on if you want to use any features below',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormToggle = true;

    @SwitchProperty({
        name: 'Toggle worm party messages',
        description: 'Sends messages whenever a certain number of worms is spawned',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormMessageToggle = false;

    @SliderProperty({
        name: '● Worm number message alert',
        description: "Set the number of worms needed to send the message\nif you use 59 ur weird ¯\\_(ツ)_/¯",
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing',
        min: 1,
        max: 60
    })
    wormLimit = 60;

    @TextProperty({
        name: '● Worm party message',
        description: 'Customize the worm cap message.\n write ([number]) to show the worm count, write ([time]) to show the time it took',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormMessage = 'Worm cap reached! ([number]) worms in ([time])';

    // Worm Title

    @SwitchProperty({
        name: 'Alert worm count on screen',
        description: 'Sends the message in the middle of screen through titles',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormTitleToggle = true;

    @SliderProperty({
        name: '● Worm number title alert',
        description: "Set the number of worms needed to show the title message",
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing',
        min: 1,
        max: 60
    })
    wormTitleLimit = 60;

    @TextProperty({
        name: '● Worm Cap Title message',
        description: 'Customize the worm count title message.\n write ([number]) to show the worm count, write ([time]) to show the time it took',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormTitleMessage = '&cWorm cap reached!';

    @TextProperty({
        name: '● Worm Cap Title message subtitle',
        description: 'Customize the text below the title message.\n write ([number]) to show the worm count, write ([time]) to show the time it took',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormTitleMessageSubtitle = '&c([number]) worms in ([time])!';

    //Worm Sound
    @SwitchProperty({
        name: 'Toggle worm count Sound',
        description: 'Plays a sound when there is a certain number of worms',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormSoundToggle = true;
    
    @SwitchProperty({
        name: 'Hide worm nametag',
        description: 'Hides the worms nametags, you wont know the hp tho ¯\\_(ツ)_/¯',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormNametagToggle = false;

    @SliderProperty({
        name: '● Worm number sound',
        description: "Set the number of worms needed to play the sound",
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing',
        min: 1,
        max: 60
    })
    wormSoundLimit = 60;

    @TextProperty({
        name: '● Worm Sound',
        description: 'Customize the worm count sound, Default: random.orb',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormSound = 'random.orb'

    @PercentSliderProperty({
        name: '● Worm sound volume',
        description: 'The volume of the worm count sound',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing'
    })
    wormSoundVolume = 1.0;

    @SliderProperty({
        name: '● Worm sound pitch',
        description: 'The pitch of the worm count sound',
        category: 'Crystal Hollows Fishing',
        subcategory: 'Worm Fishing',
        min: 0,
        max: 200
    })
    wormSoundPitch = 100;
    // Corruption Totem

    @SwitchProperty({
        name: 'Toggle corruption totem tracker',
        description: 'Enable corruption totem utils\nMust be on if you want to use any features below',
        category: 'Deployables',
        subcategory: 'Corruption Totem'
    })
    totemToggle = true;

    //Title
    @SwitchProperty({
        name: 'Alert Totem Expired on Screen',
        description: 'Sends the message in the middle of screen through titles',
        category: 'Deployables',
        subcategory: 'Corruption Totem'
    })
    totemTitleToggle = true;

    @TextProperty({
        name: '● Totem Expired Title message',
        description: 'Customize the totem expired title message.',
        category: 'Deployables',
        subcategory: 'Corruption Totem'
    })
    totemTitleMessage = '&5Corruption Totem Expired!'

    // Message
    @SwitchProperty({
        name: 'Toggle corruption totem expire messages',
        description: 'Sends messages whenever the corruption totem expires',
        category: 'Deployables',
        subcategory: 'Corruption Totem'
    })
    totemMessageToggle = false;

    //Timer
    @SwitchProperty({
        name: 'Toggle corruption totem timer',
        description: 'Shows the corruption totem timer on your screen\n/rfumove to move it',
        category: 'Deployables',
        subcategory: 'Corruption Totem'
    })
    totemTimerToggle = true;

    //----------------------------------------------------------------------//
    // General Fishing Tab
    @SwitchProperty({
        name: 'Toggle Sea Creature Counter',
        description: 'Enable Counter Utilities, must be on to use any features below',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureCounterToggle = true;

    @SwitchProperty({
        name: 'Sea Creature Counter UI',
        description: 'Shows the amount of sea creatures on your screen',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureCounterUiToggle = true;

    @CheckboxProperty({
        name: 'Count worms anyways',
        description: 'Makes it so the features that dont count worms in this page also count worms',
        category: 'General Fishing',
        subcategory: 'Other Settings'
    })
    seaCreatureCountWorms = false;

    //----------------------------------------------------------------------//

    @SwitchProperty({
        name: 'Toggle sea creature count Sound',
        description: 'Plays a sound when there is a certain amount of sea creatures, doesnt count worms',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureSoundToggle = false;

    @SliderProperty({
        name: '● Sea creature number sound',
        description: "Set the number of sea creatures needed to play the sound",
        category: 'General Fishing',
        subcategory: 'Creature Counting',
        min: 1,
        max: 60
    })
    seaCreatureSoundLimit = 15;

    @TextProperty({
        name: '● Sea creature count Sound',
        description: 'Customize the sea creature sound, Default: random.orb',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureSound = 'random.orb';

    @PercentSliderProperty({
        name: '● Sea creature sound volume',
        description: 'The volume of the sea creature sound',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureSoundVolume = 1.0;

    @SliderProperty({
        name: '● Sea creature sound pitch',
        description: 'The pitch of the sea creature sound',
        category: 'General Fishing',
        subcategory: 'Creature Counting',
        min: 0,
        max: 200
    })
    seaCreatureSoundPitch = 100;

    //----------------------------------------------------------------------//
    @SwitchProperty({
        name: 'Alert sea creature count on screen',
        description: 'Sends the message in the middle of screen through titles, doesnt count worms',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureTitleToggle = true;

    @SliderProperty({
        name: '● Creature number title alert',
        description: "Set the number of sea creatures needed to show the title message, wont count worms\nif you're a barn fisher, please use this on 10-30",
        category: 'General Fishing',
        subcategory: 'Creature Counting',
        min: 1,
        max: 60
    })
    seaCreatureTitleLimit = 15;

    @TextProperty({
        name: '● Sea Creature Title message',
        description: 'Customize the sea creature count title message.\n write ([number]) to show the catch count, write ([time]) to show the time it took',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureTitleMessage = '&4&lKill Creatures!';

    @TextProperty({
        name: '● Sea Creature Title message subtitle',
        description: 'Customize the text below the title message.\n write ([number]) to show the catch count, write ([time]) to show the time it took',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureTitleMessageSubtitle = '&e([number]) sea creatures in ([time])!';

    //----------------------------------------------------------------------//
    @SwitchProperty({
        name: 'Toggle sea creature party messages',
        description: 'Sends messages whenever a certain number of sea creatures is spawned, wont count worms',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureMessageToggle = false;

    @SliderProperty({
        name: '● Sea Creature number message alert',
        description: "Set the number of sea creatures needed to send the message",
        category: 'General Fishing',
        subcategory: 'Creature Counting',
        min: 1,
        max: 60
    })
    seaCreatureLimit = 60;

    @TextProperty({
        name: '● Sea Creature party message',
        description: 'Customize the sea creature count message.\n write ([number]) to show the sea creature count, write ([time]) to show the time it took',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seaCreatureMessage = 'Reached ([number]) sea creatures in ([time])';
    //----------------------------------------------------------------------//

    @SwitchProperty({
        name: 'Toggle bobber counter UI',
        description: 'Shows the bobber count on your screen\n/rfumove to move it',
        category: 'General Fishing',
        subcategory: 'Bobbin Features'
    })
    bobberUIToggle = true;

    //----------------------------------------------------------------------//

    @SwitchProperty({
        name: 'Sea creatures per hour UI',
        description: 'Shows the status for jawbus',
        category: 'General Fishing',
        subcategory: 'Creature Counting'
    })
    seacreatureHourUIToggle = true;

    @SliderProperty({
        name: '● Sc/hr time to reset',
        description: 'The amount of downtime it takes for the sc/h counter to reset in minutes',
        category: 'General Fishing',
        subcategory: 'Creature Counting',
        min: 1,
        max: 60
    })
    seacreatureHourResetTime = 30;

    @SwitchProperty({
        name: 'Toggle double hook messages',
        description: 'Sends messages whenever you get a double hoook',
        category: 'General Fishing',
        subcategory: 'Double Hook'
    })
    doubleHookMessageToggle = false;

    @TextProperty({
        name: '● Double hook message',
        description: 'Customize the double hook message.You can add multiple messages that will play in order separated by "|"',
        category: 'General Fishing',
        subcategory: 'Double Hook'
    })
    doubleHookMessage = "><))))`> <'((((><|><))))`> ❤ <'((((><|><))))`> ><))`>|<'((>< <'((((><";

    @SwitchProperty({
        name: '● Toggle random messages',
        description: 'Makes double hook messages random from the list of messages\n&8Older ([random]) in the messages still works.',
        category: 'General Fishing',
        subcategory: 'Double Hook'
    })
    doubleHookRandomToggle = false;

    @SwitchProperty({
        name: 'Hide UI if not relevant - General',
        description: 'Hides the UIs in this page if not fishing',
        category: 'General Fishing',
        subcategory: 'Other Settings'
    })
    generalHideUIToggle = false;

    @SwitchProperty({
        name: 'Hide creature/dh messages',
        description: 'Hides the dh/creature chat messages',
        category: 'General Fishing',
        subcategory: 'Other Settings'
    })
    creatureDhHideToggle = false;

    //Power Orbs -----------------
    @SwitchProperty({
        name: 'Toggle power orb tracker',
        description: 'Enable power orb utils\nMust be on if you want to use any features below',
        category: 'Deployables',//Deployables
        subcategory: 'Power Orbs'
    })
    fluxToggle = true;

    //Title
    @SwitchProperty({
        name: 'Alert power orb expired on screen',
        description: 'Sends the message in the middle of screen through titles',
        category: 'Deployables',
        subcategory: 'Power Orbs'
    })
    fluxTitleToggle = true;

    @TextProperty({
        name: '● Power orb expired title message',
        description: 'Customize the power orb expired title message.',
        category: 'Deployables',
        subcategory: 'Power Orbs'
    })
    fluxTitleMessage = '&dPower Orb Expired!'

    // Message
    @SwitchProperty({
        name: 'Toggle power orb expired messages',
        description: 'Sends messages whenever the power orb expires',
        category: 'Deployables',
        subcategory: 'Power Orbs'
    })
    fluxMessageToggle = false;

    //Timer
    @SwitchProperty({
        name: 'Toggle power orb timer',
        description: 'Shows the power orb timer on your screen\n/rfumove to move it',
        category: 'Deployables',
        subcategory: 'Power Orbs'
    })
    fluxTimerToggle = true;
    // Flares =---------------------------------------------------------------
    @SwitchProperty({
        name: 'Toggle flare tracker',
        description: 'Enable flare utils\nMust be on if you want to use any features below',
        category: 'Deployables',
        subcategory: 'Flares'
    })
    flareToggle = true;

    //Title
    @SwitchProperty({
        name: 'Alert flare expired on screen',
        description: 'Sends the message in the middle of screen through titles',
        category: 'Deployables',
        subcategory: 'Flares'
    })
    flareTitleToggle = true;

    @TextProperty({
        name: '● Flare expired title message',
        description: 'Customize the flare expired title message.',
        category: 'Deployables',
        subcategory: 'Flares'
    })
    flareTitleMessage = '&6Flare Expired!'

    // Message
    @SwitchProperty({
        name: 'Toggle flare expired messages',
        description: 'Sends messages whenever the flare expires',
        category: 'Deployables',
        subcategory: 'Flares'
    })
    flareMessageToggle = false;

    //Timer
    @SwitchProperty({
        name: 'Toggle flare timer',
        description: 'Shows the flare timer on your screen\n/rfumove to move it',
        category: 'Deployables',
        subcategory: 'Flares'
    })
    flareTimerToggle = true;

    @TextProperty({
        name: 'Deployable chat message',
        description: "Customize the deployable expired message. Write ([deployable]) to show the deployable's name",
        category: 'Deployables',
        subcategory: 'All Deployables'
    })
    deployableMessage = '([tableflip]) ([deployable]) Expired!';

    @SwitchProperty({
        name: 'Toggle deployable sound',
        description: 'Plays a sound when a flare expires',
        category: 'Deployables',
        subcategory: 'All Deployables'
    })
    deployableSoundToggle = false;

    @TextProperty({
        name: '● Deployable expired sound',
        description: 'Customize the deployable expired sound, Default: mob.irongolem.death',
        category: 'Deployables',
        subcategory: 'All Deployables'
    })
    deployableSound = 'mob.irongolem.death'

    @PercentSliderProperty({
        name: '● Deployable sound volume',
        description: 'The volume of the deployable expired sound',
        category: 'Deployables',
        subcategory: 'All Deployables'
    })
    deployableSoundVolume = 1.0;

    @SliderProperty({
        name: '● Deployable sound pitch',
        description: 'The pitch of the deployable expired sound',
        category: 'Deployables',
        subcategory: 'All Deployables',
        min: 0,
        max: 200
    })
    deployableSoundPitch = 100;

    @SwitchProperty({
        name: 'Hide UI if not present',
        description: 'Hides the UI if there is no deployable',
        category: 'Deployables',
        subcategory: 'All Deployables'
    })
    deployableHideToggle = false;

    //=-------------------------------------
    @SwitchProperty({
        name: 'Alert when mana goes below a percentage',
        description: 'Sends the message in the middle of screen through titles',
        category: 'Player Stats',
        subcategory: 'Mana'
    })
    manaTitleToggle = true;

    @PercentSliderProperty({
        name: '● Mana percentage',
        description: 'The percentage needed for the title message',
        category: 'Player Stats',
        subcategory: 'Mana'
    })
    manaWarnPercentage = 0.3;

    @TextProperty({
        name: '● Mana low Title message',
        description: 'Customize the mana low title message.',
        category: 'Player Stats',
        subcategory: 'Mana'
    })
    manaTitleMessage = '&b&lMana low!'

    //-----------------------------------------------------------------------------------//

    //Pets
    @SwitchProperty({
        name: 'Toggle pet display',
        description: 'Shows the currently equipped pet on your screen\n/rfumove to move it',
        category: 'Pets',
        subcategory: 'Pet Display'
    })
    petDisplayToggle = true;

    //----------------------------------------------------------------------//

    @SwitchProperty({
        name: 'Toggle boss health bar',
        description: 'Shows a health bar for bosses on your screen\n/rfumove to move it',
        category: 'Crimson Fishing',
        subcategory: 'Boss Bar'
    })
    bossHealthBarToggle = true;

    @SliderProperty({
        name: '● Boss health bar length',
        description: 'Change the length of the health bar',
        category: 'Crimson Fishing',
        subcategory: 'Boss Bar',
        min: 200,
        max: 600
    })
    BossHealthBarLength = 200;

    @CheckboxProperty({
        name: '● Toggle jawbus health bar',
        description: 'Shows a health bar for jawbus on the boss bar',
        category: 'Crimson Fishing',
        subcategory: 'Boss Bar'
    })
    jawbusHealthBarToggle = true;

    @CheckboxProperty({
        name: '● Toggle thunder health bar',
        description: 'Shows a health bar for thunder on the boss bar',
        category: 'Crimson Fishing',
        subcategory: 'Boss Bar'
    })
    thunderHealthBarToggle = true;

    @CheckboxProperty({
        name: '● Toggle plhlegblast health bar',
        description: 'Shows a health bar for plhlegblast on the boss bar',
        category: 'Crimson Fishing',
        subcategory: 'Boss Bar'
    })
    plhlegblastHealthBarToggle = true;

    //----------------------------------------------------------------------//

    @SwitchProperty({
        name: 'Toggle fisherman tracking',
        description: 'Saves the location of fishermans upon seeing them fish and detects player deaths',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    fishermanTrackingToggle = false;

    @CheckboxProperty({
        name: '● Warn upon Jawbus Death',
        description: 'Warns you if a player dies to jawbus',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    jawbusDeathWarnToggle = true;

    @CheckboxProperty({
        name: '● Warn upon Thunder Death',
        description: 'Warns you if a player dies to thunder',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    thunderDeathWarnToggle = false;

    @SliderProperty({
        name: '● Warn cooldown',
        description: 'The minimum amount of time in seconds between warns',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking',
        min: 0,
        max: 300
    })
    deathWarnCooldown = 60;

    @SwitchProperty({
        name: '● Player coords on warn',
        description: 'Shows you the last known coords of the fisherman who died',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    deathWarnCoordsToggle = true;

    @SwitchProperty({
        name: '● Render box on coords on warn',
        description: 'Renders a box in the last known coords of the fisherman who died, getting close to it will stop showing it\nrequires player coords on warn to be active',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    deathWarnRenderToggle = true;

    @SwitchProperty({
        name: '● Sound on warn',
        description: 'Plays a sound whenever someone dies to one of the rare creatures',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    deathWarnSoundToggle = true;

    @PercentSliderProperty({
        name: '● Warn sound volume',
        description: 'The volume of the death warn sound',
        category: 'Crimson Fishing',
        subcategory: 'Fisherman Tracking'
    })
    deathWarnSoundVolume = 0.1;

    //

    @SwitchProperty({
        name: 'Plhlegblast UI',
        description: 'Shows the status for plhlegblast',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures UI'
    })
    plhlegblastUIToggle = true;

    @SwitchProperty({
        name: 'Jawbus UI',
        description: 'Shows the status for jawbus',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures UI'
    })
    jawbusUIToggle = true;

    @SwitchProperty({
        name: 'Thunder UI',
        description: 'Shows the status for thunder',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures UI'
    })
    thunderUIToggle = true;

    @SwitchProperty({
        name: 'Vanquisher UI',
        description: 'Shows the status for vanquishers',
        category: 'Crimson Fishing',
        subcategory: 'Vanquisher'
    })
    vanquisherUIToggle = true;

    @SwitchProperty({
        name: 'Toggle Mythic Creature party messages',
        description: 'Sends messages whenever you spawn a mythic sc',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Messages'
    })
    mythicMessageToggle = true;

    @TextProperty({
        name: '● Plhlegblast',
        description: 'Customize the plhlegblast message.\n write ([number]) to show the catch count, write ([time]) to show the time it took , write ([coords]) to show the coords, write ([double]) on where you want "Double" on whenever you get a dh, leave empty to disable it',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Messages',
    })
    mythicPlhlegblastMessage = '([hooray]) ([double])Plhlegblast (([number]) catches, ([time]))';

    @TextProperty({
        name: '● Jawbus',
        description: 'Customize the jawbus message.\n write ([number]) to show the catch count, write ([time]) to show the time it took , write ([coords]) to show the coords, write ([double]) on where you want "Double" on whenever you get a dh, leave empty to disable it',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Messages',
    })
    mythicJawbusMessage = '([surprised]) ([double])Lord Jawbus (([number]) catches, ([time]))';

    @TextProperty({
        name: '● Thunder',
        description: 'Customize the thunder message.\n write ([number]) to show the catch count, write ([time]) to show the time it took , write ([coords]) to show the coords, write ([double]) on where you want "Double" on whenever you get a dh, leave empty to disable it',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Messages',
    })
    mythicThunderMessage = '([mixface]) ([double])Thunder (([number]) catches, ([time]))';

    @SwitchProperty({
        name: 'Toggle vanquisher party messages',
        description: 'Sends messages whenever you spawn a vanquisher',
        category: 'Crimson Fishing',
        subcategory: 'Vanquisher'
    })
    vanquisherMessageToggle = true;

    @SwitchProperty({
        name: 'Toggle Mythic Creature Detection',
        description: 'Warns you if there is a mythic creature nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    mythicDetectionToggle = true;
    
    @CheckboxProperty({
        name: '● Plhlegblast Detection',
        description: 'Warns you if there is a plhlegblast nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    plhlegblastDetectionToggle = true;

    @CheckboxProperty({
        name: '● Jawbus Detection',
        description: 'Warns you if there is a jawbus nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    jawbusDetectionToggle = true;

    @CheckboxProperty({
        name: '● Thunder Detection',
        description: 'Warns you if there is a thunder nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    thunderDetectionToggle = true;

    @TextProperty({
        name: '● Mythic Creature Detection Title',
        description: 'Customize the detection message. Write ([mob]) to see the mob name',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    mythicDetectionMessage = '&4&l([mob]) detected!';

    @SwitchProperty({
        name: '● Sound on detection',
        description: 'Plays a sound whenever a mythic creature is detected',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    mythicDetectionSoundToggle = true;

    @PercentSliderProperty({
        name: '● Mythic detection sound volume',
        description: 'The volume of the death warn sound',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Detection'
    })
    mythicDetectionSoundVolume = 1;

    @TextProperty({
        name: '● Vanquisher message',
        description: 'Customize the vanquisher message.\n write ([number]) to show the kill count, write ([time]) to show the time it took , write ([coords]) to show the coords',
        category: 'Crimson Fishing',
        subcategory: 'Vanquisher',
    })
    vanquisherMessage = 'Vanquisher (([number]) sea creature kills, ([time]))';

    @SwitchProperty({
        name: 'Toggle Mythic Creature lootshare range',
        description: 'shows you the lootshare range if there is a mythic creature nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Lootsharing'
    })
    mythicLootshareToggle = true;

    @CheckboxProperty({
        name: '● Plhlegblast lootshare range',
        description: 'shows you the lootshare range if there is a plhlegblast nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Lootsharing'
    })
    mythicLootsharePlhlegblastToggle = true;

    @CheckboxProperty({
        name: '● Jawbus lootshare range',
        description: 'shows you the lootshare range if there is a jawbus nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Lootsharing'
    })
    mythicLootshareJawbusToggle = true;

    @CheckboxProperty({
        name: '● Thunder lootshare range',
        description: 'shows you the lootshare range if there is a thunder nearby',
        category: 'Crimson Fishing',
        subcategory: 'Mythic Creatures Lootsharing'
    })
    mythicLootshareThunderToggle = true;

    @SwitchProperty({
        name: 'Hide UI if not relevant - Crimson',
        description: 'Hides the UIs in this page if not fishing in a relevant spot',
        category: 'Crimson Fishing',
        subcategory: 'Other Settings'
    })
    crimsonHideUIToggle = false;

    //

    @SwitchProperty({
        name: 'Toggle radioactive vial message',
        description: 'Sends messages upon dropping vial',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialMessageToggle = true;

    @TextProperty({
        name: '● Vial dropped message',
        description: 'Customize the vial message.\n write ([number]) to show the kill count, write ([time]) to show the time it took, write ([mf]) for magic find',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialMessage = 'RARE DROP! Radioactive Vial (+([mf])% ✯ Magic Find (([number]) Jawbus Kills, ([time]))';

    @CheckboxProperty({
        name: '● Party Chat',
        description: 'The message will be sent to party chat',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialPartyChatToggle = true;

    @CheckboxProperty({
        name: '● Guild Chat',
        description: 'The message will also be sent to guild chat',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialGuildChatToggle = true;

    @CheckboxProperty({
        name: '● All Chat',
        description: 'The message will also be sent to all chat',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialAllChatToggle = false;

    @CheckboxProperty({
        name: '● Coop Chat',
        description: 'The message will also be sent to coop chat',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialCoopChatToggle = false;
    
    @SwitchProperty({
        name: 'Toggle radioactive vial UI',
        description: 'Ui that shows jawbus and time since last vial',
        category: 'Rare Drops',
        subcategory: 'Radioactive Vial'
    })
    vialUIToggle = true;

    @SwitchProperty({
        name: 'Toggle random drops message',
        description: 'Sends messages upon dropping Attribute Shards/Magma Lord frags/ Flash book / Bobbin',
        category: 'Rare Drops',
        subcategory: 'Other Drops'
    })
    dropsMessageToggle = true;

    @SwitchProperty({
        name: '● Toggle air drop',
        description: 'Sends an air dropped message if you dont drop anything lol, will trigger for any Thunders/Jawbus that die near you',
        category: 'Rare Drops',
        subcategory: 'Other Drops'
    })
    dropsAirMessageToggle = true;

    //----------------------------------------------------------------------//
    @SwitchProperty({
        name: 'Toggle pet level up titles',
        description: 'Shows a title whenever a pet levels up',
        category: 'Pets',
        subcategory: 'Pet Level Up'
    })
    petTitleToggle = true;

    @SliderProperty({
        name: '● Pet level title alert',
        description: "Set the number of levels needed to start showing the title message",
        category: 'Pets',
        subcategory: 'Pet Level Up',
        min: 1,
        max: 100
    })
    petTitleLimit = 100;
    
    @TextProperty({
        name: '● Pet level Title message',
        description: 'Customize the level up title message.\n write ([level]) to show the level, write ([pet]) to show the pet name',
        category: 'Pets',
        subcategory: 'Pet Level Up'
    })
    petTitleMessage = '&6&l([pet]) level ([level])';

    //----------------------------------------------------------------------//

    // Phoenix/Smask used
    @SwitchProperty({
        name: 'Toggle phoenix pet used title',
        description: 'Shows a title whenever you die with phoenix and whenever the cooldown ends',
        category: 'Other',
        subcategory: 'Death'
    })
    phoenixTitleToggle = true;

    @SwitchProperty({
        name: 'Toggle spirit mask used title',
        description: 'Shows a title whenever you die with spirit mask and whenever the cooldown ends',
        category: 'Other',
        subcategory: 'Death'
    })
    spiritTitleToggle = true;

    @SwitchProperty({
        name: 'Spirit mask status UI',
        description: 'Shows the status of spirit mask on your screen',
        category: 'Other',
        subcategory: 'Death'
    })
    deathItemSpiritMaskStatusToggle = true;

    @SwitchProperty({
        name: 'Phoenix mask status UI',
        description: 'Shows the status of phoenix on your screen',
        category: 'Other',
        subcategory: 'Death'
    })
    deathItemPhoenixStatusToggle = true;

    @SwitchProperty({
        name: 'Hide UI for Phoenix/Spirit Mask if not using',
        description: 'Hides the phoenix/spirit mask UI if you dont have a phoenix/spirit mask equipped',
        category: 'Other',
        subcategory: 'Death'
    })
    deathItemStatusUIToggle = false;

    @SwitchProperty({
        name: 'Toggle rendering fishing rod timer on screen',
        description: 'renders the fishing rod timer on your screen',
        category: 'Other',
        subcategory: 'Fishing rod timer'
    })
    rodTimerToggle = true;

    @TextProperty({
        name: '● Rod Timer UI text',
        description: 'Customize rod timer UI.\n write ([time]) to show the timer\nThis is a different one, you should write it like this: ([time])|Click! , the things to the left of | will appear on the timer and the things to the right will appear when the timer is on !!!\n(you may need to add some spaces so it gets centered)',
        category: 'Other',
        subcategory: 'Fishing rod timer'
    })
    rodTimerUI = ' &e&l([time])|&c&lClick!';

    //Custom Messages Fun
    @SliderProperty({
        name: 'Title fade in',
        description: 'Time in ticks it takes for the title to appear, default: 10',
        category: 'Other',
        subcategory: 'Title times',
        min: 0,
        max: 200
    })
    titleFadeIn = 10;

    @SliderProperty({
        name: 'Title duration',
        description: 'Time in ticks the title remains fully visible, default: 40',
        category: 'Other',
        subcategory: 'Title times',
        min: 1,
        max: 200
    })
    titleDuration = 40;

    @SliderProperty({
        name: 'Title fade out',
        description: 'Time in ticks it takes for the title to disappear, default: 10',
        category: 'Other',
        subcategory: 'Title times',
        min: 0,
        max: 200
    })
    titleFadeOut = 10;

    @SelectorProperty({
        name: 'Messages chat',
        description: "Select the chat all the mod messages will be sent to. Default: Party/Local",
        category: 'Other',
        subcategory: 'Chat',
        options: ['Party', 'Guild', 'AllChat', 'Party/Local','Local', 'Coop']
    })
    ChatSelected = 3;

    @SliderProperty({
        name: 'Render box duration',
        description: 'The amount of time in seconds a render box stays up if you dont get close to it',
        category: 'Other',
        subcategory: 'Rendering',
        min: 1,
        max: 300
    })
    renderDuration = 60;

    @SwitchProperty({
        name: 'Toggle chat coords',
        description: 'Renders coords sent in chat',
        category: 'Other',
        subcategory: 'Rendering',
    })
    renderChatCoords = true;

    @SwitchProperty({
        name: 'Toggle cool item rendering',
        description: 'Renders a bg and the attributes of useful pieces',
        category: 'Other',
        subcategory: 'Rendering',
    })
    renderItems = true;

    @SwitchProperty({
        name: 'Toggle cool item rendering Background',
        description: 'Renders the background on useful pieces',
        category: 'Other',
        subcategory: 'Rendering',
    })
    renderItemsBg = true;

    //

    @SliderProperty({
        name: 'General Fishing Detection Rate',
        description: 'The ammout of times per second the detections on the general fishing page, higher values will lead to more accurate readings but may cause lag, Default: 3 \nOnly updates with /ct reload',
        category: 'Other',
        subcategory: 'Detection Rate',
        min: 1,
        max: 60
    })
    seaCreaturePollingrate = 3;

    @SliderProperty({
        name: 'Crimson Fishing Detection Rate',
        description: 'The ammout of times per second the detections on the Crimson Fishing page are made, higher values will lead to more accurate readings but may cause lag, Default: 3 \nOnly updates with /ct reload',
        category: 'Other',
        subcategory: 'Detection Rate',
        min: 1,
        max: 60
    })
    chPollingrate = 3;

    @SliderProperty({
        name: 'Crimson BarDetection Rate',
        description: 'The ammout of times per second the crismon health bar updates, higher values will lead to more accurate readings but may cause lag, Default: 10 \nOnly updates with /ct reload',
        category: 'Other',
        subcategory: 'Detection Rate',
        min: 1,
        max: 60
    })
    chBossPollingrate = 10;

    //
    @TextProperty({
        name: 'Add characters to messages',
        description: 'Every custom message in this mod can have faces added to them, they can be called by using ([name])\nUse this to add more faces!\nto add a face it must be composed of 2 names separated by "," if you wanna add more faces use "|" to separate them, example: shrug,¯\\_(ツ)_/¯|kiss,٩(*❛⊰❛)～❤\nuse /rfufaces to check which faces are enabled',
        category: 'Other',
        subcategory: 'Fun Messaging'
    })
    FunMessages = 'shrug,¯\\_(ツ)_/¯|kiss,٩(*❛⊰❛)～❤|flowersmile,(◕‿◕✿)|disapointed,(ㆆ _ ㆆ)|tableflip,(╯°o°)╯︵ ┻━┻|tablefliprage,(ノಠ益ಠ)ノ彡┻━┻|eyes,(ಠ_ಠ)|dog,▼・ᴥ・▼|hooray,\\ (•◡•) /|meh,(¬_¬)|mad,ಠ╭╮ಠ|wink,◕‿↼|surprised,(╯°o°)╯|mixface,┌( ಠ_ಠ)┘'

    @SwitchProperty({
        name: 'Lobby Tracking',
        description: 'Sends a chat message if you`ve been to a lobby before',
        category: 'Other',
        subcategory: 'Other Settings'
    })
    lobbyTracking = true;

    // Trophy

    @SwitchProperty({
        name: 'Show sulphur range on right click',
        description: 'Shows the range of the sulphur block when right clicking it, click again to stop showing\nFun fact: it actually makes sense now!',
        category: 'Trophy Fishing',
        subcategory: 'Sulphur Block'
    })
    sulphurRightClickToggle = true;

    @SwitchProperty({
        name: 'Golden Fish Timer',
        description: 'A golden fish timer!',
        category: 'Trophy Fishing',
        subcategory: 'Golden Fish'
    })
    goldenTimerToggle = true;

    @SwitchProperty({
        name: 'Hide UI if not relevant - Trophy Fishing',
        description: 'Hides the UIs in this page if not fishing',
        category: 'Trophy Fishing',
        subcategory: 'Other Settings'
    })
    trophyHideUIToggle = false;

    constructor() {
        this.initialize(this);
        // Party Commands Tab
        this.setSubcategoryDescription('Chat Commands', 'Party Commands', 'Let the members also control the party\ncommands: help, invite ign, warp, togglewarp, transfer ign, allinvite, coords');
        this.addDependency("Command Cooldown", "Toggle Party Commands");
        this.addDependency("Command Prefix", "Toggle Party Commands");
        this.addDependency("help", "Toggle Party Commands");
        this.addDependency("invite", "Toggle Party Commands");
        this.addDependency("warp", "Toggle Party Commands");
        this.addDependency("transfer", "Toggle Party Commands");
        this.addDependency("allinvite", "Toggle Party Commands");
        this.addDependency("Command Blacklist", "Toggle Party Commands");
        this.addDependency("coords", "Toggle Party Commands");
        this.addDependency('New Member Help Command', "Toggle Party Commands");
        this.addDependency('togglewarp', "Toggle Party Commands");
        this.addDependency('● Leader Only New Member Help', 'Toggle Party Commands');
        // CH FISHING TAB
        // WORM FISHING
        this.addDependency('● Worm number message alert', 'Toggle worm party messages');
        this.addDependency('● Worm party message', 'Toggle worm party messages');
        //title
        this.addDependency('● Worm number title alert', 'Alert worm count on screen');
        this.addDependency('● Worm Cap Title message', 'Alert worm count on screen');
        this.addDependency('● Worm Cap Title message subtitle', 'Alert worm count on screen');
        //sound
        this.addDependency('● Worm number sound', 'Toggle worm count Sound');
        this.addDependency('● Worm Sound', 'Toggle worm count Sound');
        this.addDependency('● Worm sound volume', 'Toggle worm count Sound');
        this.addDependency('● Worm sound pitch', 'Toggle worm count Sound');
        // Corruption totem
        //Title
        this.addDependency('● Totem Expired Title message', 'Alert Totem Expired on Screen');
        //Sound
        this.addDependency('● Sea creature number sound', 'Toggle sea creature count Sound'); 
        this.addDependency('● Sea creature count Sound', 'Toggle sea creature count Sound'); 
        this.addDependency('● Sea creature sound volume', 'Toggle sea creature count Sound'); 
        this.addDependency('● Sea creature sound pitch', 'Toggle sea creature count Sound'); 
        // Title
        this.addDependency('● Creature number title alert', 'Alert sea creature count on screen');
        this.addDependency('● Sea Creature Title message', 'Alert sea creature count on screen');
        this.addDependency('● Sea Creature Title message subtitle', 'Alert sea creature count on screen');
        //Message
        this.addDependency('● Sea Creature number message alert', 'Toggle sea creature party messages');
        this.addDependency('● Sea Creature party message', 'Toggle sea creature party messages');
        // Deployables
        this.addDependency('● Deployable expired sound', 'Toggle deployable sound');
        this.addDependency('● Deployable sound volume', 'Toggle deployable sound');
        this.addDependency('● Deployable sound pitch', 'Toggle deployable sound');
        // Power Orbs
        this.addDependency('● Power orb expired title message','Alert power orb expired on screen');
        // Flares
        this.addDependency('● Flare expired title message','Alert flare expired on screen');
        // Mana Below alert
        this.addDependency('● Mana percentage','Alert when mana goes below a percentage');
        this.addDependency('● Mana low Title message','Alert when mana goes below a percentage');
        // Crimson Fishing
        this.addDependency('● Boss health bar length', 'Toggle boss health bar');
        this.addDependency('● Toggle jawbus health bar', 'Toggle boss health bar');
        this.addDependency('● Toggle thunder health bar', 'Toggle boss health bar');
        // Fisherman Tracking
        this.addDependency('● Warn upon Jawbus Death', 'Toggle fisherman tracking');
        this.addDependency('● Warn upon Thunder Death', 'Toggle fisherman tracking');
        this.addDependency('● Warn cooldown', 'Toggle fisherman tracking');
        this.addDependency('● Player coords on warn', 'Toggle fisherman tracking');
        this.addDependency('● Render box on coords on warn', 'Toggle fisherman tracking');
        this.addDependency('● Sound on warn', 'Toggle fisherman tracking');
        this.addDependency('● Warn sound volume', 'Toggle fisherman tracking');
        // Pet level up
        this.addDependency('● Pet level title alert','Toggle pet level up titles');
        this.addDependency('● Pet level Title message','Toggle pet level up titles');
        //mythic detect
        this.addDependency('● Mythic Creature Detection Title','Toggle Mythic Creature Detection');
        this.addDependency('● Plhlegblast Detection','Toggle Mythic Creature Detection');
        this.addDependency('● Jawbus Detection','Toggle Mythic Creature Detection');
        this.addDependency('● Thunder Detection','Toggle Mythic Creature Detection');
        this.addDependency('● Sound on detection','Toggle Mythic Creature Detection');
        this.addDependency('● Mythic detection sound volume','Toggle Mythic Creature Detection');
        //Lootshare range
        this.addDependency('● Plhlegblast lootshare range','Toggle Mythic Creature lootshare range');
        this.addDependency('● Jawbus lootshare range','Toggle Mythic Creature lootshare range');
        this.addDependency('● Thunder lootshare range','Toggle Mythic Creature lootshare range');
        //Sc per hour
        this.addDependency('● Sc/hr time to reset', 'Sea creatures per hour UI');
        //vanq msg,
        this.addDependency('● Vanquisher message','Toggle vanquisher party messages');
        //Double hook messages
        this.addDependency('● Double hook message','Toggle double hook messages');
        // Rare drops
        this.addDependency('● Vial dropped message','Toggle radioactive vial message');
        this.addDependency('● Party Chat','Toggle radioactive vial message');
        this.addDependency('● Guild Chat','Toggle radioactive vial message');
        this.addDependency('● All Chat','Toggle radioactive vial message');
        this.addDependency('● Coop Chat','Toggle radioactive vial message');
        //
        this.addDependency('● Rod Timer UI text','Toggle rendering fishing rod timer on screen');
        //
        this.addDependency('● Toggle air drop', 'Toggle random drops message');
    }
}

export default new Settings();
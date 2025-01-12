import settings from "./settings";
import { playerData } from "../data/data";
import oldValues from "../utils/settings"

//? Code to update from old settings to new settings

let timeout = 0
function setConfigValue(category, key, value, multiCheckbox) {
    if(settings()[key] !== value) {
        setTimeout(() => {
            settings().getConfig().setConfigValue(category, key, value, multiCheckbox)
            ChatLib.chat(`&5[&b&lRFU&5] &6&lConverted ${key}`)
        }, timeout);
        timeout += 1000
    }
}


function convertOldConfigToNew() {

    //Chat Commands
    setConfigValue("Chat Commands", "partyCommands", oldValues.partyCommands)
    setConfigValue("Chat Commands", "partyCooldown", oldValues.partyCooldown)
    setConfigValue("Chat Commands", "partyPrefix", oldValues.partyPrefix)
    setConfigValue("Chat Commands", "partyJoinHelp", oldValues.partyJoinHelp)
    setConfigValue("Chat Commands", "partyJoinHelpLeader", oldValues.partyJoinHelpLeader)

    setConfigValue("Chat Commands", "partyHelp", oldValues.partyHelp, "commandsMultiCheckbox")
    setConfigValue("Chat Commands", "partyInvite", oldValues.partyInvite, "commandsMultiCheckbox")
    setConfigValue("Chat Commands", "partyWarp", oldValues.partyWarp, "commandsMultiCheckbox")
    setConfigValue("Chat Commands", "partyToggleWarp", oldValues.partyToggleWarp, "commandsMultiCheckbox")
    setConfigValue("Chat Commands", "partyTransfer", oldValues.partyTransfer, "commandsMultiCheckbox")
    setConfigValue("Chat Commands", "partyAllinvite", oldValues.partyAllinvite, "commandsMultiCheckbox")
    setConfigValue("Chat Commands", "partyCoords", oldValues.partyCoords, "commandsMultiCheckbox")
    
    setConfigValue("Chat Commands", "partyWarpMuted", oldValues.partyWarpMuted)
    setConfigValue("Chat Commands", "partyBlacklist", oldValues.partyBlacklist)

    setConfigValue("Chat Commands", "infoJawbus", oldValues.infoJawbus, "infoCommandsMultiCheckbox")
    setConfigValue("Chat Commands", "infoThunder", oldValues.infoThunder, "infoCommandsMultiCheckbox")
    setConfigValue("Chat Commands", "infoVial", oldValues.infoVial, "infoCommandsMultiCheckbox")

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

    //Player Stats
    setConfigValue("Player Stats", "manaTitleToggle", oldValues.manaTitleToggle)
    setConfigValue("Player Stats", "manaWarnPercentage", oldValues.manaWarnPercentage)
    setConfigValue("Player Stats", "manaTitleMessage", oldValues.manaTitleMessage)
    
    //Pets
    setConfigValue("Pets", "petDisplayToggle", oldValues.petDisplayToggle)
    setConfigValue("Pets", "petTitleToggle", oldValues.petTitleToggle)
    setConfigValue("Pets", "petTitleLimit", oldValues.petTitleLimit)
    setConfigValue("Pets", "petTitleMessage", oldValues.petTitleMessage)

    //Crimson Fishing
    setConfigValue("Crimson Fishing", "bossHealthBarToggle", oldValues.bossHealthBarToggle)
    setConfigValue("Crimson Fishing", "BossHealthBarLength", oldValues.BossHealthBarLength)
    setConfigValue("Crimson Fishing", "jawbusHealthBarToggle", oldValues.jawbusHealthBarToggle, "bossBarMultiCheckbox")
    setConfigValue("Crimson Fishing", "thunderHealthBarToggle", oldValues.thunderHealthBarToggle, "bossBarMultiCheckbox")
    setConfigValue("Crimson Fishing", "plhlegblastHealthBarToggle", oldValues.plhlegblastHealthBarToggle, "bossBarMultiCheckbox")
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
    setConfigValue("Crimson Fishing", "plhlegblastDetectionToggle", oldValues.plhlegblastDetectionToggle, "bossDetectionMultiCheckbox")
    setConfigValue("Crimson Fishing", "jawbusDetectionToggle", oldValues.jawbusDetectionToggle, "bossDetectionMultiCheckbox")
    setConfigValue("Crimson Fishing", "thunderDetectionToggle", oldValues.thunderDetectionToggle, "bossDetectionMultiCheckbox")
    setConfigValue("Crimson Fishing", "mythicDetectionMessage", oldValues.mythicDetectionMessage)
    setConfigValue("Crimson Fishing", "mythicDetectionSoundToggle", oldValues.mythicDetectionSoundToggle)
    setConfigValue("Crimson Fishing", "mythicDetectionSoundVolume", oldValues.mythicDetectionSoundVolume)
    setConfigValue("Crimson Fishing", "vanquisherMessage", oldValues.vanquisherMessage)
    setConfigValue("Crimson Fishing", "mythicLootshareToggle", oldValues.mythicLootshareToggle)
    setConfigValue("Crimson Fishing", "mythicLootsharePlhlegblastToggle", oldValues.mythicLootsharePlhlegblastToggle, "mythicLootshareMultiCheckbox")
    setConfigValue("Crimson Fishing", "mythicLootshareJawbusToggle", oldValues.mythicLootshareJawbusToggle, "mythicLootshareMultiCheckbox")
    setConfigValue("Crimson Fishing", "mythicLootshareThunderToggle", oldValues.mythicLootshareThunderToggle, "mythicLootshareMultiCheckbox")
    setConfigValue("Crimson Fishing", "crimsonHideUIToggle", oldValues.crimsonHideUIToggle)

    //Rare Drops
    setConfigValue("Rare Drops", "vialMessageToggle", oldValues.vialMessageToggle)
    setConfigValue("Rare Drops", "vialMessage", oldValues.vialMessage)
    setConfigValue("Rare Drops", "vialPartyChatToggle", oldValues.vialPartyChatToggle, "vialChatCheckbox")
    setConfigValue("Rare Drops", "vialGuildChatToggle", oldValues.vialGuildChatToggle, "vialChatCheckbox")
    setConfigValue("Rare Drops", "vialAllChatToggle", oldValues.vialAllChatToggle, "vialChatCheckbox")
    setConfigValue("Rare Drops", "vialCoopChatToggle", oldValues.vialCoopChatToggle, "vialChatCheckbox")
    setConfigValue("Rare Drops", "vialUIToggle", oldValues.vialUIToggle)
    setConfigValue("Rare Drops", "dropsMessageToggle", oldValues.dropsMessageToggle)
    setConfigValue("Rare Drops", "dropsMessageToggle", oldValues.dropsAirMessageToggle)

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

    //Trophy Fishing
    setConfigValue("Trophy Fishing", "sulphurRightClickToggle", oldValues.sulphurRightClickToggle)
    setConfigValue("Trophy Fishing", "goldenTimerToggle", oldValues.goldenTimerToggle)
    setConfigValue("Trophy Fishing", "trophyHideUIToggle", oldValues.trophyHideUIToggle)

    setTimeout(() => {
        playerData.SETTINGS.Updated = true
        playerData.save()
        ChatLib.chat("&5[&b&lRFU&5] &a&lDone Updating! &f&lRecomended Restarting Game")
    }, timeout);
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
                .setHover("show_text", "&cThis may lag a bit and will take a while if you have modified a lot of settings from its original state")
                .setClick("run_command", "rfurunconfigconversion"),
                new TextComponent(`\n&c&l[Click to not see this again]\n`)
                .setClick("run_command", "rfusetsettingstoupdated"),
            )
        )
    }
    updateSettingsRegister.unregister()
})
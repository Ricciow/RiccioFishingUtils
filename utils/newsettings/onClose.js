import Manager from "../../gui/guiManager"
import settings from "../settings"

const SettingsGui = Java.type("gg.essential.vigilance.gui.SettingsGui")

export function updateUI() {
    //Disable totem UI if it has the settings turned off.
    Manager.updateElement("TotemTimer", settings.totemToggle && settings.totemTimerToggle)

    //Toggle Power Orb UI
    Manager.updateElement("PowerOrbTimer", settings.fluxToggle && settings.fluxTimerToggle)

    //Toggle Flare UI
    Manager.updateElement("FlareTimer", settings.flareToggle && settings.flareTimerToggle)

    //Toggle Creatures UI
    Manager.updateElement("SeaCreatureCount", settings.seaCreatureCounterToggle && settings.seaCreatureCounterUiToggle)

    //Toggle Creatures/Hour UI
    Manager.updateElement("SeaCreatureHour", settings.seaCreatureCounterToggle && settings.seacreatureHourUIToggle)

    //Bobber Count UI
    Manager.updateElement("BobberCount", settings.bobberUIToggle)

    //Rod Timer UI
    Manager.updateElement("RodTimer", settings.rodTimerToggle)

    //Plhlegblast UI
    Manager.updateElement("PlhlegblastTimer", settings.plhlegblastUIToggle)

    //Jawbus UI
    Manager.updateElement("JawbusTimer", settings.jawbusUIToggle)

    //Thunder UI
    Manager.updateElement("ThunderTimer", settings.thunderUIToggle)

    //Vanquisher UI
    Manager.updateElement("VanquisherTimer", settings.vanquisherUIToggle)

    //Vial UI
    Manager.updateElement("JawbusVialTimer", settings.vialUIToggle)

    //Phoenix
    Manager.updateElement("PhoenixTimer", settings.deathItemPhoenixStatusToggle)

    //Spirit Mask
    Manager.updateElement("SpiritMaskTimer", settings.deathItemSpiritMaskStatusToggle)

    //Pet Display
    Manager.updateElement("PetDisplay", settings.petDisplayToggle)

    //Golden Fish Timer
    Manager.updateElement("GoldenFishTimer", settings.goldenTimerToggle)

    //BossBar
    Manager.updateElement("BossBar", settings.bossHealthBarToggle, undefined, undefined, settings.BossHealthBarLength)
}

register('guiClosed', (gui) => {
    if (gui instanceof SettingsGui) {
        updateUI()
    }
})
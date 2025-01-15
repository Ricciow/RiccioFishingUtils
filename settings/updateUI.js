import Manager from "../gui/guiManager"
import settings from "./settings"
import { playerData } from "../data/data"

export function updateUI() {
    //Disable totem UI if it has the settings(). turned off.
    Manager.updateElement("TotemTimer", settings().totemToggle && settings().totemTimerToggle && playerData.GUI["Toggle"])

    //Toggle Power Orb UI
    Manager.updateElement("PowerOrbTimer", settings().fluxToggle && settings().fluxTimerToggle && playerData.GUI["Toggle"])

    //Toggle Flare UI
    Manager.updateElement("FlareTimer", settings().flareToggle && settings().flareTimerToggle && playerData.GUI["Toggle"])

    //Toggle Creatures UI
    Manager.updateElement("SeaCreatureCount", settings().seaCreatureCounterToggle && settings().seaCreatureCounterUIToggle && playerData.GUI["Toggle"])

    //Toggle Creatures/Hour UI
    Manager.updateElement("SeaCreatureHour", settings().seaCreatureCounterToggle && settings().seacreatureHourUIToggle && playerData.GUI["Toggle"])

    //Bobber Count UI
    Manager.updateElement("BobberCount", settings().bobberUIToggle && playerData.GUI["Toggle"])

    //Rod Timer UI
    Manager.updateElement("RodTimer", settings().rodTimerToggle && playerData.GUI["Toggle"])

    //Plhlegblast UI
    Manager.updateElement("PlhlegblastTimer", settings().plhlegblastUIToggle && playerData.GUI["Toggle"])

    //Jawbus UI
    Manager.updateElement("JawbusTimer", settings().jawbusUIToggle && playerData.GUI["Toggle"])

    //Thunder UI
    Manager.updateElement("ThunderTimer", settings().thunderUIToggle && playerData.GUI["Toggle"])

    //Vanquisher UI
    Manager.updateElement("VanquisherTimer", settings().vanquisherUIToggle && playerData.GUI["Toggle"])

    //Vial UI
    Manager.updateElement("JawbusVialTimer", settings().vialUIToggle && playerData.GUI["Toggle"])

    //Phoenix
    Manager.updateElement("PhoenixTimer", settings().deathItemPhoenixStatusToggle && playerData.GUI["Toggle"])

    //Spirit Mask
    Manager.updateElement("SpiritMaskTimer", settings().deathItemSpiritMaskStatusToggle && playerData.GUI["Toggle"])

    //Pet Display
    Manager.updateElement("PetDisplay", settings().petDisplayToggle && (playerData.GUI["TogglePets"] ? playerData.GUI["Toggle"] : true))

    //Golden Fish Timer
    Manager.updateElement("GoldenFishTimer", settings().goldenTimerToggle && playerData.GUI["Toggle"])

    //BossBar
    Manager.updateElement("BossBar", settings().bossHealthBarToggle && playerData.GUI["Toggle"], undefined, undefined, settings().BossHealthBarLength)
}

settings().getConfig().onClose(() => {
    updateUI()
})
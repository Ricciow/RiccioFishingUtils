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

settings().getConfig().registerListener("totemToggle", () => {
    console.log("test")
    Manager.updateElement("TotemTimer", settings().totemToggle && settings().totemTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("totemTimerToggle", () => {
    Manager.updateElement("TotemTimer", settings().totemToggle && settings().totemTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("fluxToggle", () => {
    Manager.updateElement("PowerOrbTimer", settings().fluxToggle && settings().fluxTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("fluxTimerToggle", () => {
    Manager.updateElement("PowerOrbTimer", settings().fluxToggle && settings().fluxTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("flareToggle", () => {
    Manager.updateElement("FlareTimer", settings().flareToggle && settings().flareTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("flareTimerToggle", () => {
    Manager.updateElement("FlareTimer", settings().flareToggle && settings().flareTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("seaCreatureCounterToggle", () => {
    Manager.updateElement("SeaCreatureCount", settings().seaCreatureCounterToggle && settings().seaCreatureCounterUIToggle && playerData.GUI["Toggle"])
    Manager.updateElement("SeaCreatureHour", settings().seaCreatureCounterToggle && settings().seacreatureHourUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("seaCreatureCounterUIToggle", () => {
    Manager.updateElement("SeaCreatureCount", settings().seaCreatureCounterToggle && settings().seaCreatureCounterUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("seaCreatureHourUIToggle", () => {
    Manager.updateElement("SeaCreatureHour", settings().seaCreatureCounterToggle && settings().seacreatureHourUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("bobberUIToggle", () => {
    Manager.updateElement("BobberCount", settings().bobberUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("rodTimerToggle", () => {
    Manager.updateElement("RodTimer", settings().rodTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("phlegblastUIToggle", () => {
    Manager.updateElement("PlhlegblastTimer", settings().plhlegblastUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("jawbusUIToggle", () => {
    Manager.updateElement("JawbusTimer", settings().jawbusUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("thunderUIToggle", () => {
    Manager.updateElement("ThunderTimer", settings().thunderUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("vanquisherUIToggle", () => {
    Manager.updateElement("VanquisherTimer", settings().vanquisherUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("vialUIToggle", () => {
    Manager.updateElement("JawbusVialTimer", settings().vialUIToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("deathItemPhoenixStatusToggle", () => {
    Manager.updateElement("PhoenixTimer", settings().deathItemPhoenixStatusToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("deathItemSpiritMaskStatusToggle", () => {
    Manager.updateElement("SpiritMaskTimer", settings().deathItemSpiritMaskStatusToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("petDisplayToggle", () => {
    Manager.updateElement("PetDisplay", settings().petDisplayToggle && (playerData.GUI["TogglePets"] ? playerData.GUI["Toggle"] : true))
})

settings().getConfig().registerListener("goldenTimerToggle", () => {
    Manager.updateElement("GoldenFishTimer", settings().goldenTimerToggle && playerData.GUI["Toggle"])
})

settings().getConfig().registerListener("bossHealthBarToggle", () => {
    Manager.updateElement("BossBar", settings().bossHealthBarToggle && playerData.GUI["Toggle"], undefined, undefined, settings().BossHealthBarLength)
})

settings().getConfig().registerListener("bossHealthBarLength", (previousValue, newValue) => {
    Manager.updateElement("BossBar", settings().bossHealthBarToggle && playerData.GUI["Toggle"], undefined, undefined, settings().BossHealthBarLength)
})
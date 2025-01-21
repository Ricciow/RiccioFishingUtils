import { seaCreatureData } from "../../data/data";
import partyTracker from "../../features/chatCommands/partyTracker";
import settings from "../../settings/settings";
import { updateModule, checkIfUpdateText, getRFUVersion, updateGithubData } from "./updatechecker";

updateGithubData(settings().releaseBranch === 1)

const latestwarn = register('worldLoad', () => {
    setTimeout(() => {
        updateGithubData(settings().releaseBranch === 1)
        if(settings().autoUpdate) {
            seaCreatureData.save()
            partyTracker.save()
            updateModule()
        }
        else {
            checkIfUpdateText()
        }
        settings().getConfig().apply()
    }, 1000);
    latestwarn.unregister()
})

register("command", () => {
    updateGithubData(settings().releaseBranch === 1)
    checkIfUpdateText(true)
    settings().getConfig().apply()
}).setName("rfucheckupdate")

register("command", () => {
    seaCreatureData.save()
    partyTracker.save()
    updateModule()
}).setName("rfudownloadnewestversion")

register("command", () => {
    ChatLib.chat(`&5[&b&lRFU&5] &f&lYou're on version &e&lv${getRFUVersion()}`)
}).setName("rfuversion")
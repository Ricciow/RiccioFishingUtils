import settings from "../../settings/settings";
import { updateModule, checkIfUpdateText, getRFUVersion, updateGithubData } from "./updatechecker";

updateGithubData(settings().releaseBranch === 1)

const latestwarn = register('worldLoad', () => {
    setTimeout(() => {
        updateGithubData(settings().releaseBranch === 1)
        checkIfUpdateText()
    }, 1000);
    latestwarn.unregister()
})

register("command", () => {
    updateGithubData(settings().releaseBranch === 1)
    checkIfUpdateText(true)
}).setName("rfucheckupdate")

register("command", () => {
    updateModule()
}).setName("rfudownloadnewestversion")

register("command", () => {
    ChatLib.chat(`&5[&b&lRFU&5] &f&lYou're on version &e&lv${getRFUVersion()}`)
}).setName("rfuversion")

if(settings().autoUpdate) {
    updateModule()
}
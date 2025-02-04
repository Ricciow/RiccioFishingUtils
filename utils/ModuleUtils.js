export default class ModuleUtils {
    static get version() {
        return JSON.parse(FileLib.read("RiccioFishingUtils", "metadata.json")).version
    }
}
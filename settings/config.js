import settings from "./settings";

register("command", (val) => {
    if(val === 'move') {
        return ChatLib.command("rfumove", true)
    }
    settings().getConfig().openGui()
}).setName("rfu").setAliases("ricciofishingutils")
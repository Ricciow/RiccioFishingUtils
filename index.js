ChatLib.chat("&5[&b&lRFU&5] &6&lLoading!\n&f&lIf you dont see a loaded msg /ct reload ._.")
import settings from "./utils/settings";
import "./features/party.js";
import "./features/generalFishing.js";
import "./features/chFishing.js";
import "./features/other.js";
import "./features/pets.js";
import "./features/lavaFishing.js";
import "./features/fishermantrack.js";
import "./features/trophyFishing.js";
import "./features/playerStats.js";
import "./utils/mixenddata.js";
import "./utils/keybinds.js";
import "./gui/gui.js"

register("command", () => {
    settings.openGUI();
}).setName("rfu").setAliases("ricciofishingutils");

ChatLib.chat("&5[&b&lRFU&5] &2&lLoaded! \n&f&lUse /rfu to open settings\n&f&l/rfumove to move gui\n&f&l/rfudiscord for official server")
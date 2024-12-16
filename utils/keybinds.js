import { playerData } from "../data/data"
const toggleKeybind = new KeyBind("Toggle UI", Keyboard.KEY_NONE, "RiccioFishingUtils")

toggleKeybind.registerKeyDown(ToggleDown);
toggleKeybind.registerKeyRelease(ToggleUP);

const Msg = new TextComponent(`&5[&b&lRFU&5] &f&lGui turned &4&lOFF\n&a&l[Click to toggle the pet display]`).setClickAction('run_command').setClickValue(`/rfutogglepetonkeybind`).setHoverAction("show_text").setHoverValue("Enable/Disable also toggling pet display");
let down = false
function ToggleDown() {
    if(!down) {
        playerData.GUI["Toggle"] = !playerData.GUI["Toggle"]
        if(playerData.GUI["Toggle"]){
            ChatLib.chat(`&5[&b&lRFU&5] &f&lGui turned &a&lON`);
        }
        else {
            ChatLib.chat(Msg);
        }
    }
    down = true;
}

function ToggleUP() {
    down = false;
}

register("command", () => {
    playerData.GUI["TogglePets"] = !playerData.GUI["TogglePets"];
    if(playerData.GUI["TogglePets"]) {
        ChatLib.chat(`&5[&b&lRFU&5] &f&lPet gui toggle turned &a&lON`);
    }
    else {
        ChatLib.chat(`&5[&b&lRFU&5] &f&lPet gui toggle turned &4&lOFF`);
    }
}).setName('rfutogglepetonkeybind')
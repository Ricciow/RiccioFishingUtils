import { readableTime, removeRankTag , funniFaces} from "../utils/functions";
import settings from "../utils/settings";
import { playerData } from "../data/data";
import { colorsRegex } from "../data/constants";
import guiManager from "../gui/guiManager";

register('command', () => {
    text = '\n';
    settings.FunMessages.split('|').forEach(face => {
        key = face.split(',')[0];
        door = face.split(',')[1];
        text += `([${key}]): ${door}\n`;
    });
    ChatLib.chat(text);
}).setName('rfufaces');

let lastMessage = '';
const ChatChoices = /^\/(ac|pc|gc|cc|oc|r) /i;
const PrivMsg = /^\/(w) /i;
register('messagesent', (event) => {
    if (event.includes('/')) {
        if (ChatChoices.test(event)){
            lastMessage = event.replace(/^\/(ac|pc|gc|cc|oc|r) /i, '');
        }
        else if (PrivMsg.test(event)){
            if(removeRankTag(event).match(/^\/w\s+(\w+)\s+(.+)$/) != null) {
                lastMessage = removeRankTag(event).match(/^\/w\s+(\w+)\s+(.+)$/)[2];
            }
        }
        else {
            lastMessage = event;
        }
    }
    else {
        lastMessage = event;
    }
});

const partyCom = /(\/)?(pc|party)/i;
const officerCom = /(\/)?(oc|officer)/i;
const guildCom = /(\/)?(gc|guild)/i;
const coopCom = /(\/)?(cc|coop)/i;
const allCom = /(\/)?(ac|allchat|all)/i;
register("command", (chat) =>{
    if (partyCom.test(chat)){
        chattype = 'pc ';
    }
    else if (officerCom.test(chat)){
        chattype = 'oc ';
    }
    else if (guildCom.test(chat)){
        chattype = 'gc ';
    }
    else if (coopCom.test(chat)){
        chattype = 'cc ';
    }
    else if (allCom.test(chat)){
        chattype = 'ac ';
    }
    else{
        chattype = `w ${chat} `
    }
    if (lastMessage != '')
        ChatLib.command(chattype+lastMessage);
    else{
        ChatLib.chat("You dont have a last message!");
    }
}).setName("wc").setTabCompletions(['ac', 'pc', 'oc', 'gc', 'cc', 'playername']);

register("command", () => {
    ChatLib.chat("&b&lRfu Discord: https://discord.gg/JfrXm6TqXz");
}).setName("rfudiscord");

let phoenixUseTime = 0;
let spiritMaskUseTime = 0;
register("chat", () => {
    if(settings.phoenixTitleToggle) {
        Client.showTitle(`&4&lPhoenix pet Used!`, ` `, settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
        setTimeout(() => {
            Client.showTitle(`&a&lPhoenix pet back!`, ` `, settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
        }, 60000);
    }
    phoenixUseTime = Date.now()
}).setCriteria("Your Phoenix Pet saved you from certain death!");

register("chat", () => {
    if(settings.spiritTitleToggle){
        Client.showTitle(`&4&lSpirit Mask Used!`, ` `, settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
        setTimeout(() => {
            Client.showTitle(`&a&lSpirit Mask back!`, ` `, settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
        }, 30000)
    }
    spiritMaskUseTime = Date.now()
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!");

const patchnotes = `- Added /rfuaddvial count, which adds a vial to /vials\n- Added /rfusetvialcount count, which sets the count to a number\n- Made vial drops get copied to clipboard\n- Hid the vanilla fishing rod timer when the setting is on\n- Fixed sc counter timer being weird on worms with count worms anyways off\n- Added inventory full debrief\n- Added thunder bottle full title/message\n- Made pet display show pet levels when equipping them manually\n- Made pet display also now show rarity correctly\n- Removed pet display customization :(\n- Added inventory attributes/enchants display for lava fishing items\n- Added /rfuunrendercoords command\n- Made coords unrender automatically when leaving island\n- Added rendering coords if someone sends them on chat\n- Removed a test message on /stream\n- Added !allinv and !ai alias to !allinvite\n- Merged totem/power orb/flare expired sounds\n- Added jawbusinfo, thunderinfo and vialinfo chat command\n- Made chat commands blacklist case insensitive\n- Added a click to party person message in guild chat and when getting booped\n- Added an actual setting for the random dh messages, was too confusing before...\n- Added a timer to vanquisher/thunder invulnerability\n- Added settings to most UIs to toggle them off if they're not relevant.\n- Added more checks to the pet leveling up on the display so it displays accurately\n- Added an option to hide worms nametags in crystal hollows\n- Added checks so !warp doesn't warp when on a private island or on a low player count nether lobby (8 or less)\n- Added golden fish timer\n- Added a space in the Y of the /coords command so it works better with other mods\n- Added you've been here messages when joining a repeated lobby\n- Added a setting to hide creature messages/dh messages\n- Added drop messages for drops you don't usually see (also drop air for the funni)\n- Added an option to make the im muted message warp party.\n- Removed pet level up subtitle :(\n- Reformatted /rfubossstats and now shows last time caught\n-V0.1.1\n- Improved performance\n-Fixed a bug where worm health would not be displayed at all\n- Made Cast until more sensical`;

register("command", () => {
    ChatLib.chat(patchnotes);
}).setName("rfupatchnotes");

register("command", () => {
    ChatLib.say(`x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
}).setName("coords");

let Looking = false;
let attempt = 0;
let ServerText = '';
let Found = false;
let Area = ""
let Server = ""
let ServerJoin = {}
let SentMsg = false;

register("worldload", () => {
    Found = false;
    Looking = true;
    attempt = 0;
})

register("step", () => {
    if(settings.lobbyTracking) {
        if(Looking) {
            ServerText = TabList.getNames().filter(name => {
                if(name.replace(colorsRegex, "").includes("Area: ") || name.replace(colorsRegex, "").includes("Server: ")) return true;
                else return false;
            }).map(name => {
                return name.replace(colorsRegex, "");
            });
            if(ServerText != "") {
                Looking = false;
                Found = true;
                SentMsg = false;
            }
            if(attempt > 15) {
                Looking = false;
            }
            attempt++;
        }
        if(Found) {
            if(ServerText[0]) Area = ServerText[0].replace("Area: ", "");
            else Area = '';
            if(ServerText[1]) Server = ServerText[1].replace("Server: ", "").replace(" ", "");
            else Server = '';
            if(!SentMsg) {
                if(Object.keys(ServerJoin).includes(Server) && settings.lobbyTracking) {
                    ChatLib.chat(`&5[&b&lRFU&5]\n&7&lYou have been on this server!\n&e&l${Server} &7&lLast here: &e&l${readableTime(Date.now()-ServerJoin[Server])} &7&lago`);
                }
                SentMsg = true;
            }
            if(Server != "") ServerJoin[Server] = Date.now();
        }
    }

    if (settings.deathItemPhoenixStatusToggle) {
        //Phoenix Render
        //TODO: Modify this thing whenever i add a function for this on the library
        let phoenixData = guiManager.getElement("PhoenixTimer").data
        phoenixData.Times["(1)"] = (Date.now() - phoenixUseTime > 60000) ? ["&a&lActive"] : (phoenixUseTime + 60000)
        if(!settings.deathItemStatusUIToggle) {
            //Hide if not relevant OFF
            phoenixData.Hidden = false
            guiManager.updateElementData("PhoenixTimer", phoenixData)
        }
        else if (playerData.PETS['EquippedPet'].includes("Phoenix")) {
            //Hide if not relevant ON, if you have phoenix equiped
            phoenixData.Hidden = false
            guiManager.updateElementData("PhoenixTimer", phoenixData)
        }
        else {
            //Hide if not relevant ON, if you dont have phoenix equiped
            phoenixData.Hidden = true
            guiManager.updateElementData("PhoenixTimer", phoenixData)
        }
    }

    if (settings.deathItemSpiritMaskStatusToggle) {
        //Spirit Mask Render
        //TODO: Modify this thing whenever i add a function for this on the library
        let spiritMaskData = guiManager.getElement("SpiritMaskTimer").data
        spiritMaskData.Times["(1)"] = (Date.now() - spiritMaskUseTime > 30000) ? ["&a&lActive"] : (spiritMaskUseTime + 30000)
        if(!settings.deathItemStatusUIToggle) {
            //Hide if not relevant OFF
            spiritMaskData.Hidden = false
            guiManager.updateElementData("SpiritMaskTimer", spiritMaskData)
        }
        else if (Player.asPlayerMP()?.getItemInSlot(4)?.getName()?.includes("Spirit Mask")) {
            //Hide if not relevant ON, if you have phoenix equiped
            spiritMaskData.Hidden = false
            guiManager.updateElementData("SpiritMaskTimer", spiritMaskData)
        }
        else {
            //Hide if not relevant ON, if you dont have phoenix equiped
            spiritMaskData.Hidden = true
            guiManager.updateElementData("SpiritMaskTimer", spiritMaskData)
        }
    }
}).setFps(3)
import { readableTime, removeRankTag , funniFaces} from "../utils/functions";
import settings from "../settings/settings";
import { playerData } from "../data/data";
import { colorsRegex } from "../data/constants";
import guiManager from "../gui/guiManager";

register('command', () => {
    text = '\n';
    settings().FunMessages.split('|').forEach(face => {
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
    if(settings().phoenixTitleToggle) {
        Client.showTitle(`&4&lPhoenix pet Used!`, ` `, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
        setTimeout(() => {
            Client.showTitle(`&a&lPhoenix pet back!`, ` `, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
        }, 60000);
    }
    phoenixUseTime = Date.now()
}).setCriteria("Your Phoenix Pet saved you from certain death!");

register("chat", () => {
    if(settings().spiritTitleToggle){
        Client.showTitle(`&4&lSpirit Mask Used!`, ` `, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
        setTimeout(() => {
            Client.showTitle(`&a&lSpirit Mask back!`, ` `, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
        }, 30000)
    }
    spiritMaskUseTime = Date.now()
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!");

register("command", () => {
    settings().getConfig().openGui()
    settings().getConfig().redirect("§eChangelog")
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
    if(settings().lobbyTracking) {
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
                if(Object.keys(ServerJoin).includes(Server) && settings().lobbyTracking) {
                    ChatLib.chat(`&5[&b&lRFU&5]\n&7&lYou have been on this server!\n&e&l${Server} &7&lLast here: &e&l${readableTime(Date.now()-ServerJoin[Server])} &7&lago`);
                }
                SentMsg = true;
            }
            if(Server != "") ServerJoin[Server] = Date.now();
        }
    }

    if (settings().deathItemPhoenixStatusToggle) {
        //Phoenix Render
        let phoenixData = guiManager.getElementData("PhoenixTimer")
        phoenixData.Times["(1)"] = (Date.now() - phoenixUseTime > 60000) ? ["&a&lActive"] : (phoenixUseTime + 60000)
        if(!settings().deathItemStatusUIToggle) {
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

    if (settings().deathItemSpiritMaskStatusToggle) {
        //Spirit Mask Render
        let spiritMaskData = guiManager.getElementData("SpiritMaskTimer")
        spiritMaskData.Times["(1)"] = (Date.now() - spiritMaskUseTime > 30000) ? ["&a&lActive"] : (spiritMaskUseTime + 30000)
        if(!settings().deathItemStatusUIToggle) {
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
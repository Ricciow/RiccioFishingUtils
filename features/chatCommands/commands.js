import commandManager from "./commandManager";
import settings from "../../settings/settings";
import partyTracker from "./partyTracker";
import { checkIfUser, getAverageFromList, getVialAverage, readableTime, registerWhen, removeFromArray, removeRankTag } from "../../utils/functions";
import { playerName } from "../../data/constants";
import skyblock from "../../utils/skyblock";
import { seaCreatureData } from "../../data/data";
import ChatUtils from "../../utils/ChatUtils";
import ModuleUtils from "../../utils/ModuleUtils";

// function test(name, params) {
//     ChatLib.chat(`I'm a command! ${params}`)
// }

// exampleCommand = {
//     triggers: ["test1"],             //All triggers for the command (must be lowercased)
//     parameters: 1,                   //Number of parameters for command -1 = any amount
//     leaderOnly: false,               //Self explanatory
//     memberOnly: false,               //Self explanatory
//     selfTrigger: false,              //Trigger the command on self, will delay the command a bit
//     description: "Description",          
//     checkFunc: () => {},              //Function ran to check if the command can be triggered
//     func: test,                      //Function ran when command triggered will send (manager, name, parameters) 
// }                                    //(only sends parameters if parameters has atleast 1, also only sends the ammount defined above) 

// commandManager.addCommand(exampleCommand);

//? Help
export function help(manager, name, parameter = undefined) {
    if(!parameter && partyTracker.isLeader || checkIfUser(parameter)) {
        //General Help
        let commands = manager.commands.filter(({ leaderOnly, memberOnly, checkFunc }) => (leaderOnly && partyTracker.isLeader || !leaderOnly && !memberOnly || memberOnly && !partyTracker.isLeader) && checkFunc()).map(({ triggers }) => triggers[0]);
        let message = `Enabled Commands: ${commands.join(", ")}`;
        ChatUtils.sendPartyMessage(message)
    }
    else if(!partyTracker.members.includes(parameter) && parameter){
        let command = manager.commands.find(({ triggers }) => triggers?.some(trigger => trigger === parameter));
        if(command) {
            ChatUtils.sendPartyMessage(`(${parameter}) ${command.description} Triggers: ${command.triggers.join(", ")}`);
        }
        else {
            ChatUtils.sendPartyMessage(`(${parameter}) Invalid command!`);
        }
    }
}

commandManager.addCommand({
    triggers: ["help", "h"],             
    parameters: 1,                   
    leaderOnly: false,               
    memberOnly: false,               
    selfTrigger: true,              
    description: "Know what a command does!",          
    checkFunc: () => settings().partyHelp,            
    func: help                      
})

//? Invite
commandManager.addCommand({
    triggers: ["invite", "inv", "party", "p"],      
    parameters: 1,            
    leaderOnly: true,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Invite someone to the party! Usage: ${settings().partyPrefix}invite username`,          
    checkFunc: () => settings().partyInvite,            

    func(manager, name, parameter) {
        if(parameter) {
            if(!partyTracker.PARTY["members"].map((player) => player.toLowerCase()).includes(parameter.toLowerCase())) {
                ChatUtils.sendCommand(`p invite ${parameter}`);
            }   
            else {
                ChatUtils.sendPartyMessage(`${parameter} is already in the party!`);
            }
        }
        else {
            ChatUtils.sendPartyMessage(`Usage: invite/inv/party/p <username>`);
        }
    }                
})

//? ToggleWarp
commandManager.addCommand({
    triggers: ["togglewarp", "tw"],      
    parameters: 1,            
    leaderOnly: true,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Invite someone to the party! Usage: ${settings().partyPrefix}invite username`,          
    checkFunc: () => settings().partyToggleWarp,            

    func(manager, name, param) {
        name = name.toLowerCase();
        if(checkIfUser(name)) {
            if(param) {
                if(partyTracker.members.map((player) => player.toLowerCase()).includes(param.toLowerCase())) {
                    if(partyTracker.warpExcluded.includes(param)) {
                        removeFromArray(partyTracker.warpExcluded, param)
                        ChatUtils.sendPartyMessage(`${param} can now be warped.`)
                    }
                    else {
                        partyTracker.warpExcluded.push(param)
                        ChatUtils.sendPartyMessage(`${param} can not be warped until you leave or the party is disbanded.`)
                    }
                }
                else {
                    ChatUtils.sendPartyMessage(`${param} is not in the party!`)
                }   
            }
            else {
                ChatUtils.sendPartyMessage('Usage: !togglewarp username')
            }
        }
        else {
            if(param) {
                ChatUtils.sendPartyMessage("Only party leader can enable togglewarp for others.")
            }
            else {
                if(partyTracker.warpExcluded.includes(name)) {
                    removeFromArray(partyTracker.warpExcluded, name)
                    ChatUtils.sendPartyMessage("You can now be warped.")
                }
                else {
                    partyTracker.warpExcluded.push(name)
                    ChatUtils.sendPartyMessage("You can not be warped until you leave or the party is disbanded.")
                }
            }
        }
    }
})

//? Warp

let ignoreNext = false;
let needJoin = [];
let lastSelfTrigger = false;
const checkPlayerCountIslands = ["Crimson Isle"]

function warpParty() {
    ignoreNext = true;
    ChatUtils.sendCommand('p warp')
}


export function warp(manager, name, ignoreConditions = false) {
    if(checkIfUser(name) && !lastSelfTrigger && !ignoreConditions) {
        lastSelfTrigger = true;
        ChatLib.chat(new Message("&c&lAre you sure? (You're leader) ", new TextComponent("&a&l[Warp]").setClickAction("run_command").setClickValue("/rfuconfirmwarp").setHoverAction('show_text').setHoverValue("Click to warp.")));
        setTimeout(() => {
            lastSelfTrigger = false;
        }, 10000);
        return
    }
    lastSelfTrigger = false;
    //Check if they're not on private island and if the playerCount needs to be below 8
    if(skyblock.map != 'Private Island' && skyblock.playerCount > (checkPlayerCountIslands.includes(skyblock.map) ? 8 : 0) || ignoreConditions) {
        if(partyTracker.warpExcluded.length == 0) {
            warpParty()
        }
        else {
            partyTracker.warpExcluded.forEach(person => {
                needJoin.push(person)
                ChatUtils.sendCommand(`p kick ${person}`)
            });
            partyTracker.warpExcluded = []
            warpParty()
            needJoin.forEach(person => {
                ChatUtils.sendCommand(`p ${person}`)
            });
        }
    }
    else {
        if(skyblock.map != 'Private Island') {
            ChatUtils.sendPartyMessage("Lobby has a player count below 8! (Not Warping)")
        }
        else {
            ChatUtils.sendPartyMessage("I'm currently on a private island! (Not Warping)")
        }
    }
}

register("chat", (user) => {
    user = removeRankTag(user).toLowerCase();
    if(needJoin.includes(user)) {
        removeFromArray(needJoin, user)
    }
}).setCriteria("The party invite to ${user} has expired.");

register("chat", (user) => {
    user = removeRankTag(user).toLowerCase();
    if(needJoin.includes(user)) {
        removeFromArray(needJoin, user)
        partyTracker.warpExcluded.push(user)
    }
}).setCriteria("${user} joined the party.");

register('command', () => {
    warp(undefined, playerName, true)
}).setName("rfuconfirmwarp")

registerWhen('messageSent', (message, event) => {
    if(ignoreNext) {
        ignoreNext = false
        return
    }

    if((message.startsWith("/p warp") || message.startsWith("/party warp"))) {
        cancel(event)
        warp(undefined, playerName, true);
        return
    }
},
() => settings().partyCommands && settings().partyWarp)

commandManager.addCommand({
    triggers: ["warp", "w"],      
    parameters: 0,            
    leaderOnly: true,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Warps the party!`,          
    checkFunc: () => settings().partyWarp,
    func: warp  
})

//? Transfer Command
commandManager.addCommand({
    triggers: ["transfer", "pt", "t"],     
    parameters: 1,            
    leaderOnly: true,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Transfers the party! Usage: ${settings().partyPrefix}transfer username`,          
    checkFunc: () => settings().partyTransfer,
    func(manager, name, parameter) {
        if(parameter) {
            if(parameter != playerName) {
                if(partyTracker.members.map((player) => player.toLowerCase()).includes(parameter.toLowerCase())) {
                    ChatUtils.sendCommand(`p transfer ${parameter}`);
                }   
                else {
                    ChatUtils.sendPartyMessage(`${parameter} is not in the party!`);
                }
            }
        }
        else if(name != playerName) {
            ChatUtils.sendCommand(`p transfer ${name}`)
        }
    }
})

//? AllInvite
commandManager.addCommand({
    triggers: ["allinvite", "allinv", "ai"],   
    parameters: 0,            
    leaderOnly: true,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Toggles AllInvite.`,          
    checkFunc: () => settings().partyAllinvite,
    func(manager, name, parameter) {
        ChatUtils.sendCommand('p settings allinvite')
    }
})

//? Coords
commandManager.addCommand({
    triggers: ["coords", "c"],   
    parameters: 1,            
    leaderOnly: false,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Sends my current coords!`,          
    checkFunc: () => settings().partyCoords,
    func(manager, name, parameter) {
        if(parameter) if(!playerName.toLowerCase().includes(parameter.toLowerCase())) return
        ChatUtils.sendPartyMessage(`x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`)
    }
})

//? Pick
commandManager.addCommand({
    triggers: ["pick", "choose"],   
    parameters: -1,            
    leaderOnly: false,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Pick between one of the options!`,          
    checkFunc: () => settings().partyPick,
    func(manager, name, ...options) {
        ChatUtils.sendPartyMessage(`${options[Math.floor(Math.random() * options.length)] ?? "You must tell me what to choose from!"}`);
    }
})

//? Merge Party
function mergeParty(username) {
    ChatUtils.sendCommand(`w ${username} !invite ${partyTracker.members.join(" ")}`)
}

registerWhen("command", (username) => {
    if(!partyTracker.isLeader && !partyTracker.inParty) return
    ChatUtils.sendPartyMessage("Party merge approved!")
    mergeParty(username)
},
() => settings().partyMerge).setName("rfupartyapprovemerge")

commandManager.addCommand({
    triggers: ["mergeparty", "merge", "m"],   
    parameters: 1,            
    leaderOnly: true,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Sends a merge request on that person's dms. Usage: ${settings().partyPrefix}merge username`,          
    checkFunc: () => settings().partyMerge,
    func(manager, name, param) {
        if(!param) {
            ChatUtils.sendPartyMessage("You need to inform me who to merge to!")
            return
        }
        if(partyTracker.members.map((member) => member.toLowerCase()).includes(param.toLowerCase())) {
            ChatUtils.sendPartyMessage("This person is in your party already!")
            return
        }
        if(!checkIfUser(name)) {
            ChatUtils.sendPartyMessage("Waiting for party leader approval.")
            setTimeout(() => {
                ChatLib.chat(new TextComponent(`&a&l[Click to confirm Merge]`)
                .setClick('run_command', `/rfupartyapprovemerge ${param}`)
                .setHover("show_text", `/rfupartyapprovemerge ${param}`));
            }, 100);
        }
        else {
            mergeParty(param)
        }
        ChatUtils.sendPartyMessage()
    }
})


//? PlhlegblastInfo
commandManager.addCommand({
    triggers: ["plhleginfo", "plhlegblastinfo", "pi"],   
    parameters: 1,            
    leaderOnly: false,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Tells you the amount of catches since last, the last time, and the average for Plhegblast.`,          
    checkFunc: () => settings().infoPlhleg,
    func(manager, name, param) {
        if(param) if(!playerName.toLowerCase().includes(param.toLowerCase())) return
        ChatUtils.sendPartyMessage(`Catches since last Plhleg: ${seaCreatureData.CRIMSON.PlhlegblastCount-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON.PlhlegblastTime)}, avg: ${getAverageFromList(seaCreatureData.CRIMSON.PlhlegblastAllCount)}`);
    }
})

//? JawbusInfo
commandManager.addCommand({
    triggers: ["jawbusinfo", "jawinfo", "ji"],   
    parameters: 1,            
    leaderOnly: false,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Tells you the amount of catches since last, the last time, and the average for Jawbus.`,          
    checkFunc: () => settings().infoJawbus,
    func(manager, name, param) {
        if(param) if(!playerName.toLowerCase().includes(param.toLowerCase())) return
        ChatUtils.sendPartyMessage(`Catches since last Jawbus: ${seaCreatureData.CRIMSON.JawbusCount-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON.JawbusTime)}, avg: ${getAverageFromList(seaCreatureData.CRIMSON.JawbusAllCount)}`);
    }
})

//? ThunderInfo
commandManager.addCommand({
    triggers: ["thunderinfo", "thuninfo", "ti"],   
    parameters: 1,            
    leaderOnly: false,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Tells you the amount of catches since last, the last time, and the average for Thunder.`,          
    checkFunc: () => settings().infoThunder,
    func(manager, name, param) {
        if(param) if(!playerName.toLowerCase().includes(param.toLowerCase())) return
        ChatUtils.sendPartyMessage(`Catches since last Thunder: ${seaCreatureData.CRIMSON.ThunderCount-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON.ThunderTime)}, avg: ${getAverageFromList(seaCreatureData.CRIMSON.ThunderAllCount)}`);
    }
})

//? VialInfo
commandManager.addCommand({
    triggers: ["vialinfo", "vi"],   
    parameters: 1,            
    leaderOnly: false,        
    memberOnly: false,        
    selfTrigger: true,            
    description: `Tells you the amount of own jawbusses since last, the last time, and the average for Vials.`,          
    checkFunc: () => settings().infoVial,
    func(manager, name, param) {
        if(param) if(!playerName.toLowerCase().includes(param.toLowerCase())) return
        ChatUtils.sendPartyMessage(`Own jawbusses since last Vial: ${seaCreatureData.DROPS.RadioactiveVial}, Last: ${readableTime(Date.now() - seaCreatureData.DROPS.RadioactiveVialTime)}, avg: ${getVialAverage()}`);
    }
})

//? rfuversion
commandManager.addCommand({
    triggers: ["rfuversion", "rfuver", "version", "rv"],
    parameters: 1,
    leaderOnly: false,
    memberOnly: false,
    selfTrigger: true,
    description: "Sends my rfu version",
    checkFunc: () => true,
    func(manager, name, param) {
        if(param) if(!playerName.toLowerCase().includes(param.toLowerCase())) return
        ChatUtils.sendPartyMessage(`RFU version: ${ModuleUtils.version}`)
    }
})
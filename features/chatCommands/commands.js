import commandManager from "./commandManager";
import settings from "../../settings/settings";
import partyTracker from "./partyTracker";
import { checkIfUser, getAverageFromList, getVialAverage, readableTime, removeFromArray, removeRankTag, splitMsg } from "../../utils/functions";
import { playerName } from "../../data/constants";
import skyblock from "../../utils/skyblock";
import { seaCreatureData } from "../../data/data";

// function test(name, params) {
//     ChatLib.chat(`I'm a command! ${params}`)
// }

// exampleCommand = {
//     triggers: ["test1"],             //All triggers for the command (must be lowercased)
//     parameters: 1,                   //Number of parameters for command
//     leaderOnly: false,               //Self explanatory
//     memberOnly: false,               //Self explanatory
//     selfTrigger: false,              //Trigger the command on self, will delay the command a bit
//     description: "Description",          
//     checkFunc: () => {},              //Function ran to check if the command can be triggered
//     func: test,                      //Function ran when command triggered will send (manager, name, parameters) 
// }                                    //(only sends parameters if parameters has atleast 1, also only sends the ammount defined above) 

// commandManager.addCommand(exampleCommand);

register("command", () => {
    console.log(JSON.stringify(partyTracker.PARTY))
}).setName("rfutestcommandslols")

//? Help

export function help(manager, name, parameter = undefined) {
    if(!parameter) {
        //General Help
        let commands = manager.commands.filter(({ leaderOnly, memberOnly, checkFunc }) => (leaderOnly && partyTracker.PARTY.isLeader || !leaderOnly && !memberOnly || memberOnly && !partyTracker.PARTY.isLeader) && checkFunc()).map(({ triggers }) => triggers[0]);
        let message = `Enabled Commands: ${commands.join(", ")}`;
        let splitted = splitMsg(message, 97)
        let timeout = 0
        splitted.forEach((message) => {
            setTimeout(() => {
                ChatLib.command(`pc ${message}`);
            }, timeout);
            timeout += 250
        })
    }
    else {
        let command = manager.commands.find(({ triggers }) => triggers?.some(trigger => trigger === parameter));
        if(command && command?.checkFunc()) {
            ChatLib.command(`pc (${parameter}) ${command.description} Triggers: ${command.triggers.join(", ")}`);
        }
        else {
            ChatLib.command(`pc (${parameter}) Invalid command!`);
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
                ChatLib.command(`p invite ${parameter}`);
            }   
            else {
                ChatLib.command(`pc ${parameter} is already in the party!`);
            }
        }
        else {
            ChatLib.command(`pc Usage: invite/inv/party/p <username>`);
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
                if(partyTracker.PARTY["members"].map((player) => player.toLowerCase()).includes(param.toLowerCase())) {
                    if(partyTracker.PARTY.warpExcluded.includes(param)) {
                        removeFromArray(partyTracker.PARTY.warpExcluded, param)
                        ChatLib.command(`pc ${param} can now be warped.`)
                    }
                    else {
                        partyTracker.PARTY.warpExcluded.push(param)
                        ChatLib.command(`pc ${param} can not be warped until you leave or the party is disbanded.`)
                    }
                }
                else {
                    ChatLib.command(`pc ${param} is not in the party!`)
                }   
            }
            else {
                ChatLib.command('pc Usage: !togglewarp username')
            }
        }
        else {
            if(param) {
                ChatLib.command("pc Only party leader can enable togglewarp for others.")
            }
            else {
                if(partyTracker.PARTY.warpExcluded.includes(name)) {
                    removeFromArray(partyTracker.PARTY.warpExcluded, name)
                    ChatLib.command("pc You can now be warped.")
                }
                else {
                    partyTracker.PARTY.warpExcluded.push(name)
                    ChatLib.command("pc You can not be warped until you leave or the party is disbanded.")
                }
            }
        }
    }
})

//? Warp

let ignoreNext = false;
let needJoin = [];
let lastSelfTrigger = false;

function warpParty() {
    ignoreNext = true;
    ChatLib.command('p warp')
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
    if(skyblock.map != 'Private Island' && skyblock.playerCount > 8|| ignoreConditions) {
        if(partyTracker.PARTY.warpExcluded.length == 0) {
            warpParty()
        }
        else {
            timeout = 0
            partyTracker.PARTY.warpExcluded.forEach(person => {
                needJoin.push(person)
                setTimeout(() => {
                    ChatLib.command(`p kick ${person}`)
                }, timeout);
                timeout += 500;
            });
            partyTracker.PARTY.warpExcluded = []
            setTimeout(() => {
                warpParty()
            }, timeout);
            timeout += 500
            needJoin.forEach(person => {
                setTimeout(() => {
                    ChatLib.command(`p ${person}`)
                }, timeout);
                timeout += 500;
            });
        }
    }
    else {
        if(skyblock.map != 'Private Island') {
            ChatLib.command("pc Lobby has a player count below 8! (Not Warping)")
        }
        else {
            ChatLib.command("pc I'm currently on a private island! (Not Warping)")
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
        partyTracker.PARTY.warpExcluded.push(user)
    }
}).setCriteria("${user} joined the party.");

register('command', () => {
    warp(undefined, playerName, true)
}).setName("rfuconfirmwarp")

register('messageSent', (message, event) => {
    if((message.startsWith("/p warp") || message.startsWith("/party warp")) && !ignoreNext) {
        cancel(event)
        warp(undefined, playerName, true);
        return
    }
    ignoreNext = false;
})

commandManager.addCommand({
    triggers: ["warp", "w"],      
    parameters: 0,            
    leaderOnly: false,        
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
                if(partyTracker.PARTY.members.map((player) => player.toLowerCase()).includes(parameter.toLowerCase())) {
                    ChatLib.command(`p transfer ${parameter}`);
                }   
                else {
                    ChatLib.command(`pc ${parameter} is not in the party!`);
                }
            }
        }
        else {
            if(name != playerName) ChatLib.command(`p transfer ${name}`)
            else if(partyTracker.PARTY.isLeader){
                ChatLib.command(`pc Usage: ${settings().partyPrefix}transfer username`)
            }
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
        ChatLib.command('p settings allinvite')
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
        ChatLib.command(`pc x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`)
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
        ChatLib.command(`pc ${options[Math.floor(Math.random() * options.length)] ?? "You must tell me what to choose from!"}`);
    }
})

//?PlhlegblastInfo
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
        ChatLib.command(`pc Catches since last Plhleg: ${seaCreatureData.CRIMSON.PlhlegblastCount-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON.PlhlegblastTime)}, avg: ${getAverageFromList(seaCreatureData.CRIMSON.PlhlegblastAllCount)}`);
    }
})

//?JawbusInfo
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
        ChatLib.command(`pc Catches since last Jawbus: ${seaCreatureData.CRIMSON.JawbusCount-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON.JawbusTime)}, avg: ${getAverageFromList(seaCreatureData.CRIMSON.JawbusAllCount)}`);
    }
})

//?ThunderInfo
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
        ChatLib.command(`pc Catches since last Thunder: ${seaCreatureData.CRIMSON.ThunderCount-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON.ThunderTime)}, avg: ${getAverageFromList(seaCreatureData.CRIMSON.ThunderAllCount)}`);
    }
})

//?VialInfo
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
        ChatLib.command(`pc Own jawbusses since last Vial: ${seaCreatureData.DROPS.RadioactiveVial}, Last: ${readableTime(Date.now() - seaCreatureData.DROPS.RadioactiveVialTime)}, avg: ${getVialAverage()}`);
    }
})
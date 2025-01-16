import settings from "../settings/settings";
import { playerData , seaCreatureData} from '../data/data';
import { checkIfUser, removeRankTag, checkBlacklist , getAverageFromList, readableTime, getVialAverage} from '../utils/functions';
import { colorsRegex } from '../data/constants';

if(!playerData.GUI["Toggle"]) {
    playerData.GUI["Toggle"] = true;
}

let lastCommand = 0;
let warpExcluded = []
let needJoin = []
//Party Commands V2
register("chat", (user, message) =>{
    if(settings().partyCommands && !checkBlacklist(user)){
        if(lastCommand + settings().partyCooldown*1000 < Date.now()){
            if (playerData.PARTY['isLeader']) {
                if (settings().partyHelp && message == `${settings().partyPrefix}help`){ // Help Command Party Leader
                    helpmsg = `pc commands: ${settings().partyPrefix}help`;
                    if (settings().partyWarp){
                        helpmsg += ` | ${settings().partyPrefix}warp`;
                    }
                    if (settings().partyToggleWarp) {
                        helpmsg += ` | ${settings().partyPrefix}togglewarp/twarp`;
                    }
                    if (settings().partyAllinvite){
                        helpmsg += ` | ${settings().partyPrefix}allinvite`;
                    }
                    if (settings().partyInvite){
                        helpmsg += ` | ${settings().partyPrefix}invite/p [username]`;
                    }
                    if (settings().partyTransfer) {
                        helpmsg += ` | ${settings().partyPrefix}transfer/pt`;
                    }
                    if (settings().partyCoords) {
                        helpmsg += ` | ${settings().partyPrefix}coords`;
                    }
                    if (settings().infoJawbus) {
                        helpmsg += ` | ${settings().partyPrefix}ji`;
                    }
                    if (settings().infoThunder) {
                        helpmsg += ` | ${settings().partyPrefix}ti`;
                    }
                    if (settings().infoVial) {
                        helpmsg += ` | ${settings().partyPrefix}vi`;
                    }
                    ChatLib.command(helpmsg);
                    lastCommand = Date.now();
                }
                if (settings().partyTransfer && message.startsWith(`${settings().partyPrefix}pt `)){
                    transferto = message.split(`${settings().partyPrefix}pt `)
                    if (transferto[1] != undefined && !checkIfUser(transferto[1])){
                        transferto = (transferto[1]+" ").split(" ")[0];
                        ChatLib.command(`p transfer ${transferto}`);
                        lastCommand = Date.now();
                    }
                }
                if (settings().partyTransfer && message.startsWith(`${settings().partyPrefix}transfer `)){
                    transferto = message.split(`${settings().partyPrefix}transfer `)
                    if (transferto[1] != undefined && !checkIfUser(transferto[1])){
                        transferto = (transferto[1]+" ").split(" ")[0];
                        ChatLib.command(`p transfer ${transferto}`);
                        lastCommand = Date.now();
                    }               
                }
                if (settings().partyTransfer && (message.endsWith(`${settings().partyPrefix}transfer`)||message.endsWith(`${settings().partyPrefix}pt`))){
                    ChatLib.command(`p transfer ${removeRankTag(user)}`);
                    lastCommand = Date.now();
                }
                if (settings().partyInvite && message.startsWith(`${settings().partyPrefix}invite `)){
                    inviteto = message.split(`${settings().partyPrefix}invite `)
                    if (inviteto[1] != undefined && !checkIfUser(inviteto[1])){
                        inviteto = (inviteto[1]+" ").split(" ")[0];
                        ChatLib.command(`p ${inviteto}`);
                        lastCommand = Date.now();
                    }
                }
                if (settings().partyInvite && message.startsWith(`${settings().partyPrefix}p `)){
                    inviteto = message.split(`${settings().partyPrefix}p `)
                    if (inviteto[1] != undefined && !checkIfUser(inviteto[1])){
                        inviteto = (inviteto[1]+" ").split(" ")[0];
                        ChatLib.command(`p ${inviteto}`);
                        lastCommand = Date.now();
                    }
                }
                if (settings().partyWarp && (message == `${settings().partyPrefix}warp` || message == `${settings().partyPrefix}w`)){
                    PlayerCountText = TabList.getNames().filter(name => {
                        if(name.replace(colorsRegex, "").includes("Players (") || name.replace(colorsRegex, "").includes("Guests (")) return true;
                        else return false;
                    })[0].replace(colorsRegex, "");
                    Playercount = parseInt((/\d+\)/).exec(PlayerCountText));
                    if(Player.asPlayerMP() != null){
                        if(!PlayerCountText.includes("Guests") && (Playercount > 8 || Player.asPlayerMP().getDimension() != -1)) {
                            if (warpExcluded.length == 0){
                                ChatLib.command("p warp");
                            }
                            else {
                                let needKI = true;
                                delay = 1;
                                warpExcluded.forEach(player => {
                                    needKI = true;
                                    needJoin.forEach(needed => {
                                        if(needed == player){
                                            needKI = false;
                                        }
                                    })
                                    if (needKI) {
                                        setTimeout(() => {
                                            ChatLib.command(`p kick ${player}`);
                                            needJoin.push(player);
                                        }, delay)
                                        delay += 500;
                                    }
                                });
                                setTimeout(() => {
                                    if(playerData.PARTY['inParty']){
                                        ChatLib.command("p warp");
                                    }
                                }, delay);
                                delay += 500;
                                warpExcluded.forEach(player => {
                                    needKI = true;
                                    needJoin.forEach(needed => {
                                        if(needed == player){
                                            needKI = false;
                                        }
                                    })
                                    if (needKI) {
                                        setTimeout(() => {
                                            ChatLib.command(`p ${player}`);
                                        }, delay)
                                        delay += 500;
                                    }
                                });
                            }
                            lastCommand = Date.now();
                        }
                        else {
                            if(PlayerCountText.includes("Guests")) {
                                ChatLib.command("pc Im currently on a private island! (not warping)");
                            }
                            else if (Playercount <= 8) {
                                ChatLib.command("pc Lobby has a playercount below 8! (not warping probably private)");
                            }
                            lastCommand = Date.now();
                        }
                    }
                }
                if (settings().partyAllinvite && (message == `${settings().partyPrefix}allinvite` || message == `${settings().partyPrefix}allinv` || message == `${settings().partyPrefix}ai`)){
                    ChatLib.command("p settings allinvite");
                    lastCommand = Date.now();
                }
                if (settings().partyToggleWarp && (message == `${settings().partyPrefix}togglewarp`|| message == `${settings().partyPrefix}twarp` || message == `${settings().partyPrefix}tw`)){
                    let i = 0;
                    let found = false;
                    warpExcluded.forEach(player => {
                        if(removeRankTag(user).toLowerCase() == player.toLowerCase()) {
                            warpExcluded.splice(i,1);
                            ChatLib.command("pc you can now be warped.");
                            found = true;
                        }
                        i++;
                    });
                    if (!found){
                        warpExcluded.push(removeRankTag(user));
                        ChatLib.command("pc you can not be warped until you leave the party or it is disbanded.");
                    }
                    lastCommand = Date.now();
                }
            } // End of Leader Required Commands
            else {
                if (settings().partyHelp && message == `${settings().partyPrefix}help`){
                    helpmsg = `pc commands: ${settings().partyPrefix}help`;
                    if (settings().partyCoords){
                        helpmsg += ` | ${settings().partyPrefix}coords`;
                    }
                    if (settings().infoJawbus) {
                        helpmsg += ` | ${settings().partyPrefix}jawbusinfo`;
                    }
                    if (settings().infoThunder) {
                        helpmsg += ` | ${settings().partyPrefix}thunderinfo`;
                    }
                    if (settings().infoVial) {
                        helpmsg += ` | ${settings().partyPrefix}vialinfo`;
                    }
                    ChatLib.command(helpmsg);
                    lastCommand = Date.now();
                }
            } // End of Not Leader Required Commands
            if (settings().partyCoords && message == `${settings().partyPrefix}coords`){
                ChatLib.command(`pc x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                lastCommand = Date.now();
            }
            if (settings().infoJawbus && (message == `${settings().partyPrefix}jawbusinfo` || message == `${settings().partyPrefix}ji`)){
                ChatLib.command(`pc Current count: ${seaCreatureData.CRIMSON["JawbusCount"]-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON["JawbusTime"])}, avg: ${getAverageFromList(seaCreatureData.CRIMSON["JawbusAllCount"])}`);
                lastCommand = Date.now();
            }
            if (settings().infoThunder && (message == `${settings().partyPrefix}thunderinfo` || message == `${settings().partyPrefix}ti`)){
                ChatLib.command(`pc Current count: ${seaCreatureData.CRIMSON["ThunderCount"]-1}, Last: ${readableTime(Date.now() - seaCreatureData.CRIMSON["ThunderTime"])}, avg: ${getAverageFromList(seaCreatureData.CRIMSON["ThunderAllCount"])}`);
                lastCommand = Date.now();
            }
            if (settings().infoVial && (message == `${settings().partyPrefix}vialinfo` || message == `${settings().partyPrefix}vi`)){
                ChatLib.command(`pc Current count: ${seaCreatureData.DROPS["RadioactiveVial"]}, Last: ${readableTime(Date.now() - seaCreatureData.DROPS["RadioactiveVialTime"])}, avg: ${getVialAverage()}`);
                lastCommand = Date.now();
            }
        }
    }
}).setCriteria("Party > ${user}: ${message}");

//Party detection
//Starting Party

register("chat", () => {
    playerData.PARTY['inParty'] = true;
    playerData.PARTY['isLeader'] = false;
}).setCriteria("You have joined ${*} party!");
register("chat", (user) => {
    if (!playerData.PARTY['inParty']){
        playerData.PARTY['inParty'] = true;
        if(checkIfUser(removeRankTag(user))){
            playerData.PARTY['isLeader'] = true;
        }
    }
}).setCriteria("${user} invited ${*} to the party! They have 60 seconds to accept.");

register("chat", (user) => { // Send Help Message if a new player joins party
    if(!checkIfUser(removeRankTag(user))){
        if (settings().partyJoinHelp && settings().partyCommands){
            if(playerData.PARTY['isLeader']){
                helpmsg = `pc Welcome ${removeRankTag(user)}, these are the enabled commands: ${settings().partyPrefix}help`;
                if (settings().partyWarp){
                    helpmsg += ` | ${settings().partyPrefix}warp`;
                }
                if (settings().partyToggleWarp) {
                    helpmsg += ` | ${settings().partyPrefix}togglewarp/twarp`;
                }
                if (settings().partyAllinvite){
                    helpmsg += ` | ${settings().partyPrefix}allinvite`;
                }
                if (settings().partyInvite){
                    helpmsg += ` | ${settings().partyPrefix}invite/p [username]`;
                }
                if (settings().partyTransfer) {
                    helpmsg += ` | ${settings().partyPrefix}transfer/pt`;
                }
                if (settings().partyCoords) {
                    helpmsg += ` | ${settings().partyPrefix}coords`;
                }
                if (settings().infoJawbus) {
                    helpmsg += ` | ${settings().partyPrefix}ji`;
                }
                if (settings().infoThunder) {
                    helpmsg += ` | ${settings().partyPrefix}ti`;
                }
                if (settings().infoVial) {
                    helpmsg += ` | ${settings().partyPrefix}vi`;
                }
                ChatLib.command(helpmsg);
                lastCommand = Date.now();
            }
            else if (!settings().partyJoinHelpLeader){
                helpmsg = `pc Welcome ${removeRankTag(user)}, these are the enabled commands: ${settings().partyPrefix}help`;
                if (settings().partyCoords){
                    helpmsg += ` | ${settings().partyPrefix}coords`;
                }
                if (settings().infoJawbus) {
                    helpmsg += ` | ${settings().partyPrefix}jawbusinfo`;
                }
                if (settings().infoThunder) {
                    helpmsg += ` | ${settings().partyPrefix}thunderinfo`;
                }
                if (settings().infoVial) {
                    helpmsg += ` | ${settings().partyPrefix}vialinfo`;
                }
                ChatLib.command(helpmsg);
                lastCommand = Date.now();
            }
        }
    }
}).setCriteria("${user} joined the party.");

register("chat", () => {
    playerData.PARTY['inParty'] = true;
}).setCriteria("Party > ${*}: ${*}");

register("chat", () => {
    playerData.PARTY['inParty'] = true;
    playerData.PARTY['isLeader'] = false;
}).setCriteria("You are not this party's leader!");
// Ending party

register("chat", () => {
    playerData.PARTY['inParty'] = false;
    playerData.PARTY['isLeader'] = false;
    warpExcluded = [];
}).setCriteria("You left the party.");

register("chat", () => {
    playerData.PARTY['inParty'] = false;
    playerData.PARTY['isLeader'] = false;
    if(needJoin.length == 0){
        warpExcluded = [];
    }
}).setCriteria("The party was disbanded because all invites expired and the party was empty.");

register("chat", () => {
    playerData.PARTY['inParty'] = false;
    playerData.PARTY['isLeader'] = false;
    warpExcluded = [];
}).setCriteria("${*} has disbanded the party!");

register("chat", () => {
    playerData.PARTY['inParty'] = false;
    playerData.PARTY['isLeader'] = false;
    warpExcluded = [];
}).setCriteria("You are not in a party right now.");

register("chat", (user) => {
    if(checkIfUser(removeRankTag(user))){
        playerData.PARTY['inParty'] = true;
        playerData.PARTY['isLeader'] = true;
    }
}).setCriteria("Created a public party! Players can join with /party join ${user}");

//Check if party was transfered to you so you're leader

register("chat", (user, user2) => {
    if (checkIfUser(removeRankTag(user))){
        playerData.PARTY['isLeader'] = true; // Party was transfered to you, you are leader
    }
    else if (checkIfUser(removeRankTag(user2))){
        playerData.PARTY['isLeader'] = false; // You transfered the party, you`re no longer leader
    }
    playerData.PARTY['inParty'] = true;
}).setCriteria("The party was transferred to ${user} by ${user2}");

register("chat", (user, user2) => {
    if (checkIfUser(removeRankTag(user))){
        playerData.PARTY['isLeader'] = true; // Party was transfered to you, you are leader
        let i = 0;
        warpExcluded.forEach(player => {
            if(removeRankTag(user2).toLowerCase() == player.toLowerCase()) {
                warpExcluded.splice(i,1);
            }
            i++;
        });
    }
    else if (checkIfUser(removeRankTag(user2))){
        playerData.PARTY['isLeader'] = false;
        playerData.PARTY['inParty'] = false;
        warpExcluded = [];
    }
}).setCriteria("The party was transferred to ${user} because ${user2} left");

register("chat", (user) => {
    if (!checkIfUser(removeRankTag(user))){
        let i = 0;
        needJoin.forEach(player => {
            if(removeRankTag(user).toLowerCase() == player.toLowerCase()) {
                needJoin.splice(i,1);
            }
            i++;
        });
    }
}).setCriteria("${user} joined the party.");

register("chat", (user) => {
    if (!checkIfUser(removeRankTag(user))){
        let i = 0;
        warpExcluded.forEach(player => {
            if(removeRankTag(user).toLowerCase() == player.toLowerCase()) {
                warpExcluded.splice(i,1);
            }
            i++;
        });
    }
}).setCriteria("${user} has left the party.");

register("chat", (user) => {
    if (!checkIfUser(removeRankTag(user))){
        let i = 0;
        needJoin.forEach(player => {
            if(removeRankTag(user).toLowerCase() == player.toLowerCase()) {
                let j = 0;
                warpExcluded.forEach(player => {
                    if(removeRankTag(user).toLowerCase() == player.toLowerCase()) {
                        warpExcluded.splice(j,1);
                    }
                    j++;
                });
                needJoin.splice(i,1);
            }
            i++;
        });
    }
}).setCriteria("The party invite to ${user} has expired.");
//Track logged off time to see if in party still

register("worldunload", () => {
    if (playerData.PARTY['inParty']){
        playerData.PARTY["logOff"] = Date.now();
    }
    playerData.save();
    seaCreatureData.save();
});

register("worldload", () => {
    if (playerData.PARTY['inParty']){
        if (playerData.PARTY["logOff"] + 300000 < Date.now()){
            playerData.PARTY['inParty'] = false;
            playerData.PARTY['isLeader'] = false;
            warpExcluded = [];
        }
        playerData.save();
    }
});

register("command", () => {
    if (playerData.PARTY["inParty"]) {
        if(playerData.PARTY['isLeader']){
            helpmsg = `pc commands: ${settings().partyPrefix}help `;
            if (settings().partyWarp){
                helpmsg += ` | ${settings().partyPrefix}warp`;
            }
            if (settings().partyToggleWarp) {
                helpmsg += ` | ${settings().partyPrefix}togglewarp/twarp`;
            }
            if (settings().partyAllinvite){
                helpmsg += ` | ${settings().partyPrefix}allinvite`;
            }
            if (settings().partyInvite){
                helpmsg += ` | ${settings().partyPrefix}invite/p [username]`;
            }
            if (settings().partyTransfer) {
                helpmsg += ` | ${settings().partyPrefix}transfer/pt`;
            }
            if (settings().partyCoords) {
                helpmsg += ` | ${settings().partyPrefix}coords`;
            }
            if (settings().infoJawbus) {
                helpmsg += ` | ${settings().partyPrefix}ji`;
            }
            if (settings().infoThunder) {
                helpmsg += ` | ${settings().partyPrefix}ti`;
            }
            if (settings().infoVial) {
                helpmsg += ` | ${settings().partyPrefix}vi`;
            }
            ChatLib.command(helpmsg);
        }
        else {
            helpmsg = `pc commands: ${settings().partyPrefix}help`;
            if (settings().partyCoords){
                helpmsg += ` | ${settings().partyPrefix}coords`;
            }
            if (settings().infoJawbus) {
                helpmsg += ` | ${settings().partyPrefix}jawbusinfo`;
            }
            if (settings().infoThunder) {
                helpmsg += ` | ${settings().partyPrefix}thunderinfo`;
            }
            if (settings().infoVial) {
                helpmsg += ` | ${settings().partyPrefix}vialinfo`;
            }
            ChatLib.command(helpmsg);
        }
    }
}).setName("partyhelp");

register("chat", (user, message) => {
    if(message == 'Boop!' || message == 'p me' || message == 'party me' || message == 'lf party') {
        user = removeRankTag(user);
        Msg = new TextComponent(`&a&l[Click to party ${user}]`).setClickAction('run_command').setClickValue(`/p ${user}`).setHoverAction("show_text").setHoverValue(`/p ${user}`);
        ChatLib.chat(Msg);
    }
}).setCriteria("From ${user}: ${message}")


const partyRegex = /(((lf|any(one)?|who)\s(cish(ing)?|fish|p((art)(y|ies))?|crimson p((art)(y|ies))?|ci p((art)(y|ies))?|inv(ite)?)(ing)?)|(^p(arty)?$)|((\s|^)inv(ite)?)|((\s|^)p(arty)? me)|(\s|^)(parties)(\s|$)|^me+($|(\sme+($|(\sme+)))))/ig;
register("chat", (user, message) => {
    user = removeRankTag(user);
    if(user.includes(" ")) user = user.split(" ")[0];
    partyRegex.lastIndex = 0;
    if(partyRegex.test(message) && !checkIfUser(user)) {
        Msg = new TextComponent(`&a&l[Click to party ${user}]`).setClickAction('run_command').setClickValue(`/p ${user}`).setHoverAction("show_text").setHoverValue(`/p ${user}`);
        ChatLib.chat(Msg);
    }
}).setCriteria("Guild > ${user}: ${message}")

//From [MVP++] Jenyk: Hey! I'm currently muted and am unable to message right now.

register("chat", (user, event) => {
    if (playerData.PARTY['isLeader'] && settings().partyWarpMuted) {
        PlayerCountText = TabList.getNames().filter(name => {
            if(name.replace(colorsRegex, "").includes("Players (") || name.replace(colorsRegex, "").includes("Guests (")) return true;
            else return false;
        })[0].replace(colorsRegex, "");
        Playercount = parseInt((/\d+\)/).exec(PlayerCountText));
        if(Player.asPlayerMP() != null){
            if(!PlayerCountText.includes("Guests") && (Playercount > 8 || Player.asPlayerMP().getDimension() != -1)) {
                if (warpExcluded.length == 0){
                    ChatLib.command("p warp");
                }
                else {
                    let needKI = true;
                    delay = 1;
                    warpExcluded.forEach(player => {
                        needKI = true;
                        needJoin.forEach(needed => {
                            if(needed == player){
                                needKI = false;
                            }
                        })
                        if (needKI) {
                            setTimeout(() => {
                                ChatLib.command(`p kick ${player}`);
                                needJoin.push(player);
                            }, delay)
                            delay += 500;
                        }
                    });
                    setTimeout(() => {
                        if(playerData.PARTY['inParty']){
                            ChatLib.command("p warp");
                        }
                    }, delay);
                    delay += 500;
                    warpExcluded.forEach(player => {
                        needKI = true;
                        needJoin.forEach(needed => {
                            if(needed == player){
                                needKI = false;
                            }
                        })
                        if (needKI) {
                            setTimeout(() => {
                                ChatLib.command(`p ${player}`);
                            }, delay)
                            delay += 500;
                        }
                    });
                }
                lastCommand = Date.now();
            }
            else {
                if(PlayerCountText.includes("Guests")) {
                    ChatLib.command("pc Im currently on a private island! (not warping)");
                }
                else if (Playercount <= 8) {
                    ChatLib.command("pc Lobby has a playercount below 8! (not warping probably private)");
                }
                lastCommand = Date.now();
            }
        }
    }
}).setCriteria("From ${user}: Hey! I'm currently muted and am unable to message right now.")

let lastkick
register('chat', (user) => {
    if(settings().partyAutoRejoin) {
        user = removeRankTag(user)
        lastkick = Date.now()
    }
}).setCriteria("You have been kicked from the party by ${user} ")

register('chat', (user) => {
    if(settings().partyAutoRejoin) {
        user = removeRankTag(user)
        if(lastkick) if((Date.now() - lastkick) < 10000) ChatLib.command(`p join ${user}`)
    }
}).setCriteria("-----------------------------------------------------\n${user} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------")
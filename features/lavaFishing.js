import settings from "../utils/settings";
import { seaCreatureData, playerData} from "../data/data";
import { createBossBars , createText} from "../utils/gui";
import { CrimsonCreatures, CrimsonMessages, Chats, MythicDetectSound, colorsRegex, VialRegex} from "../data/constants";
import { makeRegexFromList ,getAverageFromList, funniFaces, readableTime, sendMsg, getRandomInt, getVialAverage} from "../utils/functions";
import RenderLib from "../../RenderLib";

let jawbusHealthStrTemp = '100M/100M';
let jawbusHealthTemp = 100;
let jawbusMaxHealthTemp = 100;
let bossCount = [];
let MythicScs = [];

if(seaCreatureData.CRIMSON['PlhlegblastAllCount'] == undefined){
    seaCreatureData.CRIMSON['PlhlegblastAllCount'] = [];
}
if(seaCreatureData.CRIMSON['JawbusAllCount'] == undefined) {
    seaCreatureData.CRIMSON['JawbusAllCount'] = [];
}
if(seaCreatureData.CRIMSON['ThunderAllCount'] == undefined) {
    seaCreatureData.CRIMSON['ThunderAllCount'] = [];
}
if(seaCreatureData.CRIMSON['VanquisherAllCount'] == undefined){
    seaCreatureData.CRIMSON['VanquisherAllCount'] = [];
}
seaCreatureData.save();

const mythicRegex = /^(Squid|Iron Golem|Guardian)$/gi;
let mythicDetected = false;
let foundMythic = false;
let jawby = false
let JawbusTime = Date.now()
let thunda = false
let ThunderTime = Date.now()
register("step", () => {
    bossCount = [];
    MythicScs = [];
    if(Player.asPlayerMP() != null){
        if(Player.asPlayerMP().getDimension() == -1){
            foundMythic = false;
            World.getAllEntities().forEach(mob => {
                mob_name = mob.name.replace(colorsRegex, "");
                if(mob_name != undefined){
                    if(settings.jawbusHealthBarToggle) {
                        if (mob_name.includes("Lord Jawbus")){
                            jawbusHealthStrTemp = mob_name.split("[Lv600] Lord Jawbus ")[1];
                            if (jawbusHealthStrTemp.includes("M/")) {
                                jawbusHealthTemp = parseFloat(jawbusHealthStrTemp.replace(/k|❤/, "").split("/")[0]);
                            }
                            else if (jawbusHealthStrTemp.includes("k/")) {
                                jawbusHealthTemp = parseFloat(jawbusHealthStrTemp.replace(/M|❤/, "").split("/")[0])/1000
                                ;
                            }
                            else {
                                jawbusHealthTemp = parseFloat(jawbusHealthStrTemp.replace(/M|❤/, "").split("/")[0])/1000000;
                            }
                            jawbusMaxHealthTemp = parseFloat(jawbusHealthStrTemp.replace(/M|❤/, "").split("/")[1]);
                            jawbusHealthStrTemp = "&c&l"+jawbusHealthStrTemp.split(" ")[0];
                            bossCount.push(["&c&lJawbus", jawbusHealthTemp, jawbusMaxHealthTemp, 47, 1, jawbusHealthStrTemp, 5, -1, Renderer.color(0,0,0,255), Renderer.color(115,33,33,255), Renderer.color(219,0,0,255), settings.BossHealthBarLength, mob.x, mob.y, mob.z]);
                        }
                    }
                    if(settings.thunderHealthBarToggle) {
                        if (mob_name.includes("Thunder ")){
                            thunderHealthStrTemp = mob_name.split("[Lv400] Thunder ")[1];
                            if (thunderHealthStrTemp.includes("M/")) {
                                thunderHealthTemp = parseFloat(thunderHealthStrTemp.replace(/k|❤/, "").split("/")[0]);
                            }
                            else if (thunderHealthStrTemp.includes("k/")) {
                                thunderHealthTemp = parseFloat(thunderHealthStrTemp.replace(/M|❤/, "").split("/")[0])/1000
                                ;
                            }
                            else {
                                thunderHealthTemp = parseFloat(thunderHealthStrTemp.replace(/M|❤/, "").split("/")[0])/1000000;
                            }
                            thunderMaxHealthTemp = parseFloat(thunderHealthStrTemp.replace(/M|❤/, "").split("/")[1]);
                            thunderHealthStrTemp = "&b&l"+thunderHealthStrTemp.split(" ")[0];
                            bossCount.push(["&b&lThunder", thunderHealthTemp, thunderMaxHealthTemp, 55, 1, thunderHealthStrTemp, 5, -1, Renderer.color(0,0,0,255), Renderer.color(17, 91, 92,255), Renderer.color(32, 229, 232,255), settings.BossHealthBarLength+6, mob.x, mob.y, mob.z]);
                        }
                    }
                    if(settings.plhlegblastHealthBarToggle) {
                        if (mob_name.includes("Plhlegblast ")){
                            plhlegblastHealthStrTemp = mob_name.split("[Lv300] Plhlegblast ")[1];
                            if (plhlegblastHealthStrTemp.includes("M/")) {
                                plhlegblastHealthTemp = parseFloat(plhlegblastHealthStrTemp.replace(/k|❤/, "").split("/")[0]);
                            }
                            else if (plhlegblastHealthStrTemp.includes("k/")) {
                                plhlegblastHealthTemp = parseFloat(plhlegblastHealthStrTemp.replace(/M|❤/, "").split("/")[0])/1000
                                ;
                            }
                            else {
                                plhlegblastHealthTemp = parseFloat(plhlegblastHealthStrTemp.replace(/M|❤/, "").split("/")[0])/1000000;
                            }
                            plhlegblastMaxHealthTemp = parseFloat(plhlegblastHealthStrTemp.replace(/M|❤/, "").split("/")[1]);
                            plhlegblastHealthStrTemp = "&c&l"+plhlegblastHealthStrTemp;
                            bossCount.push(["&c&lPlhlegblast", plhlegblastHealthTemp, plhlegblastMaxHealthTemp, 70, 1, plhlegblastHealthStrTemp, 5, -1, Renderer.color(0,0,0,255), Renderer.color(115,33,33,255), Renderer.color(219,0,0,255), settings.BossHealthBarLength-23, mob.x, mob.y, mob.z]);
                        }
                    }
                    if (mythicRegex.test(mob_name)){
                        if(!mythicDetected){
                            if(mob_name == 'Squid'){
                                if(settings.mythicDetectionToggle&&settings.plhlegblastDetectionToggle){
                                    MythicDetectTitle = funniFaces(settings.mythicDetectionMessage).replace('([mob])',`Plhlegblast`);
                                    Client.showTitle(MythicDetectTitle, "", settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
                                    mythicDetected = true;
                                    if(settings.mythicDetectionSoundToggle){
                                        try {
                                            MythicDetectSound.setVolume(settings.mythicDetectionSoundVolume).play();
                                        }
                                        catch (error) {
                                            console.log("Sound playing no workie, prob sounds refreshed\n", error);
                                        }
                                    }
                                }
                            }
                            else if(mob_name == 'Iron Golem'){
                                if(settings.mythicDetectionToggle&&settings.jawbusDetectionToggle){
                                    MythicDetectTitle = funniFaces(settings.mythicDetectionMessage).replace('([mob])',`Lord Jawbus`);
                                    Client.showTitle(MythicDetectTitle, "", settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
                                    if(settings.mythicDetectionSoundToggle){
                                        try {
                                            MythicDetectSound.setVolume(settings.mythicDetectionSoundVolume).play();
                                        }
                                        catch (error) {
                                            console.log("Sound playing no workie, prob sounds refreshed\n", error);
                                        }
                                    }
                                }
                                mythicDetected = true;
                                jawby = true
                                JawbusTime = Date.now()
                            }
                            else if(mob_name == 'Guardian'){
                                if(mob.getWidth() > 1.5){
                                    if(settings.mythicDetectionToggle&&settings.thunderDetectionToggle){
                                        MythicDetectTitle = funniFaces(settings.mythicDetectionMessage).replace('([mob])',`Thunder`);
                                        Client.showTitle(MythicDetectTitle, "", settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
                                        if(settings.mythicDetectionSoundToggle){
                                            try {
                                                MythicDetectSound.setVolume(settings.mythicDetectionSoundVolume).play();
                                            }
                                            catch (error) {
                                                console.log("Sound playing no workie, prob sounds refreshed\n", error);
                                            }
                                        }
                                    }
                                    mythicDetected = true;
                                    thunda = true
                                    ThunderTime = Date.now()
                                }
                            }
                        }
                        if(mob_name == 'Guardian'){
                            if(mob.getWidth() > 1.5){
                                foundMythic = true; 
                                if(settings.mythicLootshareThunderToggle) {
                                    MythicScs.push([mob.x, mob.y, mob.z]);
                                }
                            }
                        }
                        else if(mob_name == 'Iron Golem'){
                            if(settings.mythicLootshareJawbusToggle) {
                                MythicScs.push([mob.x, mob.y, mob.z]);
                            }
                            foundMythic = true; 
                        }
                        else if(mob_name == 'Squid') {
                            if(settings.mythicLootsharePlhlegblastToggle) {
                                MythicScs.push([mob.x, mob.y, mob.z]);
                            }
                            foundMythic = true; 
                        }
                    }
                }
            }); 
            if(mythicDetected && !foundMythic) {
                mythicDetected = false;
                if(jawby) {
                    jawby = false
                    ChatLib.chat(`&f&lJawbus took &e&l${readableTime(Date.now()-JawbusTime, true)}&f&l to kill!`)
                }
                if(thunda) {
                    thunda = false
                    ChatLib.chat(`&f&lThunder took &e&l${readableTime(Date.now()-ThunderTime, true)}&f&l to kill!`)
                }
            }
        }
    }
}).setFps(settings.chBossPollingrate);

let y = 0;
register("renderoverlay", () => {
    if(playerData.GUI["Toggle"]){
        if(settings.bossHealthBarToggle) {
            createBossBars(bossCount, "CrimsonBossBar", 310, 20, 7, settings.BossHealthBarLength);
        }
    }
});

const crimsonMsg = makeRegexFromList(CrimsonMessages, true);
const crimsonCreatures = makeRegexFromList(CrimsonCreatures);
const doubleHookMessages = /Double Hook\!|It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!/;
const MfRegex = /\d+% ✯ Magic Find/g;
let doubleHook = false;
register("chat", (message, event) => {
    doubleHookMessages.lastIndex = 0;
    if(Player.asPlayerMP() != null){
        if(doubleHookMessages.test(message) && Player.asPlayerMP().getDimension() == -1) {
            doubleHook = true;
        }
    }
    crimsonMsg.lastIndex = 0;
    if(crimsonMsg.test(message)) {
        crimsonCreatures.lastIndex = 0;
        Creature = crimsonCreatures.exec(message);
        if(Creature == 'Plhlegblast'){
            if(settings.mythicMessageToggle){
                if(settings.mythicPlhlegblastMessage != '') {
                    mythicmsg = `${funniFaces(settings.mythicPlhlegblastMessage)}`;
                    mythicmsg = mythicmsg.replace("([number])", `${seaCreatureData.CRIMSON['PlhlegblastCount']}`).replace("([time])", `${readableTime(Date.now()-seaCreatureData.CRIMSON['PlhlegblastTime'])}`).replace("([coords])", `x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                    if(doubleHook){
                        mythicmsg = mythicmsg.replace("([double])", "Double ")
                        setTimeout(() => {
                            sendMsg(mythicmsg);
                        }, 250);
                    }
                    else {
                        mythicmsg = mythicmsg.replace("([double])", "")   
                        sendMsg(mythicmsg);
                    }
                }
            }
            seaCreatureData.CRIMSON['PlhlegblastAllCount'].push(seaCreatureData.CRIMSON['PlhlegblastCount']);
            seaCreatureData.CRIMSON['PlhlegblastCount'] = 1 ;
            seaCreatureData.CRIMSON['PlhlegblastTime'] = Date.now();
        }
        else {
            if(-357 > Player.getX() && Player.getX() > -398 && 72 < Player.getY() && Player.getY() < 100 && -683 > Player.getZ() && Player.getZ() > -722){
                seaCreatureData.CRIMSON['PlhlegblastCount'] += 1;
            }
        }
        if(Creature == 'Lord Jawbus'){
            if(settings.mythicMessageToggle){
                if(settings.mythicJawbusMessage != ''){
                    mythicmsg = `${funniFaces(settings.mythicJawbusMessage)}`;
                    mythicmsg = mythicmsg.replace("([number])", `${seaCreatureData.CRIMSON['JawbusCount']}`).replace("([time])", `${readableTime(Date.now()-seaCreatureData.CRIMSON['JawbusTime'])}`).replace("([coords])", `x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                    if(doubleHook){
                        mythicmsg = mythicmsg.replace("([double])", "Double ")
                        setTimeout(() => {
                            sendMsg(mythicmsg);
                        }, 250);
                    }
                    else {
                        mythicmsg = mythicmsg.replace("([double])", "")   
                        sendMsg(mythicmsg);
                    }
                }
            }
            if(doubleHook){
                seaCreatureData.DROPS["RadioactiveVial"] += 2;
            }
            else {
                seaCreatureData.DROPS["RadioactiveVial"] += 1;
            }
            seaCreatureData.CRIMSON['JawbusAllCount'].push(seaCreatureData.CRIMSON['JawbusCount']);
            seaCreatureData.CRIMSON['JawbusCount'] = 1 ;
            seaCreatureData.CRIMSON['JawbusTime'] = Date.now();
        }
        else {
            seaCreatureData.CRIMSON['JawbusCount'] += 1;
        }
        if(Creature == 'Thunder'){
            if(settings.mythicMessageToggle){
                if(settings.mythicThunderMessage != '') {
                    mythicmsg = `${funniFaces(settings.mythicThunderMessage)}`;                                                                                          
                    mythicmsg = mythicmsg.replace("([number])", `${seaCreatureData.CRIMSON['ThunderCount']}`).replace("([time])", `${readableTime(Date.now()-seaCreatureData.CRIMSON['ThunderTime'])}`).replace("([coords])", `x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                    if(doubleHook){
                        mythicmsg = mythicmsg.replace("([double])", "Double ")
                        setTimeout(() => {
                            sendMsg(mythicmsg);
                        }, 400);
                    }
                    else {
                        mythicmsg = mythicmsg.replace("([double])", "")   
                        sendMsg(mythicmsg);
                    }
                }
            }
            if(doubleHook){
                seaCreatureData.DROPS["Flash"] += 2;
            }
            else {
                seaCreatureData.DROPS["Flash"] += 1;
            }
            seaCreatureData.CRIMSON['ThunderAllCount'].push(seaCreatureData.CRIMSON['ThunderCount']);
            seaCreatureData.CRIMSON['ThunderCount'] = 1 ;
            seaCreatureData.CRIMSON['ThunderTime'] = Date.now();
        }
        else {
            seaCreatureData.CRIMSON['ThunderCount'] += 1;
        }
        if(doubleHook){
            seaCreatureData.CRIMSON[Creature] += 2;
            seaCreatureData.CRIMSON['VanquisherCount'] += 2;
            doubleHook = false;
            if(Creature == 'Magma Slug'){
                seaCreatureData.CRIMSON['VanquisherCount'] += 6;
            }
        }
        else {
            seaCreatureData.CRIMSON[Creature] += 1;
            seaCreatureData.CRIMSON['VanquisherCount'] += 1;
            if(Creature == 'Magma Slug'){
                seaCreatureData.CRIMSON['VanquisherCount'] += 3;
            }
        }
    }
    if(VialRegex.test(message)){
        MfRegex.lastIndex = 0;
        Magicfind = parseInt(MfRegex.exec(message));
        delay = 1;
        thisVial = seaCreatureData.DROPS["RadioactiveVial"];
        thisTime = Date.now();
        thisTimeLast = seaCreatureData.DROPS["RadioactiveVialTime"]
        seaCreatureData.DROPS["VialHistory"].push([seaCreatureData.DROPS["RadioactiveVial"], thisTime]);
        if(settings.vialMessageToggle){
            if(settings.vialPartyChatToggle) {
                setTimeout(() => {
                    sendMsg(funniFaces(settings.vialMessage).replace("([number])", thisVial).replace("([time])", readableTime(thisTime-thisTimeLast)).replace("([mf])", Magicfind), 0);
                }, delay);
                delay += 500;
            }
            if(settings.vialGuildChatToggle) {
                setTimeout(() => {
                    sendMsg(funniFaces(settings.vialMessage).replace("([number])", thisVial).replace("([time])", readableTime(thisTime-thisTimeLast)).replace("([mf])", Magicfind), 1);
                }, delay);
                delay += 500;
            }
            if(settings.vialAllChatToggle) {
                setTimeout(() => {
                    sendMsg(funniFaces(settings.vialMessage).replace("([number])", thisVial).replace("([time])", readableTime(thisTime-thisTimeLast)).replace("([mf])", Magicfind), 2);
                }, delay);
                delay += 500;
            }
            if(settings.vialCoopChatToggle) {
                setTimeout(() => {
                    sendMsg(funniFaces(settings.vialMessage).replace("([number])", thisVial).replace("([time])", readableTime(Date.now()-seaCreatureData.DROPS["RadioactiveVialTime"])).replace("([mf])", Magicfind), 5);
                }, delay);
                delay += 500;
            }
        }
        ChatLib.chat("&5[&b&lRFU&5] &f&lVial drop message copied to clipboard.");
        ChatLib.command(`ct copy ${funniFaces(settings.vialMessage).replace("([number])", thisVial).replace("([time])", readableTime(Date.now()-seaCreatureData.DROPS["RadioactiveVialTime"])).replace("([mf])", Magicfind)}`, true);
        seaCreatureData.DROPS["RadioactiveVial"] = 0;
        seaCreatureData.DROPS["RadioactiveVialTime"] = thisTime;
    }
}).setCriteria("${message}");


register('chat', () => {
    if(Date.now() - seaCreatureData.CATCHES["LastCatch"] < 60000*settings.seacreatureHourResetTime) {
        vanqmsg = `${funniFaces(settings.vanquisherMessage)}`;
        vanqmsg = vanqmsg.replace("([number])", `${seaCreatureData.CRIMSON['VanquisherCount']}`).replace("([time])", `${readableTime(Date.now()-seaCreatureData.CRIMSON['VanquisherTime'])}`).replace("([coords])", `x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
        sendMsg(vanqmsg);
        seaCreatureData.CRIMSON['VanquisherAllCount'].push(seaCreatureData.CRIMSON['VanquisherCount']);
        seaCreatureData.CRIMSON['VanquisherCount'] = 0;
    }
    else{
        vanqmsg = `${funniFaces(settings.vanquisherMessage)}`;
        vanqmsg = vanqmsg.replace("([number])", `?`).replace("([time])", `${readableTime(Date.now()-seaCreatureData.CRIMSON['VanquisherTime'])}`).replace("([coords])", `x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
        sendMsg(vanqmsg);
    }
    seaCreatureData.CRIMSON['VanquisherTime'] = Date.now();
}).setCriteria("A Vanquisher is spawning nearby!")

register('renderoverlay', () => {
    if(playerData.GUI["Toggle"]){
        if(!settings.crimsonHideUIToggle) {
            if (settings.plhlegblastUIToggle){
                createText(funniFaces('&4&lPlhlegblast: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['PlhlegblastCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['PlhlegblastAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['PlhlegblastTime'])), 'plhlegblast', 120, 20);
            }
            if (settings.jawbusUIToggle) {
                createText(funniFaces('&c&lJawbus: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['JawbusCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['JawbusAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['JawbusTime'])), 'jawbus', 120, 30);
            }
            if(settings.thunderUIToggle) {
                createText(funniFaces('&b&lThunder: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['ThunderCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['ThunderAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['ThunderTime'])), 'thunder', 120, 40);    
            }
            if(settings.vanquisherUIToggle) {
                createText(funniFaces('&5&lVanquisher: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['VanquisherCount']}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['VanquisherAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['VanquisherTime'])), 'vanquisher', 120, 50);
            }
            if(settings.vialUIToggle) {
                createText(`&cJawbus &6since &aVial&6: &f${seaCreatureData.DROPS["RadioactiveVial"]} (${getVialAverage()}) &e${readableTime(Date.now()-seaCreatureData.DROPS["RadioactiveVialTime"])}`, "Vial", 120, 60);
            } 
        }
        else {
            if(Player.asPlayerMP() != null){
                if(Date.now() - seaCreatureData.CATCHES["LastCatch"] < 60000*settings.seacreatureHourResetTime && (Player.asPlayerMP().getDimension() == -1)) {
                    if (settings.plhlegblastUIToggle){
                        if(-357 > Player.getX() && Player.getX() > -398 && 72 < Player.getY() && Player.getY() < 100 && -683 > Player.getZ() && Player.getZ() > -722){
                            createText(funniFaces('&4&lPlhlegblast: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['PlhlegblastCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['PlhlegblastAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['PlhlegblastTime'])), 'plhlegblast', 120, 20);
                        }
                        else {
                            createText("", 'plhlegblast', 120, 20, false, funniFaces('&4&lPlhlegblast: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['PlhlegblastCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['PlhlegblastAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['PlhlegblastTime'])));
                        }
                    }
                    if (settings.jawbusUIToggle) {
                        createText(funniFaces('&c&lJawbus: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['JawbusCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['JawbusAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['JawbusTime'])), 'jawbus', 120, 30);
                    }
                    if(settings.thunderUIToggle) {
                        createText(funniFaces('&b&lThunder: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['ThunderCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['ThunderAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['ThunderTime'])), 'thunder', 120, 40);    
                    }
                    if(settings.vanquisherUIToggle) {
                        createText(funniFaces('&5&lVanquisher: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['VanquisherCount']}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['VanquisherAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['VanquisherTime'])), 'vanquisher', 120, 50);
                    }
                    if(settings.vialUIToggle) {
                        createText(`&cJawbus &6since &aVial&6: &f${seaCreatureData.DROPS["RadioactiveVial"]} (${getVialAverage()}) &e${readableTime(Date.now()-seaCreatureData.DROPS["RadioactiveVialTime"])}`, "Vial", 120, 60);
                    } 
                }
                else {
                    if (settings.plhlegblastUIToggle){
                        createText("", 'plhlegblast', 120, 20, false, funniFaces('&4&lPlhlegblast: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['PlhlegblastCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['PlhlegblastAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['PlhlegblastTime'])));
                    }
                    if (settings.jawbusUIToggle) {
                        createText("", 'jawbus', 120, 30, false, funniFaces('&c&lJawbus: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['JawbusCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['JawbusAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['JawbusTime'])));
                    }
                    if(settings.thunderUIToggle) {
                        createText("", 'thunder', 120, 40, false, funniFaces('&b&lThunder: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['ThunderCount']-1}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['ThunderAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['ThunderTime'])));    
                    }
                    if(settings.vanquisherUIToggle) {
                        createText("", 'vanquisher', 120, 50, false, funniFaces('&5&lVanquisher: &e&l([count]) (([average])) &7&l([time])').replace("([count])", `${seaCreatureData.CRIMSON['VanquisherCount']}`).replace("([average])", `${getAverageFromList(seaCreatureData.CRIMSON['VanquisherAllCount'])}`).replace("([time])", readableTime(Date.now()-seaCreatureData.CRIMSON['VanquisherTime'])));
                    }
                    if(settings.vialUIToggle) {
                        createText("", "Vial", 120, 60, false, `&cJawbus &6since &aVial&6: &f${seaCreatureData.DROPS["RadioactiveVial"]} (${getVialAverage()}) &e${readableTime(Date.now()-seaCreatureData.DROPS["RadioactiveVialTime"])}`);
                    } 
                }
            }
        }
    }
});

register('command', () => {
    seaCreatureData.CRIMSON['PlhlegblastAllCount'] = [];
    seaCreatureData.CRIMSON['PlhlegblastCount'] = 1 ;
    seaCreatureData.CRIMSON['PlhlegblastTime'] = Date.now();
    seaCreatureData.CRIMSON['JawbusAllCount'] = [];
    seaCreatureData.CRIMSON['JawbusCount'] = 1 ;
    seaCreatureData.CRIMSON['JawbusTime'] = Date.now();
    seaCreatureData.CRIMSON['ThunderAllCount'] = [];
    seaCreatureData.CRIMSON['ThunderCount'] = 1 ;
    seaCreatureData.CRIMSON['ThunderTime'] = Date.now();
    seaCreatureData.CRIMSON['VanquisherCount'] = 1;
    seaCreatureData.CRIMSON['VanquisherAllCount'] = [];
    seaCreatureData.CRIMSON['VanquisherCount'] = 0;
    seaCreatureData.CRIMSON['VanquisherAllCount'] = [];
    seaCreatureData.CRIMSON['VanquisherTime'] = Date.now();
}).setName('rfuresetcicounters');

register('command', () => {
    seaCreatureData.CRIMSON['PlhlegblastAllCount'] = [];
    seaCreatureData.CRIMSON['PlhlegblastCount'] = 1 ;
    seaCreatureData.CRIMSON['PlhlegblastTime'] = Date.now();
}).setName('rfuresetplhlegblastcounter');

register('command', () => {
    seaCreatureData.CRIMSON['JawbusAllCount'] = [];
    seaCreatureData.CRIMSON['JawbusCount'] = 1 ;
    seaCreatureData.CRIMSON['JawbusTime'] = Date.now();
}).setName('rfuresetjawbuscounter');

register('command', () => {
    seaCreatureData.CRIMSON['ThunderAllCount'] = [];
    seaCreatureData.CRIMSON['ThunderCount'] = 1 ;
    seaCreatureData.CRIMSON['ThunderTime'] = Date.now();
}).setName('rfuresetthundercounter');

register('command', () => {
    seaCreatureData.CRIMSON['VanquisherCount'] = 0;
    seaCreatureData.CRIMSON['VanquisherAllCount'] = [];
    seaCreatureData.CRIMSON['VanquisherTime'] = Date.now();
}).setName('rfuresetvanqcounter');

register('renderWorld', () => {
    MythicScs.forEach(boss => {
        //x, y, z, radius, slices, stacks, rot1, rot2, rot3, r, g, b, a, phase, linemode
        RenderLib.drawSphere(boss[0],boss[1],boss[2], 30, 50, 50, -90, 0, 0, 1, 1, 1, 1, false, true);
    });
});

register('command', () => {
    ChatLib.chat("&e&l-----------------------------------");
    ChatLib.chat(`&4&lPlhlegblast: &f&l${seaCreatureData.CRIMSON['PlhlegblastCount']-1}\n&6&lAvg: &f&l${getAverageFromList(seaCreatureData.CRIMSON['PlhlegblastAllCount'])}\n&6&lLast: &f&l${readableTime(Date.now()-seaCreatureData.CRIMSON['PlhlegblastTime'])} ago`);
    ChatLib.chat(`&c&lJawbus: &f&l${seaCreatureData.CRIMSON['JawbusCount']-1}\n&6&lAvg: &f&l${getAverageFromList(seaCreatureData.CRIMSON['JawbusAllCount'])}\n&6&lLast: &f&l${readableTime(Date.now()-seaCreatureData.CRIMSON['JawbusTime'])} ago`);
    ChatLib.chat(`&b&lThunder: &f&l${seaCreatureData.CRIMSON['ThunderCount']-1}\n&6&lAvg: &f&l${getAverageFromList(seaCreatureData.CRIMSON['ThunderAllCount'])}\n&6&lLast: &f&l${readableTime(Date.now()-seaCreatureData.CRIMSON['ThunderTime'])} ago`);
    ChatLib.chat("&e&l-----------------------------------");
}).setName('rfubossstats').setAliases('sch', 'bossstats','bs');

function vials() {
    ChatLib.chat("&a&l-----------------------------------");
    if(seaCreatureData.DROPS["VialHistory"].length > 0){
        seaCreatureData.DROPS["VialHistory"].forEach(vial => {
            if(vial[1] != 0) {
                ChatLib.chat(`&6&lVial in ${vial[0]} catches &f&l${readableTime(Date.now()-vial[1])} ago`);
            }
            else {
                ChatLib.chat(`&6&lVial in ${vial[0]} catches &f&l??? ago`);
            }
        })
    }
    else{
        ChatLib.chat("&6&lNo vials dropped so far :(");
    }
    ChatLib.chat("&a&l-----------------------------------");
}

register('command', () => {
    vials();
}).setName('rfuvialhistory').setAliases('vial', 'vials', 'vh');

register('command', () => {
    seaCreatureData.DROPS["VialHistory"] = [];
    seaCreatureData.save();
}).setName('rfuresetvialhistory');

let teste = [];
register('command', (count) => {
    teste = seaCreatureData.DROPS["VialHistory"];
}).setName('savevial');

register('command', (count) => {
    seaCreatureData.DROPS["VialHistory"] = teste;
}).setName('loadvial');

register('command', (count) => {
    if(count != null) {
        if(parseInt(count) > 0) {
            seaCreatureData.DROPS["VialHistory"].push([parseInt(count), 0]);
            vials();
        }
        else {
            ChatLib.chat("count must be a number!");
        }
    }
    else {
        ChatLib.chat("Correct command: /rfuaddvial count\ncount is the jawbus count.\nUnfortunatly cannot set the time for it.")
    }
}).setName('rfuaddvial');

register('command', (count) => {
    if(count != null) {
        if(parseInt(count) > 0) {
            seaCreatureData.DROPS["RadioactiveVial"] = parseInt(count);
        }
        else {
            ChatLib.chat("count must be a number!");
        }
    }
    else {
        ChatLib.chat("Correct command: /rfusetvialcount count")
    }
}).setName('rfusetvialcount');

register("renderEntity", (entity, pos, partialTick, event) => {
    if(entity != null) {
        if(entity.getClassName() != "GUIClientPlayer") {
            if(entity.name != null && Player != null) {
                if(Player.asPlayerMP() != null){
                    if(Player.asPlayerMP().getDimension() == -1){
                        if(entity.name == "Wither" || (entity.name == 'Guardian' && entity.getWidth() > 1.5)) {
                            TimeAlive = entity.getTicksExisted()
                            if(TimeAlive < 110) {
                                Tessellator.drawString(`Invulnerable ${readableTime(5500-TimeAlive/20*1000, true)}`,  Player.getX() + pos.x, Player.getY() + pos.y + 3.5, Player.getZ() + pos.z, 9373197, true, 0.05, false);
                            }
                            else {
                                Tessellator.drawString(`Vulnerable`, Player.getX() + pos.x, Player.getY() + pos.y + 3.5, Player.getZ() + pos.z, 57381, true, 0.05, false);
                            }
                        }
                    }
                }
            }
        }
    }
})

let Flashes = 0;
let Attribute = 0;
let Frag = 0;
let Bobbin = 0;
let lastFlashes = 0;
let lastAttribute = 0;
let lastFrag = 0;
let lastBobbin = 0;
let sent = false;
let lastTime = 0;
register("entityDeath", (entity) => {
    if(settings.dropsMessageToggle) {
        if(entity != null) {
            if(entity.name != null && Player != null) {
                if(Player.asPlayerMP() != null){
                    if(Player.asPlayerMP().getDimension() == -1){
                        if((entity.name == 'Guardian' && entity.getWidth() > 1.5) || entity.name == 'Iron Golem') {
                            now = Date.now()
                            if(now - lastTime > 110) {
                                lastTime = now
                                lastFlashes = 0;
                                lastAttribute = 0;
                                lastFrag = 0;
                                lastBobbin = 0;
                                Flashes = 0;
                                Attribute = 0;
                                Frag = 0;
                                Bobbin = 0;
                                sent = false;  
                                Player?.getInventory()?.getItems()?.forEach(item => {
                                    if(item?.getName()?.includes("Enchanted Book") && item?.getLore()?.find(lore => lore.replace(colorsRegex, "").includes("Flash I"))) {
                                        lastFlashes += 1;
                                    }
                                    if(item?.getName()?.includes("Attribute Shard")) {
                                        lastAttribute += 1;
                                    }
                                    if(item?.getName()?.includes("Magma Lord Fragment")) {
                                        lastFrag += 1;
                                    }
                                    if(item?.getName()?.includes("Bobbin' Scriptures")) {
                                        lastBobbin += 1;
                                    }
                                })
                                setTimeout(() => {
                                    Player?.getInventory()?.getItems()?.forEach(item => {
                                        if(item?.getName()?.includes("Enchanted Book") && item?.getLore()?.find(lore => lore.replace(colorsRegex, "").includes("Flash I"))) {
                                            Flashes += 1;
                                        }
                                        if(item?.getName()?.includes("Attribute Shard")) {
                                            Attribute += 1;
                                        }
                                        if(item?.getName()?.includes("Magma Lord Fragment")) {
                                            Frag += 1;
                                        }
                                        if(item?.getName()?.includes("Bobbin' Scriptures")) {
                                            Bobbin += 1;
                                        }
                                        
                                    })
                                    if(lastFlashes < Flashes) {
                                        ChatLib.chat(`&6&lRARE DROP! &d&lFlash&7${Flashes-lastFlashes>1?" ("+(Flashes-lastFlashes)+"x)":""}`)
                                        sent = true;
                                    };
                                    if(lastAttribute < Attribute) {
                                        ChatLib.chat(`&6&lRARE DROP! &fAttribute Shard&7${Attribute-lastAttribute>1?" ("+(Attribute-lastAttribute)+"x)":""}`)
                                        sent = true;
                                    }
                                    if(lastFrag < Frag) {
                                        ChatLib.chat(`&6&lRARE DROP! &6Magma Lord Fragment&7${Frag-lastFrag>1?" ("+(Frag-lastFrag)+"x)":""}`)
                                        sent = true;
                                    }
                                    if(lastBobbin < Bobbin) {
                                        ChatLib.chat(`&6&lRARE DROP! &9Bobbin' Scriptures&7${Bobbin-lastBobbin>1?" ("+(Bobbin-lastBobbin)+"x)":""}`)
                                        sent = true;
                                    }
                                    if(!sent) {
                                        if(settings.dropsAirMessageToggle) {
                                            randomNumber = getRandomInt(3);
                                            if(randomNumber == 2) {
                                                ChatLib.chat("&6&lRARE DROP! &fAir &b(+420% ✯ Magic Find)");
                                            }
                                            else if (randomNumber == 1){
                                                ChatLib.chat("&6&lRARE DROP! &fAir &b(+69% ✯ Magic Find)");
                                            }
                                            else {
                                                ChatLib.chat(`&6&lRARE DROP! &fAir &b(+${getRandomInt(500)}% ✯ Magic Find)`);
                                            }
                                        }
                                        sent = true;
                                    }
                                }, 100)
                            }
                        }
                    }
                }
            }
        }
    }
})


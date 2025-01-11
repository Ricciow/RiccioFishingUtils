import settings from "../settings/settings";
import { playerData , seaCreatureData} from "../data/data";
import { readableTime, funniFaces, makeRegexFromList, readableTime, sendMsg, getRandomInt, readableQuantity} from "../utils/functions";
import { Chats , seaCreatures, seaCreaturesNW, Bobber, seaCreatureMessages, colorsRegex, ArmorStand, Firework} from "../data/constants";
import guiManager from "../gui/guiManager";
import settings from "../settings/settings";

let SeaCreatures = 0;
let SeaCreaturesNW = 0;
let TitleSent = false;
let MsgSent = false;
let lastCount = 0;
let StartTime = 0;
const creatureRegex = makeRegexFromList(seaCreatures);
const noWormRegex = makeRegexFromList(seaCreaturesNW);
//FLUXES
let fluxActive = false;
let fluxSent = true;
let fluxTime = 'No Orb';
let fluxCoords = [];
//Bobbers
let BobberCount = 0
register('step', () => {
    if (settings().seaCreatureCounterToggle || settings().fluxToggle) {
        SeaCreatures = 0;
        SeaCreaturesNW = 0;
        fluxActive = false;
        World.getAllEntities().forEach(mob => {
            if (creatureRegex.test(mob.name)){
                if (mob.name != 'Squid'){
                    SeaCreatures += 1;
                }
            }
            if (noWormRegex.test(mob.name)){
                if (mob.name != 'Squid'){
                    SeaCreaturesNW += 1;
                }
            }
            if (mob.name.includes("Plasmaflux ") || mob.name.includes("Overflux ")){
                fluxCoords[0] = mob.x;
                fluxCoords[1] = mob.y;
                fluxCoords[2] = mob.z;
                fluxName = mob.name.replace(colorsRegex, "");
                fluxTime = fluxName.split(" ")[1];
                fluxActive = true;
                fluxSent = false;
            }
        });
        if (lastCount == 0) {
            if(SeaCreatures > 0) {
                StartTime = Date.now();
            }
        }
        lastCount = SeaCreatures;
    }
    else {
        playerData.GENERALFISHING["Sound"] = false;
        TitleSent = false;
    }
    if(!fluxActive && !fluxSent && settings().fluxToggle){ // Flux Expired Message
        if(Player.asPlayerMP() != null){
            if(Player.asPlayerMP() != null){
                if(Player.asPlayerMP().distanceTo(fluxCoords[0], fluxCoords[1], fluxCoords[2]) < 27) {
                    if (settings().fluxMessageToggle) {
                        sendMsg(funniFaces(settings().deployableMessage.replace("([deployable])", "Power Orb")));
                    }
                    if (settings().fluxTitleToggle){                     // Flux Title message
                        fluxTitle = `${funniFaces(settings().fluxTitleMessage)}`;
                        Client.showTitle(fluxTitle, "", settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                    }
                    if (settings().deployableSoundToggle){          // Flux sound
                        World.playSound(settings().deployableSound, settings().deployableSoundVolume, settings().deployableSoundPitch/100);
                    }
                }
                fluxSent = true;
                fluxTime = 'No Orb';
            }
        }
    }
    if (settings().fluxTimerToggle && settings().fluxToggle) {
        //Power Orb Render
        let fluxData = guiManager.getElementData("PowerOrbTimer")
        fluxData.Data["(1)"] = fluxTime
        if(!settings().deployableHideToggle) {
            //Hide if not relevant OFF
            fluxData.Hidden = false
            guiManager.updateElementData("PowerOrbTimer", fluxData)
        }
        else if (fluxTime != "No flux") {
            //Hide if not relevant ON, if there is an Orb
            fluxData.Hidden = false
            guiManager.updateElementData("PowerOrbTimer", fluxData)
        }
        else {
            //Hide if not relevant ON, if there isnt an Orb
            fluxData.Hidden = true
            guiManager.updateElementData("PowerOrbTimer", fluxData)
        }
    }
    if (settings().seaCreatureCounterToggle){
        now = Date.now()
        if (settings().seaCreatureMessageToggle) {
            if ((settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW) >= settings().seaCreatureLimit && !MsgSent){
                ScMessage = `${funniFaces(settings().seaCreatureMessage)}`;
                ScMessage = ScMessage.replace("([number])", `${(settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW)}`);
                ScMessage = ScMessage.replace("([time])", `${readableTime(now - playerData.GENERALFISHING["SeaTimer"])}`);
                sendMsg(ScMessage);
                MsgSent = true;
            }
            else if ((settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW) <= Math.floor(settings().seaCreatureLimit/2) && MsgSent){
                MsgSent = false;
                playerData.GENERALFISHING["SeaTimer"] = now;
            }
        }
        if (settings().seaCreatureTitleToggle){
            if ((settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW) >= settings().seaCreatureTitleLimit && !TitleSent){
                // Main Title
                ScTitleMessage = `${funniFaces(settings().seaCreatureTitleMessage)}`;
                ScTitleMessage = ScTitleMessage.replace("([number])", `${(settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW)}`);
                ScTitleMessage = ScTitleMessage.replace("([time])", `${readableTime(now - playerData.FISHING["SeaTTimer"])}`);
                // Subtitle
                ScSubTitleMessage = `${funniFaces(settings().seaCreatureTitleMessageSubtitle)}`;
                ScSubTitleMessage = ScSubTitleMessage.replace("([number])", `${(settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW)}`);
                ScSubTitleMessage = ScSubTitleMessage.replace("([time])", `${readableTime(now - playerData.FISHING["SeaTTimer"])}`);
                Client.showTitle(ScTitleMessage, ScSubTitleMessage, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                TitleSent = true;
            }
            else if ((settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW) <= Math.floor(settings().seaCreatureTitleLimit/2) && TitleSent){
                TitleSent = false;
                playerData.FISHING["SeaTTimer"] = now;
            }
        }
        if ((settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW) >= settings().seaCreatureSoundLimit && settings().seaCreatureSoundToggle && !playerData.GENERALFISHING["Sound"]){
            playerData.GENERALFISHING["Sound"] = true;
        }
        else if ((settings().seaCreatureCountWorms ? SeaCreatures : SeaCreaturesNW) <= Math.floor(settings().seaCreatureSoundLimit/2) && playerData.GENERALFISHING["Sound"]) {
            playerData.GENERALFISHING["Sound"] = false;
        }
    }
    //
    if (settings().seaCreatureCounterToggle) {
        if(settings().seaCreatureCounterUiToggle) {
            //Sea creature counter render
            let seaCreatureDataUI = guiManager.getElementData("SeaCreatureCount")
            seaCreatureDataUI.Times["(1)"] = [SeaCreatures]
            seaCreatureDataUI.Times["(2)"] = ((SeaCreatures > 0 && ((Date.now() - StartTime) > 1000)) ? StartTime : ['0s'])
            if(!settings().generalHideUIToggle) {
                //Hide if not relevant OFF
                seaCreatureDataUI.Hidden = false
                guiManager.updateElementData("SeaCreatureCount", seaCreatureDataUI)
            }
            else if (SeaCreatures > 0 || (Date.now() - seaCreatureDataUI.CATCHES["LastCatch"] < 60000*settings().seacreatureHourResetTime)) {
                //Hide if not relevant ON, you are Fishing
                seaCreatureDataUI.Hidden = false
                guiManager.updateElementData("SeaCreatureCount", seaCreatureDataUI)
            }
            else {
                //Hide if not relevant ON, you arent fishing
                seaCreatureDataUI.Hidden = true
                guiManager.updateElementData("SeaCreatureCount", seaCreatureDataUI)
            }
        }
        if(settings().seacreatureHourUIToggle) {
            //Sea creature per hour render
            let seaCreatureHourData = guiManager.getElementData("SeaCreatureHour")
            if(Date.now() - seaCreatureData.CATCHES["LastCatch"] < 60000*settings().seacreatureHourResetTime) {
                seaCreatureHourData.Times["(1)"] = [Math.floor((3600000/(Date.now()-seaCreatureData.CATCHES["FirstCatch"]))*seaCreatureData.CATCHES["ThisCatches"])]
                seaCreatureHourData.Times["(2)"] = [seaCreatureData.CATCHES["ThisCatches"]]
                seaCreatureHourData.Times["(3)"] = seaCreatureData.CATCHES["FirstCatch"]
            }
            else {
                seaCreatureHourData.Times["(1)"] = ["0"]
                seaCreatureHourData.Times["(2)"] = ["0"]
                seaCreatureHourData.Times["(3)"] = ["0s"]
            }
            if(!settings().generalHideUIToggle) {
                //Hide if not relevant OFF
                seaCreatureHourData.Hidden = false
                guiManager.updateElementData("SeaCreatureHour", seaCreatureHourData)
            }
            else if(Date.now() - seaCreatureData.CATCHES["LastCatch"] < 60000*settings().seacreatureHourResetTime) {
                //Hide if not relevant ON, you are Fishing
                seaCreatureHourData.Hidden = false
                guiManager.updateElementData("SeaCreatureHour", seaCreatureHourData)
            }
            else {
                //Hide if not relevant ON, you arent fishing
                seaCreatureHourData.Hidden = true
                guiManager.updateElementData("SeaCreatureHour", seaCreatureHourData)
            }
        }
    }



    if (settings().bobberUIToggle){
        BobberCount = 0;
        let playercoords = [Player.getX(), Player.getY(), Player.getZ()];
        World.getAllEntitiesOfType(Bobber).forEach(bobber => {
            let coords = [bobber.getX(), bobber.getY(), bobber.getZ()];
            for (index = 0; index < 3; index++) {
                if (Math.abs(coords[index] - playercoords[index]) > 30){
                    return;
                }
            };
            BobberCount += 1;
        });

        //Bobbin Render
        let BobberData = guiManager.getElementData("BobberCount")
        BobberData.Data["(1)"] = BobberCount
        if(!settings().generalHideUIToggle) {
            //Hide if not relevant OFF
            BobberData.Hidden = false
            guiManager.updateElementData("BobberCount", BobberData)
        }
        else if (BobberCount > 0 || (Date.now() - seaCreatureData.CATCHES["LastCatch"] < 60000*settings().seacreatureHourResetTime)) {
            //Hide if not relevant ON, you are Fishing
            BobberData.Hidden = false
            guiManager.updateElementData("BobberCount", BobberData)
        }
        else {
            //Hide if not relevant ON, you arent fishing
            BobberData.Hidden = true
            guiManager.updateElementData("BobberCount", BobberData)
        }
    }
}).setFps(settings().seaCreaturePollingrate);

register('command', () => {
    seaCreatureData.CATCHES["LastCatch"] = 0;
}).setName("rfuresetsch");

const doubleHookMessages = /Double Hook\!|It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!/;

let indexmsg = 0;
let dhmsglist = [''];
let DoubleHook = false;
register('chat', (event) => {
    if(settings().creatureDhHideToggle) cancel(event);
    if(settings().doubleHookMessageToggle){
        if(settings().doubleHookMessage.includes('|')){
            dhmsgBase = funniFaces(settings().doubleHookMessage)
            if(settings().doubleHookMessage.includes('([random])' || (settings().doubleHookRandomToggle))){
                dhmsgBase = dhmsgBase.replace('([random])', '');
                if(dhmsgBase.endsWith("|")){
                    dhmsgBase = dhmsgBase.slice(0, -1);
                }
                if(dhmsgBase.startsWith("|")){
                    dhmsgBase = dhmsgBase.slice(1);
                }
                if(dhmsgBase.includes('|')){
                    dhmsglist = dhmsgBase.split("|");
                    dhmsg = dhmsglist[getRandomInt(dhmsglist.length)];
                }
                else{
                    dhmsg = dhmsgBase;
                }
            }
            else{
                if(dhmsgBase.endsWith("|")){
                    dhmsgBase = dhmsgBase.slice(0, -1);
                }
                if(dhmsgBase.startsWith("|")){
                    dhmsgBase = dhmsgBase.slice(1);
                }
                if(dhmsgBase.includes('|')){
                    dhmsglist = dhmsgBase.split("|");
                    dhmsg = dhmsglist[indexmsg];
                    if(dhmsglist.length-1 == indexmsg){
                        indexmsg = 0;
                    }
                    else{
                        indexmsg++;
                    }
                }
                else {
                    dhmsg = dhmsgBase;
                }
            }
        }
        else{
            dhmsg = funniFaces(settings().doubleHookMessage).replace('([random])', '');
        }
        if (dhmsg != ''){
            sendMsg(dhmsg);
        }
        else {
            ChatLib.chat("&5[&b&lRFU&5] &4&lYour double hook message is blank! (only you can see this)");
        }
    }   
    DoubleHook = true;
}).setCriteria(doubleHookMessages);

const catchMessages = makeRegexFromList(seaCreatureMessages, true);
let NoMoveCount = 1;
let lastFacing = [-500,-500];
register('chat', (message, event) => {
    catchMessages.lastIndex = 0;
    if(catchMessages.test(message)){
        if(settings().creatureDhHideToggle) cancel(event);
        if(Player.getYaw() == lastFacing[0] && Player.getPitch() == lastFacing[1]) {
            NoMoveCount += 1;
        }
        else {
            lastFacing = [Player.getYaw(), Player.getPitch()];
            NoMoveCount = 1;
        }
        if(NoMoveCount > 7) {
            Client.showTitle("&c&lMove Camera!", "&f&lor you wont catch any creatures :/", settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
        }
        if(playerData.SETTINGS["WarnBait"]) {
            if(!playerData.SETTINGS["BaitBag"]) {
                Client.showTitle("&c&lYou have baits OFF", "&8/rfutogglebag to toggle this", settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
            }
        }
        if(Date.now() - seaCreatureData.CATCHES["LastCatch"] < 60000*settings().seacreatureHourResetTime){
            seaCreatureData.CATCHES["LastCatch"] = Date.now();
            if (DoubleHook){
                seaCreatureData.CATCHES["ThisCatches"] += 2;
                DoubleHook = false;
            }
            else{
                seaCreatureData.CATCHES["ThisCatches"] += 1;
            }
        }
        else {
            seaCreatureData.CATCHES["FirstCatch"] = Date.now();
            seaCreatureData.CATCHES["LastCatch"] = Date.now();
            if (DoubleHook){
                seaCreatureData.CATCHES["ThisCatches"] = 2;
                DoubleHook = false;
            }
            else {
                seaCreatureData.CATCHES["ThisCatches"] = 1;
            }
        }
    }
}).setCriteria("${message}");

const getTextureFromEntity = (entity) => entity.getEntity()?.func_82169_q(3)?.func_77978_p()?.toString()?.match(/(ewogICJ0aW1lc3RhbXAiIDogMT(Y2MjY4Mjc|cxOTg1MDQ)[\w= ]+)/)?.[1]
const flaresTextures = [
    //Alert Flare Texture
    "ewogICJ0aW1lc3RhbXAiIDogMTcxOTg1MDQzMTY4MywKICAicHJvZmlsZUlkIiA6ICJmODg2ZDI3YjhjNzU0NjAyODYyYTM1M2NlYmYwZTgwZiIsCiAgInByb2ZpbGVOYW1lIiA6ICJOb2JpbkdaIiwKICAic2lnbmF0dXJlUmVxdWlyZWQiIDogdHJ1ZSwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzlkMmJmOTg2NDcyMGQ4N2ZkMDZiODRlZmE4MGI3OTVjNDhlZDUzOWIxNjUyM2MzYjFmMTk5MGI0MGMwMDNmNmIiLAogICAgICAibWV0YWRhdGEiIDogewogICAgICAgICJtb2RlbCIgOiAic2xpbSIKICAgICAgfQogICAgfQogIH0KfQ==",
    //SOS Flare Texture
    "ewogICJ0aW1lc3RhbXAiIDogMTY2MjY4Mjc3NjUxNiwKICAicHJvZmlsZUlkIiA6ICI4YjgyM2E1YmU0Njk0YjhiOTE0NmE5MWRhMjk4ZTViNSIsCiAgInByb2ZpbGVOYW1lIiA6ICJTZXBoaXRpcyIsCiAgInNpZ25hdHVyZVJlcXVpcmVkIiA6IHRydWUsCiAgInRleHR1cmVzIiA6IHsKICAgICJTS0lOIiA6IHsKICAgICAgInVybCIgOiAiaHR0cDovL3RleHR1cmVzLm1pbmVjcmFmdC5uZXQvdGV4dHVyZS9jMDA2MmNjOThlYmRhNzJhNmE0Yjg5NzgzYWRjZWYyODE1YjQ4M2EwMWQ3M2VhODdiM2RmNzYwNzJhODlkMTNiIiwKICAgICAgIm1ldGFkYXRhIiA6IHsKICAgICAgICAibW9kZWwiIDogInNsaW0iCiAgICAgIH0KICAgIH0KICB9Cn0="
]
//Thx DocilElm for this ^

let Flare = false;
let FlareSent = true;
let FlareTimeInt = 0;
let FlareTimeUUID = '';
let flareTime = "No Flare";
let Bonus = 0;
let FlareCoords = [];
const timerRegex = /^(\d\.\d)|(!!!)$/;
let Timer = ''
let FoundFireWork = false;
register('step', () => {
    if(settings().flareToggle) {
        foundflare = false;
        World.getAllEntitiesOfType(ArmorStand).forEach(mob => {
            if(getTextureFromEntity(mob)?.startsWith("ewogICJ0aW1lc3RhbXAiIDogMT")) {
                if (FlareTimeUUID == mob.getUUID()) {
                    Flare = true;
                    FlareSent = false;
                    FlareCoords[0] = mob.x;
                    FlareCoords[1] = mob.y;
                    FlareCoords[2] = mob.z;
                    if(getTextureFromEntity(mob) == flaresTextures[0]){
                        Bonus = 0.5;
                    }
                    if(getTextureFromEntity(mob) == flaresTextures[1]){
                        Bonus = 1.25;
                    }
                    FlareTimeInt = 180000-mob.getTicksExisted()/20*1000;
                    if (FlareTimeInt > 0) {
                        flareTime = readableTime(FlareTimeInt);
                    }
                    else {
                        flareTime = 'Ending Soon'
                    }
                    foundflare = true;
                } 
                else if (FlareTimeUUID == '') {
                    FlareTimeUUID = mob.getUUID();
                    Flare = true;
                    FlareSent = false;
                    FlareCoords[0] = mob.x;
                    FlareCoords[1] = mob.y;
                    FlareCoords[2] = mob.z;
                    if(getTextureFromEntity(mob) == flaresTextures[0]){
                        Bonus = 0.5;
                    }
                    if(getTextureFromEntity(mob) == flaresTextures[1]){
                        Bonus = 1.25;
                    }
                    FlareTimeInt = 180000-mob.getTicksExisted()/20*1000;
                    if (FlareTimeInt > 0) {
                        flareTime = readableTime(FlareTimeInt);
                    }
                    else {
                        flareTime = 'Ending Soon'
                    }
                    foundflare = true;
                }
                if(180000-mob.getTicksExisted()/20*1000 > FlareTimeInt) {
                    FlareTimeUUID = mob.getUUID();
                    Flare = true;
                    FlareSent = false;
                    FlareCoords[0] = mob.x;
                    FlareCoords[1] = mob.y;
                    FlareCoords[2] = mob.z;
                    if(getTextureFromEntity(mob) == flaresTextures[0]){
                        Bonus = 0.5;
                    }
                    if(getTextureFromEntity(mob) == flaresTextures[1]){
                        Bonus = 1.25;
                    }
                    FlareTimeInt = 180000-mob.getTicksExisted()/20*1000;
                    if (FlareTimeInt > 0) {
                        flareTime = readableTime(FlareTimeInt);
                    }
                    else {
                        flareTime = 'Ending Soon'
                    }
                    foundflare = true;
                }
            }
        });
        if(!foundflare) {
            Flare = false;
            flareTime = "No Flare";
            FlareTimeInt = 0;
            FlareTimeUUID = '';
            Bonus = 0;
            if(!FlareSent){
                FlareSent = true;
                FoundFireWork = false;
                World.getAllEntitiesOfType(Firework).forEach(Firework => {
                    FoundFireWork = true;
                })
                World.getAllEntitiesOfType(ArmorStand).forEach(armorStand => {
                    if(getTextureFromEntity(armorStand)?.startsWith("ewogICJ0aW1lc3RhbXAiIDogMT")) {
                        FoundFireWork = true;
                    }
                })
                if(!FoundFireWork) {
                    if(FlareCoords.length > 0) {
                        if(Player.asPlayerMP() != null) {
                            if(Player.asPlayerMP().distanceTo(FlareCoords[0], FlareCoords[1], FlareCoords[2]) < 40) {
                                if (settings().flareMessageToggle) {
                                    sendMsg(funniFaces(settings().deployableMessage.replace("([deployable])", "Flare")));
                                }
                                if (settings().flareTitleToggle){                    
                                    flareTitle = `${funniFaces(settings().flareTitleMessage)}`;
                                    Client.showTitle(flareTitle, "", settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                                }
                                if (settings().deployableSoundToggle){     
                                    World.playSound(settings().deployableSound, settings().deployableSoundVolume, settings().deployableSoundPitch/100);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (settings().flareTimerToggle && settings().flareToggle) {
        //Flare Render
        let flareData = guiManager.getElementData("FlareTimer")
        flareData.Data["(1)"] = flareTime
        flareData.Data["(2)"] = (Bonus > 0 ? `&b${Bonus*100}%` : "")
        if(!settings().deployableHideToggle) {
            //Hide if not relevant OFF
            flareData.Hidden = false
            guiManager.updateElementData("FlareTimer", flareData)
        }
        else if(flareTime != "No Flare"){
            //Hide if not relevant ON, if there is a flare
            flareData.Hidden = false
            guiManager.updateElementData("FlareTimer", flareData)
        }
        else {
            //Hide if not relevant ON, if there isnt a flare
            flareData.Hidden = true
            guiManager.updateElementData("FlareTimer", flareData)
        }
    }
    if(settings().rodTimerToggle) {
        foundTimer = false
        World.getAllEntitiesOfType(ArmorStand).forEach(mob => {
            Mob = mob.getName().replace(colorsRegex, '');
            timerRegex.lastIndex = 0;
            if(timerRegex.test(Mob)) {
                Timer = Mob;
                foundTimer = true;
            }
        });
        if(!foundTimer) {
            Timer = '';
        }

        //Rod Timer Render
        let rodTimerData = guiManager.getElementData("RodTimer")
        let rodTexts = settings().rodTimerUI.split("|");
        if(Timer == '!!!') {
            rodTimerData.Text = funniFaces((rodTexts[1]).replace("([time])", ` `))
        }
        else if((/\d\.\d/).test(Timer)){
            rodTimerData.Text = funniFaces((rodTexts[0]).replace("([time])", `${Timer}`));
        }
        else {
            rodTimerData.Text = ""
        }
        guiManager.updateElementData("RodTimer", rodTimerData)
    }
}).setFps(15);

register("renderEntity", (entity, pos, partialTick, event) => {
    if(entity != null) {
        if(entity.getClassName() == "EntityArmorStand") {
            if(entity.name != null && playerData.GUI["Toggle"]) {
                if ((/^(§e§l\d\.\d)|(§c§l!!!)$/).test(entity?.name) && settings().rodTimerToggle) {
                    cancel(event);
                }
            }
        }
    }
})

register('chat', () => {
    if(settings().flareToggle) {
        Flare = false;
        flareTime = "No Flare";
        FlareSent = true;
        if (settings().flareMessageToggle) {
            sendMsg(funniFaces(settings().deployableMessage.replace("([deployable])", "Flare")));
        }
        if (settings().flareTitleToggle){                    
            flareTitle = `${funniFaces(settings().flareTitleMessage)}`;
            Client.showTitle(flareTitle, "", settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
        }
        if (settings().deployableSoundToggle){     
            World.playSound(settings().deployableSound, settings().deployableSoundVolume, settings().deployableSoundPitch/100);
        }
    }
}).setCriteria("Your flare disappeared because you were too far away!");

register("chat", () => {
    playerData.SETTINGS["BaitBag"] = true;
}).setCriteria("Use Baits From Bag is now enabled!");

register("chat", () => {
    playerData.SETTINGS["BaitBag"] = false;
}).setCriteria("Use Baits From Bag is now disabled!");

register('command', () => {
    playerData.SETTINGS["WarnBait"] = !playerData.SETTINGS["WarnBait"];
    ChatLib.chat("&5[&b&lRFU&5]&f Warn bag toggled!");
}).setName("rfutogglebag");



const ImportantDrops = {"Enchanted Book":[0,0],
                        "Slug Boots":[15,5000], 
                        "Moogma Leggings":[20,10000],
                        "Flaming Chestplate":[25,25000],
                        "Taurus Helmet":[30,50000],
                        "Staff of the Volcano": [10,5000],
                        "Blade of the Volcano": [10,5000],
                        "Attribute Shard": [0,0],
                        "Pitchin' Koi":[0, 22222]};

function InventoryDebrief() {
    player = Player.asPlayerMP()
    if(player != null) {
        Inventario = Player.getInventory().getItems().filter((item) => item != null);
    }
    else {
        return
    }
    inv = Inventario.map((item) => {
        itemTemp = undefined;
        Object.keys(ImportantDrops).forEach(drop => {
            if(item.getName().includes(drop)) {
                itemTemp = item;
            }
        })
        return itemTemp;    
    }).filter((item) => item != undefined);
    EssenceCount = inv.map((item) => {
        countTemp = 0;
        Object.keys(ImportantDrops).forEach(drop => {
            if(item.getName().includes(drop)) {
                countTemp = ImportantDrops[drop][0]
            }
        })
        return countTemp;
    }).reduce((total, current) => total + current, 0);
    NpcCount = inv.map((item) => {
        countTemp = 0;
        Object.keys(ImportantDrops).forEach(drop => {
            if(item.getName().includes(drop)) {
                countTemp = ImportantDrops[drop][1]
            }
        })
        return countTemp;
    }).reduce((total, current) => total + current, 0);
    bfmfPieces = 0;
    bfPieces = 0;
    mffePieces = 0;
    mfPieces = 0;
    bffePieces = 0;
    fePieces = 0;
    flash = 0;
    charm = 0;
    feShard = 0;
    bfShard = 0
    inv.forEach((item) => {
        lore = item.getLore().reduce((all, now) => all + `\n${now}`, ``);
        if(lore.includes("Blazing Fortune I") && lore.includes("Magic Find I")) {
            bfmfPieces += 1
        }
        else if(lore.includes("Blazing Fortune I") && lore.includes("Fishing Experience I")) {
            bffePieces += 1
        }
        else if(lore.includes("Fishing Experience I") && lore.includes("Magic Find I")) {
            mffePieces += 1
        }
        else if(lore.includes("Blazing Fortune I")) {
            if(item.getName() != "§fAttribute Shard") {
                bfPieces += 1
            }
            else {
                bfShard += 1
            }
        }
        else if(lore.includes("Magic Find I") && item.getName() != "§fAttribute Shard") {
            mfPieces += 1
        }
        else if(lore.includes("Fishing Experience I")) {
            if(item.getName() != "§fAttribute Shard") {
                fePieces += 1
            }
            else {
                feShard += 1
            }
        }
        else if(lore.includes("Flash")) {
            flash += 1;
        }
        else if(lore.includes("Charm")) {
            charm += 1;
        }
    })
    if(EssenceCount > 0){
        ChatLib.chat(`&c&lCrimson Essence if everything salvaged: &f&l${readableQuantity(EssenceCount)}`);
    }
    if(NpcCount > 0){
        ChatLib.chat(`&6&lCoins if everything NPC sold: &f&l${readableQuantity(NpcCount)}`);
    }
    if (bfmfPieces > 0) {
        ChatLib.chat(`&b&lBf &9&lMf &f&lPieces: ${readableQuantity(bfmfPieces)}`);
    }
    if (bffePieces > 0) {
        ChatLib.chat(`&b&lBf &3&lFe &f&lPieces: ${readableQuantity(bffePieces)}`);
    }
    if (mffePieces > 0) {
        ChatLib.chat(`&9&lMf &3&lFe &f&lPieces: ${readableQuantity(mffePieces)}`);
    }
    if (bfPieces > 0) {
        ChatLib.chat(`&b&lBf &6&lonly &f&lPieces: ${readableQuantity(bfPieces)}`);
    }
    if (mfPieces > 0) {
        ChatLib.chat(`&9&lMf &6&lonly &f&lPieces: ${readableQuantity(mfPieces)}`);
    }
    if (fePieces > 0) {
        ChatLib.chat(`&3&lFe &6&lonly &f&lPieces: ${readableQuantity(fePieces)}`);
    }
    if (bfShard > 0) {
        ChatLib.chat(`&b&lBf &f&lattribute shards: ${readableQuantity(bfShard)}`);
    }
    if (feShard > 0) {
        ChatLib.chat(`&3&lFe &f&lattribute shards: ${readableQuantity(feShard)}`);
    }
    if (flash > 0) {
        ChatLib.chat(`&d&lFlash &f&lbooks: ${readableQuantity(flash)}`);
    }
    if (charm > 0) {
        ChatLib.chat(`&6&lCharm &f&lbooks: ${readableQuantity(charm)}`);
    }
}

let FullInvSent = false;
register('step', () => {
    if(playerData.SETTINGS["Inventory"]) {
        player = Player.asPlayerMP()
        if(player != null) {
            Inventario = Player.getInventory().getItems().filter((item) => item != null);
            armor = [];
            for (i = 1; i<=4; i++) {
                armorPiece = player.getItemInSlot(i)
                if (armorPiece != null) {
                    armor.push(armorPiece);
                }
            }
            if(Inventario.length >= 36 + armor.length){ // Change back to 36
                if(!FullInvSent) {
                    ChatLib.chat("&3&l------------------------------------------")
                    ChatLib.chat("&5[&b&lRFU&5]&c&l Inventory Full!")
                    InventoryDebrief();
                    ChatLib.chat("&3&l------------------------------------------")
                    ChatLib.chat("&8&l/rfutoggleinventory to disable this.")
                    FullInvSent = true;
                }
            }
            else {
                FullInvSent = false;
            }
        }
    }
}).setFps(1);

const magicFindRegex = /Magic Find (I|II|III|IV|V|VI|VII|VIII|IX|X|1|2|3|4|5|6|7|8|9|10)/
const ImportantDropsRender = {"Enchanted Book":[0,0],
                        "Slug Boots":[15,5000], 
                        "Moogma Leggings":[20,10000],
                        "Flaming Chestplate":[25,25000],
                        "Taurus Helmet":[30,50000],
                        "Staff of the Volcano": [10,5000],
                        "Blade of the Volcano": [10,5000],
                        "Attribute Shard": [0,0],
                        "Pitchin' Koi":[0, 22222],
                        "Thunderbolt Necklace": [0, 0],
                        "Thunder Helmet": [0, 0],
                        "Thunder Chestplate": [0, 0],
                        "Thunder Leggings": [0, 0],
                        "Thunder Boots": [0, 0],
                        "Magma Lord Helmet": [0, 0],
                        "Magma Lord Chestplate": [0, 0],
                        "Magma Lord Leggings": [0, 0],
                        "Magma Lord Boots": [0, 0]};

register('renderslot', (slot, gui, event) => {
    if(settings().renderItems) {
        if(slot != null) {
            item = slot.getItem()
            if (item != null) {
                piece = false
                Object.keys(ImportantDropsRender).forEach(drop => {
                    if(item.getName().includes(drop)) {
                        piece = true
                    }
                })
                if(piece) {
                    lore = item.getLore().reduce((all, now) => all + `\n${now}`, ``);
                    magicFindRegex.lastIndex = 0;
                    if(!lore) return
                    if(lore.includes("Blazing Fortune") && magicFindRegex.test(lore)) {
                        if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 225, 255, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                        ItemText = new Text(`&b&lBf &3&lMf`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                        ItemText.draw();
                    }
                    else if(lore.includes("Fishing Experience") && lore.includes("Magic Find")) {
                        if(lore.includes("Blazing Fortune")) {
                            if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 150, 200, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                            ItemText = new Text(`&b&lBf &9&lFe`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                            ItemText.draw();
                        }
                        else if(magicFindRegex.test(lore)){
                            if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 150, 200, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                            ItemText = new Text(`&3&lMf &9&lFe`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                            ItemText.draw();
                        }
                        else {
                            if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 75, 145, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                            ItemText = new Text(`&9&lFe`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                            ItemText.draw();
                        }
                    }
                    else if(lore.includes("Magic Find")) {
                        if(lore.includes("Blazing Fortune")) {
                            if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 225, 255, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                            ItemText = new Text(`&b&lBf`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                            ItemText.draw();
                        }
                        else if(magicFindRegex.test(lore)){
                            if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 225, 255, 50), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                            ItemText = new Text(`&3&lMf`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                            ItemText.draw();
                        }
                    }
                    else if(lore.includes("Fishing Experience")) {
                        if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(0, 75, 145, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                        ItemText = new Text(`&9&lFe`, slot.getDisplayX()+2, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                        ItemText.draw();
                    }
                    else if(lore.includes("Flash")) {
                        level = lore.split("Flash ")[1].split("\n")[0];
                        if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(255, 255, 255, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                        ItemText = new Text(`Flash ${level}`, slot.getDisplayX()+1, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                        ItemText.draw();
                    }
                    else if(lore.includes("Charm")) {
                        level = lore.split("Charm ")[1].split("\n")[0];
                        if(settings().renderItemsBg) Renderer.drawRect(Renderer.color(255, 166, 0, 100), slot.getDisplayX(), slot.getDisplayY(), 16, 16);
                        ItemText = new Text(`Charm ${level}`, slot.getDisplayX()+1, slot.getDisplayY()+15).setShadow(true).setScale(0.4);
                        ItemText.draw();
                    }
                }
            }
        }
    }
})

register('command', () => {
    playerData.SETTINGS["Inventory"] = !playerData.SETTINGS["Inventory"];
    ChatLib.chat("&5[&b&lRFU&5] &fInventory debrief messages toggled.")
}).setName("rfutoggleinventory");

register('command', () => {
    ChatLib.chat("&3&l------------------------------------------")
    InventoryDebrief()
    ChatLib.chat("&3&l------------------------------------------")
}).setName("rfuinventory");

register('chat', (event) => {
    cancel(event)
    now = Date.now();
    Client.showTitle("&9&lThunder Bottle Full", `Took ${readableTime(now-playerData.FISHING["Tbottle"])}`, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
    ChatLib.chat(`&e> Your bottle of thunder has fully charged! (${readableTime(now-playerData.FISHING["Tbottle"])})`);
    playerData.FISHING["Tbottle"] = now;
}).setCriteria("> Your bottle of thunder has fully charged!");
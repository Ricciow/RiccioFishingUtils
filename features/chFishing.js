import settings from "../settings/settings";
import { playerData } from "../data/data";
import { readableTime, funniFaces } from "../utils/functions";
import guiManager from "../gui/guiManager";
import ChatUtils from "../utils/ChatUtils";

//CRYSTAL HOLLOWS

// WORMS
let aliveWorms = 0;
let MsgSent = false;
let TitleSent = false;
let TotemActive = false;
let TotemSent = true;
let PlayWormSound = false;
let totemCoords = []
let totemTime = 'No Totem'
register('step', () =>{
    aliveWorms = 0;
    TotemActive = false;
    if (settings().totemToggle || settings().wormToggle) {
        World.getAllEntities().forEach(mob => {
            //Detect Worms
            if(mob.name.includes('Flaming Worm')){ 
                aliveWorms += 1;
            }
            else if (mob.name.includes('Poisoned Water Worm')||mob.name.includes('Water Worm')){
                aliveWorms += 1;
            }
            //Detect Totem
            if (mob.name.includes("Totem of Corruption")){
                totemCoords[0] = mob.x;
                totemCoords[1] = mob.y;
                totemCoords[2] = mob.z;
                TotemActive = true;
                TotemSent = false;
            }
            if(mob.x == totemCoords[0] && mob.z == totemCoords[2]){                 // Check if it is totem timer coords
                if(mob.y < totemCoords[1]+1 && mob.y > totemCoords[1]-1) {          // Check if it is near enough height
                    if(mob.name.includes("Remaining:")){                            // Check if it is the timer
                        if (mob.name.split(" ")[2] != undefined) {
                            totemTime = `${mob.name.split(" ")[1]} ${mob.name.split(" ")[2]}`;
                        }
                        else {
                            totemTime = `${mob.name.split(" ")[1]}`;
                        }
                    }
                }
            }
        });
    }
    else {
        if(MsgSent) MsgSent = false;
        if(TitleSent) TitleSent = false;
        if(TotemActive) TotemActive = false;
        if(!TotemSent) TotemSent = true;
        if(PlayWormSound) PlayWormSound = false;
        if(totemTime != 'No Totem') totemTime = 'No Totem';
    }
    if(!TotemActive && !TotemSent && settings().totemToggle){ // Totem Expired Message
        if(Player.asPlayerMP() != null){
            if(Player.asPlayerMP().distanceTo(totemCoords[0], totemCoords[1], totemCoords[2]) < 27) {
                if (settings().totemMessageToggle) {
                    ChatUtils.sendMsg(funniFaces(settings().deployableMessage.replace("([deployable])", "Totem")));
                }
                if (settings().totemTitleToggle){                     // Totem Title message
                    TotemTitle = `${funniFaces(settings().totemTitleMessage)}`;
                    Client.showTitle(TotemTitle, "", settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                }
                if (settings().deployableSoundToggle){                     // Totem sound
                    World.playSound(settings().deployableSound, settings().deployableSoundVolume, settings().deployableSoundPitch/100);
                }
            }
            totemTime = 'No Totem';
            TotemSent = true;
        }
    }
    if (settings().wormToggle){
        now = Date.now();
        if (settings().wormMessageToggle) {
            if (aliveWorms >= settings().wormLimit && !MsgSent){
                CapMessage = `${funniFaces(settings().wormMessage)}`;
                CapMessage = CapMessage.replace("([number])", `${aliveWorms}`);
                CapMessage = CapMessage.replace("([time])", `${readableTime(now - playerData.WORM["Timer"])}`);
                ChatUtils.sendMsg(CapMessage);
                MsgSent = true;
            }
            else if (aliveWorms <= Math.floor(settings().wormLimit/2) && MsgSent){
                MsgSent = false;
                playerData.WORM["Timer"] = now;
            }
        }
        if (settings().wormTitleToggle){
            if (aliveWorms >= settings().wormTitleLimit && !TitleSent){
                // Main Title
                wormTitleMessage = `${funniFaces(settings().wormTitleMessage)}`;
                wormTitleMessage = wormTitleMessage.replace("([number])", `${aliveWorms}`);
                wormTitleMessage = wormTitleMessage.replace("([time])", `${readableTime(now - playerData.WORM["TTimer"])}`);
                // Subtitle
                wormSubTitleMessage = `${funniFaces(settings().wormTitleMessageSubtitle)}`;
                wormSubTitleMessage = wormSubTitleMessage.replace("([number])", `${aliveWorms}`);
                wormSubTitleMessage = wormSubTitleMessage.replace("([time])", `${readableTime(now - playerData.WORM["TTimer"])}`);
                Client.showTitle(wormTitleMessage, wormSubTitleMessage, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                TitleSent = true;
            }
            else if (aliveWorms <= Math.floor(settings().wormTitleLimit/2) && TitleSent){
                TitleSent = false;
                playerData.WORM["TTimer"] = now;
            }
        }
        if (settings().wormSoundToggle){
            if (aliveWorms >= settings().wormSoundLimit && !PlayWormSound){
                PlayWormSound = true;
            }
            else if (aliveWorms <= Math.floor(settings().wormSoundLimit/2) && PlayWormSound){
                PlayWormSound = false;
            }
        }
    }
    if (settings().totemTimerToggle && settings().totemToggle) {
        //Totem Render
        let totemData = guiManager.getElementData("TotemTimer")
        totemData.Data["(1)"] = totemTime
        if(!settings().deployableHideToggle) {
            //Hide if not relevant OFF
            totemData.Hidden = false
            guiManager.updateElementData("TotemTimer", totemData)
        }
        else if (totemTime != "No Totem") {
            //Hide if not relevant ON, if there is a totem
            totemData.Hidden = false
            guiManager.updateElementData("TotemTimer", totemData)
        }
        else {
            //Hide if not relevant ON, if there isnt a totem
            totemData.Hidden = true
            guiManager.updateElementData("TotemTimer", totemData)
        }
    }

}).setFps(settings().chPollingrate);

register('step', () => {
    if (PlayWormSound && !playerData.GENERALFISHING["Sound"]){
        World.playSound(settings().wormSound, settings().wormSoundVolume, settings().wormSoundPitch/100);
    }
    else if(playerData.GENERALFISHING["Sound"] && !PlayWormSound){
        World.playSound(settings().seaCreatureSound, settings().seaCreatureSoundVolume, settings().seaCreatureSoundPitch/100);
    }
    else if (playerData.GENERALFISHING["Sound"] && PlayWormSound){
        World.playSound(settings().seaCreatureSound, settings().seaCreatureSoundVolume, settings().seaCreatureSoundPitch/100);
    }
}).setFps(8);

register("renderEntity", (entity, pos, partialTick, event) => {
    if(settings().wormNametagToggle) {
        if(entity != null) {
            if(entity.name != null && Player != null) {
                if(entity.name.includes("Flaming Worm" || entity.name.includes("Water Worm"))) {
                    cancel(event);
                }
            }
        }
    }
})
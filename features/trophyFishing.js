import settings from "../settings/settings";
import RenderLib from "../../RenderLib"
import { seaCreatureData , playerData} from "../data/data";
import guiManager from "../gui/guiManager";

let x = 0;
let y = 0;
let z = 0;
let render = false;
register('playerinteract', (action, position, event) => {
    if(Player.asPlayerMP() != null){
        if (action.toString() == 'RIGHT_CLICK_BLOCK' && Player.asPlayerMP().getDimension() == -1){
            if(World.getBlockAt(position.x, position.y, position.z).type.getName() == 'Sponge') {
                if(render == false){
                    x = position.x;
                    y = position.y;
                    z = position.z;
                    render = true;
                }
                else{
                    if(x == position.x && y == position.y && z == position.z){
                        render = false;
                    }
                    else {
                        x = position.x;
                        y = position.y;
                        z = position.z;
                    }
                }
            }
        }
    }
});

register('renderWorld', () => {
    if(Player.asPlayerMP() != null){
        if (render == true && settings().sulphurRightClickToggle && Player.asPlayerMP().getDimension() == -1){
            RenderLib.drawEspBox(x+0.5, y-4, z+0.5, 9, 9, 1, 1, 0, 1, false);
        }
    }
});

register('worldunload', () => {
    render = false;
})

register('command', () => {
    render = false;
}).setName("disablesulphurrange")


let goldenFishData = {
    startTime: 564004800000,        // Start Time
    lastCast: 564004800000,         // Last Cast
    cooking: false,                 // Timer Active
    rodCast: false,                 // Rod Cast
    golding: false                  // Golden Fish Spawned
}

const timeToReset = 8 * 60 * 1000   //8 minutes
const timeToCast = 3 * 60 * 1000    //3 minutes
const timeToAlert = 30 * 1000       //30s

register("step", () => {
    if(settings().goldenTimerToggle) {
        if(Player.asPlayerMP()?.getDimension() == -1){
            now = Date.now();
            if(!goldenFishData.golding) {
                if (Player.getPlayer().field_71104_cf) {
                    if(now - goldenFishData.lastCast > timeToCast || goldenFishData.cooking == false) {
                        goldenFishData.startTime = now;
                    }
                    if(!goldenFishData.rodCast) {
                        goldenFishData.lastCast = now;
                    }
                    goldenFishData.rodCast = true
                    goldenFishData.cooking = true;
                }
                else {
                    if (now - goldenFishData.lastCast > timeToCast) {
                        goldenFishData.cooking = false;
                    }
                    goldenFishData.rodCast = false
                }
            }
        }

        //? Golden Fish Render
        let goldenFishUI = guiManager.getElementData("GoldenFishTimer")
        if(goldenFishData.cooking && !goldenFishData.golding) {
            let time = timeToReset + goldenFishData.startTime;
            let timeCast = timeToCast + goldenFishData.lastCast;

            logicalTime = time - Date.now()
            logicalTimeCast = timeCast - Date.now()

            if(logicalTime > 0) {
                goldenFishUI.Times["(1)"] = time
            }
            else {
                goldenFishUI.Times["(1)"] = ["&c&lSpawnable Now"]
            }

            if (logicalTimeCast > timeToAlert) {
                goldenFishUI.Times["(2)"] = timeCast
            }
            else {
                goldenFishUI.Times["(2)"] = ["&c&lCast NOW!"]
            }
            
        }
        
        if(goldenFishData.golding) {
            goldenFishUI.Times["(1)"] = ["&c&lGo get NOW!"]
            goldenFishUI.Times["(2)"] = ["3m 0s"]
        }
        else if(!goldenFishData.cooking) {
            goldenFishUI.Times["(1)"] = ["8m 0s"]
            goldenFishUI.Times["(2)"] = ["3m 0s"]
        }

        if(!settings().trophyHideUIToggle) {
            //Hide if not relevant OFF
            goldenFishUI.Hidden = false
            guiManager.updateElementData("GoldenFishTimer", goldenFishUI)
        }
        else if(goldenFishData.cooking && timeToCast-(Date.now()-goldenFishData.lastCast) > 0 && (Player.asPlayerMP()?.getDimension() == -1)) {
            //Hide if not relevant ON, you are Fishing, You are in the crimson isle
            goldenFishUI.Hidden = false
            guiManager.updateElementData("GoldenFishTimer", goldenFishUI)
        }
        else {
            //Hide if not relevant ON, you arent fishing in ci
            goldenFishUI.Hidden = true
            guiManager.updateElementData("GoldenFishTimer", goldenFishUI)
        }
    } 
}).setFps(6)

register("chat", () => {
    goldenFishData.golding = true;
}).setCriteria("You spot a Golden Fish surface from beneath the lava!")

register("chat", (rarity) => {
    goldenFishData.golding = false;
    goldenFishData.cooking = false;
}).setCriteria("TROPHY FISH! You caught a Golden Fish ${rarity}.")

register("chat", (rarity) => {
    goldenFishData.golding = false
    goldenFishData.cooking = false;
}).setCriteria("The Golden Fish swims back beneath the lava...")

register("worldunload", () => {
    goldenFishData.golding = false
    goldenFishData.cooking = false;
});
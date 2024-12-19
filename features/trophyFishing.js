import settings from "../utils/settings";
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
        if (render == true && settings.sulphurRightClickToggle && Player.asPlayerMP().getDimension() == -1){
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


register("step", () => {
    if(settings.goldenTimerToggle) {
        if(Player.asPlayerMP() != null){
            if(Player.asPlayerMP().getDimension() == -1){
                now = Date.now();
                if(!Golding) {
                    if (Player.getPlayer().field_71104_cf) {
                        if(now - seaCreatureData.GOLDEN["LastCast"] > 180000 || seaCreatureData.GOLDEN["Cooking"] == false) {
                            seaCreatureData.GOLDEN["StartTime"] = now;
                        }
                        seaCreatureData.GOLDEN["LastCast"] = now;
                        seaCreatureData.GOLDEN["Cooking"] = true;
                    }
                    else if (now - seaCreatureData.GOLDEN["LastCast"] > 180000) {
                        seaCreatureData.GOLDEN["Cooking"] = false;
                    }
                }
            }
        }

        //Golden Fish Render
        //TODO: Modify this thing whenever i add a function for this on the library
        let GoldenFishData = guiManager.getElement("GoldenFishTimer").data
        if(seaCreatureData.GOLDEN["Cooking"] && !Golding) {
            time = 480000 + seaCreatureData.GOLDEN["StartTime"];
            timeCast = 180000 + seaCreatureData.GOLDEN["LastCast"];

            logicalTime = time - Date.now()
            logicalTimeCast = timeCast - Date.now()

            if(logicalTime > 0) {
                GoldenFishData.Times["(1)"] = time
            }
            else {
                GoldenFishData.Times["(1)"] = ["&c&lSpawnable Now"]
            }

            if (!Player.getPlayer().field_71104_cf && logicalTimeCast > 30000) {
                GoldenFishData.Times["(2)"] = timeCast
            }
            else if(logicalTimeCast <= 30000) {
                GoldenFishData.Times["(2)"] = ["&c&lCast NOW!"]
            }
            else {
                GoldenFishData.Times["(2)"] = ["&a&lCasting"]
            }
            
        }
        
        if(Golding) {
            GoldenFishData.Times["(1)"] = ["&c&lGo get NOW!"]
            GoldenFishData.Times["(2)"] = ["3m 0s"]
        }
        else if(!seaCreatureData.GOLDEN["Cooking"]) {
            GoldenFishData.Times["(1)"] = ["8m 0s"]
            GoldenFishData.Times["(2)"] = ["3m 0s"]
        }

        if(!settings.trophyHideUIToggle) {
            //Hide if not relevant OFF
            GoldenFishData.Hidden = false
            guiManager.updateElementData("GoldenFishTimer", GoldenFishData)
        }
        else if(!seaCreatureData.GOLDEN["Cooking"] && 180000-(Date.now()-seaCreatureData.GOLDEN["LastCast"]) > 0 && (Player.asPlayerMP()?.getDimension() == -1)) {
            //Hide if not relevant ON, you are Fishing, You are in the crimson isle
            GoldenFishData.Hidden = false
            guiManager.updateElementData("GoldenFishTimer", GoldenFishData)
        }
        else {
            //Hide if not relevant ON, you arent fishing in ci
            GoldenFishData.Hidden = true
            guiManager.updateElementData("GoldenFishTimer", GoldenFishData)
        }
    } 
}).setFps(3)

let Golding = false;
register("chat", () => {
    Golding = true;
}).setCriteria("You spot a Golden Fish surface from beneath the lava!")

register("chat", (rarity) => {
    Golding = false;
    seaCreatureData.GOLDEN["Cooking"] = false;
}).setCriteria("TROPHY FISH! You caught a Golden Fish ${rarity}.")

register("chat", (rarity) => {
    Golding = false
    seaCreatureData.GOLDEN["Cooking"] = false;
}).setCriteria("The Golden Fish swims back beneath the lava...")

register("worldunload", () => {
    Golding = false
    seaCreatureData.GOLDEN["Cooking"] = false;
});
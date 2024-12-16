import settings from "../utils/settings";
import RenderLib from "../../RenderLib"
import { createText } from "../utils/gui";
import { readableTime } from "../utils/functions";
import { seaCreatureData , playerData} from "../data/data";

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


register("renderoverlay", () => {
    if(playerData.GUI["Toggle"]){
        if(!settings.trophyHideUIToggle) {
            if(settings.goldenTimerToggle) {
                if(seaCreatureData.GOLDEN["Cooking"] && !Golding) {
                    time = 480000 - (Date.now() - seaCreatureData.GOLDEN["StartTime"]);
                    timeCast = 180000-(Date.now()-seaCreatureData.GOLDEN["LastCast"]);
                    if(time > 0) {
                        if (!Player.getPlayer().field_71104_cf && timeCast > 30000) {
                            createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(time)}\n&6Cast until: &e${readableTime(timeCast)}`, "GoldenFish", 3, 200);
                        }
                        else if(timeCast <= 30000) {
                            createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(time)}\n&6Cast until: &c&lCast NOW!`, "GoldenFish", 3, 200);
                        }
                        else {
                            createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(time)}\n&a&lCasting`, "GoldenFish", 3, 200);
                        }
                    }
                    else {
                        if (!Player.getPlayer().field_71104_cf && timeCast > 30000) {
                            createText(`&e&lGolden Fish\n&c&lSpawnable Now\n&6Cast until: &e${readableTime(timeCast)}`, "GoldenFish", 3, 200);
                        }
                        else if(timeCast <= 30000) {
                            createText(`&e&lGolden Fish\n&c&lSpawnable Now\n&6Cast until: &c&lCast NOW!`, "GoldenFish", 3, 200);
                        }
                        else {
                            createText(`&e&lGolden Fish\n&c&lSpawnable Now\n&a&lCasting`, "GoldenFish", 3, 200);
                        }
                    }
                }
                else if(Golding) {
                    createText(`&e&lGolden Fish\n&c&lGo get NOW!\n&6Cast until: &e${readableTime(180000)}`, "GoldenFish", 3, 200);
                }
                else if(!seaCreatureData.GOLDEN["Cooking"]) {
                    createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(480000)}\n&6Cast until: &e${readableTime(180000)}`, "GoldenFish", 3, 200);
                }
            }
        }
        else {
            if(settings.goldenTimerToggle) {
                if(seaCreatureData.GOLDEN["Cooking"] && !Golding) {
                    time = 480000 - (Date.now() - seaCreatureData.GOLDEN["StartTime"]);
                    timeCast = 180000-(Date.now()-seaCreatureData.GOLDEN["LastCast"]);
                    if(time > 0) {
                        if (!Player.getPlayer().field_71104_cf && timeCast > 30000) {
                            createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(time)}\n&6Cast until: &e${readableTime(timeCast)}`, "GoldenFish", 3, 200);
                        }
                        else if(timeCast <= 30000) {
                            createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(time)}\n&6Cast until: &c&lCast NOW!`, "GoldenFish", 3, 200);
                        }
                        else {
                            createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(time)}\n&a&lCasting`, "GoldenFish", 3, 200);
                        }
                    }
                    else {
                        if (!Player.getPlayer().field_71104_cf && timeCast > 30000) {
                            createText(`&e&lGolden Fish\n&c&lSpawnable Now\n&6Cast until: &e${readableTime(timeCast)}`, "GoldenFish", 3, 200);
                        }
                        else if(timeCast <= 30000) {
                            createText(`&e&lGolden Fish\n&c&lSpawnable Now\n&6Cast until: &c&lCast NOW!`, "GoldenFish", 3, 200);
                        }
                        else {
                            createText(`&e&lGolden Fish\n&c&lSpawnable Now\n&a&lCasting`, "GoldenFish", 3, 200);
                        }
                    }
                }
                else if(Golding) {
                    createText(`&e&lGolden Fish\n&c&lGo get NOW!\n&6Cast until: &e${readableTime(180000)}`, "GoldenFish", 3, 200);
                }
                else if(!seaCreatureData.GOLDEN["Cooking"] && 180000-(Date.now()-seaCreatureData.GOLDEN["LastCast"]) > 0) {
                    createText(`&e&lGolden Fish\n&6Next Spawn: &e${readableTime(480000)}\n&6Cast until: &e${readableTime(180000)}`, "GoldenFish", 3, 200);
                }
                else {
                    createText("", "GoldenFish", 3, 200, false, `&e&lGolden Fish\n&6Next Spawn: &e${readableTime(480000)}\n&6Cast until: &e${readableTime(180000)}`);
                }
            }
        }
    }
})
import settings from "../settings/settings";
import { Bobber, colorsRegex } from "../data/constants";
import { playerName , DeathSound} from "../data/constants";
import RenderLib from "../../RenderLib"

var fishermanData = {
    "FISHINGPLAYERS": {

    }
};

register('step', () =>{
    if (settings().fishermanTrackingToggle) {
        World.getAllPlayers().forEach(player => {
            if (player.getItemInSlot(0) != null && player.getDimension() == -1) {
                if(player.getItemInSlot(0).getID() == 346) {
                    if(player.getItemInSlot(1) != null ? !player.getItemInSlot(1).getName().includes('Hunter') : false) {
                        World.getAllEntitiesOfType(Bobber).forEach(bobber => {
                            if(bobber.distanceTo(player) <= 10){
                                if (player.getName() != playerName){
                                    fishermanData.FISHINGPLAYERS[player.getName().toLowerCase()] = [Math.round(player.getX()), Math.round(player.getY()), Math.round(player.getZ())];
                                }
                            }
                        })  
                    }              
                }
            }
        });
    }
}).setFps(1);

let LastCoords = 0;
let foundcoords = false;
let renderlist = [];
register('chat', (player, mob) => {
    foundcoords = false;
    if(settings().fishermanTrackingToggle && player != playerName) {
        if ((mob == 'Thunder' && settings().thunderDeathWarnToggle)||(mob == 'Lord Jawbus' && settings().jawbusDeathWarnToggle)){
            if(Date.now()-LastCoords > settings().deathWarnCooldown * 1000) {
                if (settings().deathWarnCoordsToggle) {
                    Object.keys(fishermanData.FISHINGPLAYERS).forEach(fisherman =>{
                        if(fisherman == player.toLowerCase()){
                            Client.showTitle(`&4&l${player} died to ${mob}`, `&fx:${fishermanData.FISHINGPLAYERS[fisherman][0]}, y:${fishermanData.FISHINGPLAYERS[fisherman][1]}, z:${fishermanData.FISHINGPLAYERS[fisherman][2]}`, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                            ChatLib.chat(`&4&l${player} died to ${mob} \nLast seen fishing at &fx:${fishermanData.FISHINGPLAYERS[fisherman][0]}, y:${fishermanData.FISHINGPLAYERS[fisherman][1]}, z:${fishermanData.FISHINGPLAYERS[fisherman][2]}`);
                            if(settings().deathWarnRenderToggle) {
                                renderlist.push([player, [fishermanData.FISHINGPLAYERS[fisherman][0],fishermanData.FISHINGPLAYERS[fisherman][1],fishermanData.FISHINGPLAYERS[fisherman][2]], Date.now()])
                                LastCoords = Date.now();
                            }
                            foundcoords = true;
                        }
                    })
                    if (!foundcoords) {
                        ChatLib.chat(`&4&l${player} died to ${mob} &f\nNo Known Coords`);
                        Client.showTitle(`&4&l${player} died to ${mob}`, `&fNo Known Coords`, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                        LastCoords = Date.now();
                    }
                }
                else {
                    Client.showTitle(`&4&l${player} died to ${mob}`, ``, settings().titleFadeIn, settings().titleDuration, settings().titleFadeOut);
                    LastCoords = Date.now();
                    }
                if(settings().deathWarnSoundToggle){
                    try {
                        DeathSound.setVolume(settings().deathWarnSoundVolume).play();
                    }
                    catch (error) {
                        console.log("Sound playing no workie, prob sounds refreshed\n", error);
                    }
                }
            }
        }
    }
}).setCriteria(' ☠ ${player} was killed by ${mob}.');

register('renderWorld', () => {
    if(renderlist.length > 0){
        let i = 0;
        renderlist.forEach(render => {
            Tessellator.drawString(`${render[0]}`, render[1][0], render[1][1]+2, render[1][2]);
            RenderLib.drawEspBox(render[1][0],render[1][1],render[1][2],1,1,0,0,1,0.5,true);
            RenderLib.drawInnerEspBox(render[1][0],render[1][1],render[1][2],1,1,0,0,1,0.5,true);
            if(Date.now() - render[2] > settings().renderDuration*1000 || Player.asPlayerMP().distanceTo(render[1][0],render[1][1],render[1][2]) < 5) {
                renderlist.splice(i,1);
            }
            i++;
        })
    }
});

register('command', (name = '') => {
    name = name.toLowerCase();
    if (settings().fishermanTrackingToggle) {
        if (name != '') {
            if (Object.keys(fishermanData.FISHINGPLAYERS).includes(name)) {
                Msg = new TextComponent(`&9&lLast known &e&l${name} &9&lcoords: &f&lx:${fishermanData.FISHINGPLAYERS[name][0]}, y:${fishermanData.FISHINGPLAYERS[name][1]}, z:${fishermanData.FISHINGPLAYERS[name][2]} \n&a&l[Click to render]`).setClickAction('run_command').setClickValue(`/rfurendercoords ${fishermanData.FISHINGPLAYERS[name][0]} ${fishermanData.FISHINGPLAYERS[name][1]} ${fishermanData.FISHINGPLAYERS[name][2]} ${name}`).setHoverAction("show_text").setHoverValue("Click to render the coords");
                ChatLib.chat(Msg);
            }
            else if (name != undefined) {
                ChatLib.chat('No Known coords for that player');
            }
            else {
                ChatLib.chat("correct usage: /fisherman name");
            }
        }
        else {
            ChatLib.chat("You didnt insert a name!");
        }
    }
    else {
        ChatLib.chat("You have fisherman tracking off!");
    }
}).setName("rfufisherman");

let Lastdelete = 0;
register('command', () => {
    if (Date.now()-Lastdelete > 30000) {
        ChatLib.chat("&4&lAre you sure you want to delete all fisherman data? &e&l/deletefishermandata &4&lwithin &e&l30s &4&lagain to confirm.");
        Lastdelete = Date.now();
    }
    else {
        Object.keys(fishermanData.FISHINGPLAYERS).forEach(player => {
            delete fishermanData.FISHINGPLAYERS[player];
        })
        ChatLib.chat("&a&lData deleted.");
        Lastdelete = 0;
    }
}).setName("rfudeletefishermandata");

register('command', (name = '') => {
    if (settings().fishermanTrackingToggle) {
        if (name != '') {
            if (name.toLowerCase() != playerName.toLowerCase()){
                fishermanData.FISHINGPLAYERS[name.toLowerCase()] = [Math.round(Player.getX()), Math.round(Player.getY()), Math.round(Player.getZ())];
            }
            else {
                ChatLib.chat("You cannot add urself!!!");
            }
        }
        else {
            ChatLib.chat("You didnt insert a name!");
        }
    }
    else {
        ChatLib.chat("You have fisherman tracking off!");
    }
}).setName("rfuaddfisherman");

const numbers = /-?\d+|~/
register('command', (x, y, z, name = '') => {
    if (numbers.test(x) && numbers.test(y) && numbers.test(z)) {
        if(x.startsWith("~")) x = Math.round(Player.getX()) + ((parseFloat(x.split("~")[1])) ? (parseFloat(x.split("~")[1])) : 0);
        if(y.startsWith("~")) y = Math.round(Player.getY())+ ((parseFloat(y.split("~")[1])) ? (parseFloat(y.split("~")[1])) : 0);
        if(z.startsWith("~")) z = Math.round(Player.getZ()) + ((parseFloat(z.split("~")[1])) ? (parseFloat(z.split("~")[1])) : 0);
        ChatLib.chat(`x:${x}, y:${y}, z:${z}`);
        if (name == '') name = `x:${x}, y:${y}, z:${z}` ;
        console.log(name, [parseFloat(x),parseFloat(y),parseFloat(z)]);
        renderlist.push([name, [parseFloat(x),parseFloat(y),parseFloat(z)], Date.now()]);
        ChatLib.chat("Coords Rendered!");
    }
    else {
        ChatLib.chat("Invalid Coords!");
    }
}).setName("rfurendercoords");

const coordsRegex = /.+:.*-?\d+\.?\d*(, | |\|){1}.{0,5}-?\d+\.?\d*(, | |\|).{0,5}-?\d+\.?\d*/
const numberRegex = /-?\d+\.?\d*/g

register("chat", (event) => {
    if(settings().renderChatCoords) {
        let name = ''
        coords = ChatLib.getChatMessage(event).replace(colorsRegex, "");
        coordsRegex.lastIndex = 0;
        if(coordsRegex.test(coords) && !coords.startsWith("Guild >")) {
            coords = coords.match(numberRegex);
            let i = 0;
            if(numberRegex.test(ChatLib.getChatMessage(event).replace(colorsRegex, "").split(":")[0])) {
                i = ChatLib.getChatMessage(event).replace(colorsRegex, "").split(":")[0].match(numberRegex).length;
            }
            x = coords[i];
            i++
            y = coords[i];
            i++
            z = coords[i];
            name = `x:${x}, y:${y}, z:${z}` ;
            renderlist.push([name, [parseFloat(x),parseFloat(y),parseFloat(z)], Date.now()]);
            ChatLib.chat("&5[&b&lRFU&5] &f&lCoords recieved rendered.\n&8&lMay not render properly if too far :(");
        }
    }
})

register('command', () => {
    renderlist = [];
}).setName("rfuunrendercoords");

register("worldunload", () => {
    renderlist = [];
});
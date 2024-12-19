import { playerData } from "../data/data"
import { funniFaces } from "../utils/functions";
import { colorsRegex } from "../data/constants";
import settings from "../utils/settings";
import guiManager from "../gui/guiManager";

const gdragskinRegex = /Lvl \d{1,3}] \[\d+✦/g
const petnameRegex = / §.+$/
register('chat', (level, pet, event) =>{
    Msg = ChatLib.getChatMessage(event).replace("§cAutopet §eequipped your ", "").replace("§e! §a§lVIEW RULE", "");
    petnameRegex.lastIndex = 0;
    Msg = petnameRegex.exec(Msg).toString();
    if (gdragskinRegex.test(level)) {
        Msg = Msg.replace(/ §8\[§6\d+§8§4✦§8\]/, "").replace(" §", "&");
        playerData.PETS['CosmeticLevel'] = parseInt(level.replace(/(Lvl )|]|\[|✦/g, "").split(" ")[1]);
        playerData.PETS['PetLevel'] = parseInt(level.replace(/(Lvl )|]|\[|✦/g, "").split(" ")[0]);
        playerData.PETS['Skinned'] = true;
    }
    else {
        Msg = Msg.replace(" §", "&");
        playerData.PETS['PetLevel'] = parseInt(level.replace("Lvl ", ""));
        playerData.PETS['Skinned'] = false;
    }
    playerData.PETS['EquippedPet'] = Msg;
}).setCriteria("Autopet equipped your [${level}] ${pet}! VIEW RULE");

register('chat', (pet, level) =>{
    level = parseInt(level);
    if(((playerData.PETS['PetLevel'] + 1 == level || level > 200) && playerData.PETS['EquippedPet'].includes(pet))) {
        if (level <= 200) {
            playerData.PETS['PetLevel'] = level;
        }
        else {
            playerData.PETS['CosmeticLevel'] = level - 200;
        }
    }
    if(settings.petTitleToggle) {
        if(level >= settings.petTitleLimit){
            petTitle = funniFaces(settings.petTitleMessage).replace("([level])", level).replace("([pet])", pet);
            Client.showTitle(petTitle, "", settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
        }
    }
}).setCriteria("Your ${pet} leveled up to level ${level}!");

register('chat', (pet) =>{
    playerData.PETS['Skinned'] = false;
    playerData.PETS['PetLevel'] = 0;
    playerData.PETS['EquippedPet'] = "None";
}).setCriteria("You despawned your ${pet}!");

const LvlRegex = /\[Lvl \d+]/;
const coloredLvlRegex = /§\w\[Lvl \d+] /;
const CosmLvlRegex = /\[\d+✦]/;
const coloredCosmLvlRegex = /§\w\[§\w\d+§\w§\w✦§\w\] /;

register('guimouseclick', (x,y,button,gui,event) => {
    if(Player != null) {
        container = Player.getContainer()
        if(container != null) {
            if((/Pets \(\d\/\d\)/).test(container.getName())) {
                slot = Client.currentGui.getSlotUnderMouse();
                if(slot != null) {
                    item = slot.getItem();
                    if(item != null){
                        if(item.getID() == 397 && !item.getName().includes("Autopet")) {
                            try {
                                itemName = item.getName();
                                pet = itemName.replace(colorsRegex, "");;
                                itemName = itemName.replace(coloredLvlRegex, "");
                                CosmeticLevel = null;
                                LvlRegex.lastIndex = 0;
                                Level = parseInt(LvlRegex.exec(pet).toString().split("Lvl ")[1]);
                                CosmLvlRegex.lastIndex = 0;
                                if(CosmLvlRegex.test(pet)) {
                                    itemName = itemName.replace(coloredCosmLvlRegex, "");
                                    CosmLvlRegex.lastIndex = 0;
                                    CosmeticLevel = parseInt(CosmLvlRegex.exec(pet).toString().split("[")[1]);
                                }
                                if(CosmeticLevel) {
                                    CosmLvlRegex.lastIndex = 0;
                                    playerData.PETS['CosmeticLevel'] = CosmeticLevel;
                                    playerData.PETS['Skinned'] = true;
                                }
                                else {
                                    LvlRegex.lastIndex = 0;
                                    playerData.PETS['Skinned'] = false;
                                }
                                activePet = itemName.replace("§", "&");
                                playerData.PETS['PetLevel'] = Level;
                                playerData.PETS['EquippedPet'] = activePet;
                            }
                            catch (error) {
                                console.log("Pet click didnt work, maybe /neucustomize?", error);
                            }
                        }
                    }
                }
            }
        }
    }
});

register('step', () => {
    if (settings.petDisplayToggle) {
        //Pets Render
        //TODO: Modify this thing whenever i add a function for this on the library
        let petData = guiManager.getElement("PetDisplay").data

        petData.Data["(1)"] = playerData.PETS['PetLevel']
        petData.Data["(2)"] = playerData.PETS['Skinned'] ? `&8[&6${playerData.PETS['CosmeticLevel']}&4✦&8] ` : ""
        petData.Data["(3)"] = playerData.PETS['EquippedPet']

        guiManager.updateElementData("PetDisplay", petData)
    }
}).setFps(5)
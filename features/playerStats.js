import settings from "../utils/settings";
import { colorsRegex } from "../data/constants";
import { funniFaces } from "../utils/functions";

const manaRegex = /[0-9]{0,3},?[0-9]{0,3}\/[0-9]{0,3},?[0-9]{0,3}✎/g;
let ManaText = '';
let ManaMax = 100;
let ManaCurrent = 100;
let manaSent = true;
let ManaPercentage = 1;
register('actionbar', (bar) => {
    ActionBar = ChatLib.getChatMessage(bar).replace(colorsRegex, "");
    if (manaRegex.test(ActionBar)){
        manaRegex.lastIndex = 0;
        ManaText = manaRegex.exec(ActionBar).toString();
        ManaMax = parseInt(ManaText.replace(/,|✎/g, '').split("/")[1]);
        ManaCurrent = parseInt(ManaText.replace(/,|✎/g, '').split("/")[0]);
        ManaPercentage = ManaCurrent/ManaMax;
        if(settings.manaWarnPercentage < ManaPercentage){
            manaSent = false;
        }
    }
    if (settings.manaTitleToggle && settings.manaWarnPercentage > ManaPercentage && !manaSent){
        manaTitle = `${funniFaces(settings.manaTitleMessage)}`;
        Client.showTitle(manaTitle, "", settings.titleFadeIn, settings.titleDuration, settings.titleFadeOut);
        manaSent = true;
    }
});

//✎
import settings from "../settings/settings"
import { playerName } from "../data/constants";
import { playerData , seaCreatureData } from "../data/data";

export function removeRankTag(ign){
    ign = ign.replace("[VIP] ", "");
    ign = ign.replace("[VIP+] ", "");
    ign = ign.replace("[MVP] ", "");
    ign = ign.replace("[MVP+] ", "");
    ign = ign.replace("[MVP++] ", "");
    return ign
}

export function checkIfUser(ign){
    if(ign?.toLowerCase() == playerName.toLowerCase()){
        return true
    }
    return false
}

export function removeFromArray(array, item) {
    array.splice(array.indexOf(item), 1)
}

export function checkBlacklist(ign){
    let Blacklisted = false;
    ign = removeRankTag(ign);
    settings().partyBlacklist.replace(" ", "").split(",").forEach(name => {
        if (ign.toLowerCase() == name.toLowerCase() || checkIfUser(ign)){
            Blacklisted = true;
        }
    });
    return Blacklisted;
}

export function readableQuantity(quantity) {
    if (quantity < 1000){
        return `${quantity}`;
    }
    Trillions = Math.floor(quantity / 1000000000000);
    quantity -= Trillions*1000000000000;
    Billions = Math.floor(quantity / 1000000000);
    quantity -= Billions*1000000000;
    Millions = Math.floor(quantity / 1000000);
    quantity -= Millions*1000000;
    Thousands = quantity / 1000;
    ReadableQuantityMsg = '';
    if(Trillions > 0) {
        ReadableQuantityMsg += `${Trillions}t `
    }
    if(Billions > 0) {
        ReadableQuantityMsg += `${Billions}b `
    }
    if(Millions > 0) {
        ReadableQuantityMsg += `${Millions}m `
    }
    if(Thousands > 0) {
        ReadableQuantityMsg += `${Thousands}k`
    }
    return ReadableQuantityMsg;
}

export function readableTime(time, fractionalSeconds = false){
    if (time < 1000 && !fractionalSeconds){
        return `${time/1000}s`;
    }
    if(!fractionalSeconds) {
        time = Math.floor(time/1000);
    }
    else {
        time = time/1000;
    }
    Years = Math.floor(time / 31536000);
    time -= Years*31536000;
    Months = Math.floor(time/2628000);
    time -= Months*2628000;
    Weeks = Math.floor(time/ 604800);
    time -= Weeks*604800;
    Days = Math.floor(time / 86400);
    time -= Days*86400;
    Hours = Math.floor(time/3600);
    time -= Hours*3600;
    Minutes = Math.floor(time/60);
    time -= Minutes*60;
    Seconds = time;
    ReadableTimeMsg = '';
    if (Years > 1){
        ReadableTimeMsg += `${Years}Years `;
    }
    else if (Years > 0){
        ReadableTimeMsg += `${Years}Year `;
    }
    if (Months > 1){
        ReadableTimeMsg += `${Months}Months `;
    }
    else if (Months > 0) {
        ReadableTimeMsg += `${Months}Month `;
    }
    if (Weeks > 1){
        ReadableTimeMsg += `${Weeks}Weeks `;
    }
    else if (Weeks > 0) {
        ReadableTimeMsg += `${Weeks}Week `;
    }
    if (Days > 0){
        ReadableTimeMsg += `${Days}d `;
    }
    if (Hours > 0){
        ReadableTimeMsg += `${Hours}h `;
    }
    if (Minutes > 0){
        ReadableTimeMsg += `${Minutes}m `;
    }
    if(!fractionalSeconds) {
        ReadableTimeMsg += `${Seconds}s`;
    }
    else {
        ReadableTimeMsg += Seconds.toFixed(2) + "s";
    }
    return ReadableTimeMsg;
}

export function funniFaces(text){
    text = text.replace("([lineskip])", '\n');
    settings().FunMessages.split('|').forEach(face => {
        key = face.split(',')[0];
        door = face.split(',')[1];
        text = text.replace(`([${key}])`, `${door}`);
    });
    return text;
}

export function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "<"+result+">";
  }

export function makeRegexFromList(list, exact = false) {
    list = list.join('|').toString();
    if (exact){
        list = '^(' + list + ')$';
    }
    list = list.replace(/\./g, '\\.');
    list = list.replace(/\?/g, '\\?');
    list = list.replace(/\!/g, '\\!');
    return new RegExp(list, `g`);
}

export function getAverageFromList(list) {
    if(list.length > 0){
        sum = 0;
        list.forEach(value => {
            sum += value;
        });
        average = sum/list.length;
        return Math.ceil(average);
    }
    else {
        return 0;
    }
}
//['Party', 'Guild', 'AllChat', 'Party/Local','Local', 'Coop']
export function sendMsg(text, chat = settings().ChatSelected) {
    switch (chat) {
        case 0:
            if (playerData.PARTY['inParty']) {
                ChatLib.command('pc '+text);
            }
            break;
        case 1:
            ChatLib.command('gc '+text);
            break;
        case 2:
            text += ` ${generateRandomString()}`;
            text = "ac " + text;
            ChatLib.command(text);
            break;
        case 3:
            playerData.PARTY['inParty'] ? ChatLib.command('pc '+text) : ChatLib.chat(text);
            break;
        case 4:
            ChatLib.chat(text);
            break;
        case 5:
            ChatLib.command('cc '+text);
            break;
        default:
            ChatLib.command(text);
    }
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function TransferMixendData(List) {
    seaCreatureData.DROPS["RadioactiveVial"] = List[0];
    seaCreatureData.DROPS["RadioactiveVialTime"] = List[1];
    List[2].forEach(vial => {
        seaCreatureData.DROPS["VialHistory"].push([vial, 0]);
    });
    seaCreatureData.CRIMSON["PlhlegblastCount"] = List[3];
    seaCreatureData.CRIMSON["PlhlegblastTime"] = List[4];
    seaCreatureData.CRIMSON["PlhegblastAllCount"] = [];
    seaCreatureData.CRIMSON["JawbusCount"] = List[5];
    seaCreatureData.CRIMSON["JawbusTime"] = List[6];
    seaCreatureData.CRIMSON["JawbusAllCount"] = List[7];
    seaCreatureData.CRIMSON["ThunderCount"] = List[8];
    seaCreatureData.CRIMSON["ThunderTime"] = List[9];
    seaCreatureData.CRIMSON["ThunderAllCount"] = List[10];
    seaCreatureData.save();
}

export function getVialAverage() {
    let drops = seaCreatureData.DROPS["VialHistory"]
    let sum = drops.reduce((accumulator, current) => accumulator + current[0], 0)
    let average = sum/(drops.length > 0 ? drops.length : 1)
    return Math.ceil(average)
}

//Thx to Bloom
const triggers = []
export function registerWhen(triggertype, func, checkFunc) {
    let trigger = register(triggertype, func)
    triggers.push([trigger.unregister(), checkFunc])
    return trigger
}

register("tick", () => {
    triggers.forEach(([trigger, func]) => {
        if (func()) {
            trigger.register()
        }
        else {
            trigger.unregister()
        }
    })
})

export function splitMsg(msg, size) {
    const split = msg.match(new RegExp(`.{1,${size}}`, "g"));

    if (!split) return [];
    if (split.length === 1) return split;

    return split;
}

export function sendPartyMessage(message) {
    let splitted = splitMsg(message, 97)
    let timeout = 0
    splitted.forEach((message) => {
        setTimeout(() => {
            ChatLib.command(`pc ${message}`);
        }, timeout);
        timeout += 250
    })
}
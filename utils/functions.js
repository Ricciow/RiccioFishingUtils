import settings from "../settings/settings"
import { playerName } from "../data/constants";
import { seaCreatureData } from "../data/data";

export function removeRankTag(ign){
    if(!ign) return ""
    ign = ign.replace("[VIP] ", "");
    ign = ign.replace("[VIP+] ", "");
    ign = ign.replace("[MVP] ", "");
    ign = ign.replace("[MVP+] ", "");
    ign = ign.replace("[MVP++] ", "");
    return ign
}

/**
 * Tries to find the username on a string by checking minecraft's username character rules
 * @param {string} ign 
 * @returns {string} Found username
 */
export function clearUsername(ign) {
    ign = ign.split(" ").find((name) => /^[a-z_0-9]{3,16}$/ig.test(name))
    return ign??""
}

export function checkIfUser(ign){
    if(!ign) return false
    ign = clearUsername(ign)
    if(ign.toLowerCase() == playerName.toLowerCase()){
        return true
    }
    return false
}

export function removeFromArray(array, item) {
    array.splice(array.indexOf(item), 1)
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

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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

/**
 * Gets the lore of an item without messing up skyhanni.
 * @param {Item} item 
 */
export function getLore(item) {
    return item.getNBT().toObject().tag.display.Lore
}
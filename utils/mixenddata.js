import { seaCreatureData } from '../data/data.js';
import { TransferMixendData } from './functions.js';
import { readableTime } from './functions.js';
let moduleMixend;
try {
    moduleMixend = require('./../../MixendMod/utils/data.js');
} catch (error) {
    console.log('[RFU] MixendMod not installed. (No need to import) /rfutransfermixenddata disabled.');
}

if (moduleMixend) {
    let ListMixend = [];
    register("command", () => {
        ListMixend.push(moduleMixend.playerData["Radioactive Vial"]["current_count"]);
        ListMixend.push(moduleMixend.playerData["Radioactive Vial"]["time_drop"]);
        ListMixend.push(moduleMixend.playerData["Radioactive Vial"]["count_to_drop"]);
        ListMixend.push(moduleMixend.playerData.COUNTER["plhlegblast"]+1);
        ListMixend.push(moduleMixend.playerData.TIME["plhlegblast"]);
        ListMixend.push(moduleMixend.playerData.COUNTER["lord_jawbus"]+1);
        ListMixend.push(moduleMixend.playerData.TIME["lord_jawbus"]);
        ListMixend.push(moduleMixend.playerData.AVG_DATA["lord_jawbus"]);
        ListMixend.push(moduleMixend.playerData.COUNTER["thunder"]+1);
        ListMixend.push(moduleMixend.playerData.TIME["thunder"]);
        ListMixend.push(moduleMixend.playerData.AVG_DATA["thunder"]);
        TransferMixendData(ListMixend);

        ChatLib.chat("Data Transfered!");
        ChatLib.chat(`Vial Counter: ${seaCreatureData.DROPS["RadiactiveVial"]}`);
        ChatLib.chat(`Last Vial: ${readableTime(Date.now()-seaCreatureData.DROPS["RadiactiveVialTime"])}`);
        ChatLib.chat(`Jawbus Counter: ${seaCreatureData.CRIMSON["JawbusCount"]}`);
        ChatLib.chat(`Last Jawbus: ${readableTime(Date.now()-seaCreatureData.CRIMSON["JawbusTime"])}`);
        ChatLib.chat(`Thunder Counter: ${seaCreatureData.CRIMSON["ThunderCount"]}`);
        ChatLib.chat(`Last Thunder: ${readableTime(Date.now()-seaCreatureData.CRIMSON["ThunderTime"])}`);
    }).setName("rfutransfermixenddata");
}
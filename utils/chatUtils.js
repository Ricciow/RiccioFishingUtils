import partyTracker from "../features/chatCommands/partyTracker";

export default class ChatUtils {
    /**
     * Sends a message on a specific chat or the settings, default chat
     * @param {string} text 
     * @param {string} chat Party Guild AllChat Party/Local Local Coop
     */
    static sendMsg(text, chat = settings().ChatSelected) {
        switch (chat) {
            case 0:
                if (partyTracker.inParty) {
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
                partyTracker.inParty ? ChatLib.command('pc '+text) : ChatLib.chat(text);
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
}


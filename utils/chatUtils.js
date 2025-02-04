import partyTracker from "../features/chatCommands/partyTracker";
import settings from "../settings/settings";
import StringUtils from "./StringUtils";

export default class ChatUtils {

    static messageQueue = []        //Queue for messages
    static sendingMessages = false  //Message Sender state
    static lastMessage = 0          //Time last message was sent
    static messageCooldown = 250    //Minimum cooldown in ms for messages to be sent

    static chats = {
        partychat: "pc",
        guildchat: "gc",
        allchat: "ac",          
        partylocalchat: "ploc",      //Party if inside a party, local if not
        localchat: "loc",
        coopchat: "cc",
        officerchat: "oc",
        defaultchat: "df",      //No chat selected, use the one already selected
        
        //For the settings().chatSelected
        0: "pc",
        1: "gc",
        2: "ac",
        3: "ploc",
        4: "loc",
        5: "cc",
        6: "oc"
    }

    /**
     * Sends a message on a specific chat or the settings, default chat
     * @param {string} text 
     * @param {string} chat Party Guild AllChat Party/Local Local Coop
     */
    static sendMsg(message, chat) {
        if(!chat) {
            chat = ChatUtils.chats[settings().ChatSelected]
        }

        if(chat == ChatUtils.chats.allchat) {
            message += StringUtils.generateRandomString()
        }

        let splitted = StringUtils.splitString(message, settings().chatSlice ? 253 : 97)
        splitted.forEach(message => {
            ChatUtils.addMessageToQueue(message, chat)
        });
    }

    /**
     * Sends a message in party chat.
     * @param {str} message 
     */
    static sendPartyMessage(message) {
        ChatUtils.sendMsg(message, ChatUtils.chats.partychat)
    }

    /**
     * 
     * @param {string} message 
     * @param {string} chat 
     */
    static addMessageToQueue(message, chat) {
        ChatUtils.messageQueue.push([message, chat])
        if(!ChatUtils.sendingMessages) {
            ChatUtils.sendingMessages = true
            ChatUtils._sendMessages()
        }
    }

    /**
     * Sends the messages in the messageQueue, meant for internal use
     */
    static _sendMessages() {
        let timeout = ChatUtils.messageCooldown
        
        if(Date.now() - this.lastMessage >= ChatUtils.messageCooldown) {
            //Send Message if minimum time was met
            ChatUtils._sendMessage(...(ChatUtils.messageQueue.shift()??[]))
        }
        else {
            //Modify Timeout to fit cooldown Time
            timeout = ChatUtils.messageCooldown - (Date.now() - this.lastMessage)
        }

        if(ChatUtils.messageQueue.length > 0) {
            setTimeout(() => {
                ChatUtils._sendMessages()
            }, timeout);
            return
        }

        ChatUtils.sendingMessages = false
    }

    /**
     * Sends a message in a specified Chat, meant for internal use
     * @param {string} message 
     * @param {string} chat    ChatUtils.chat
     * @returns 
     */
    static _sendMessage(message, chat = undefined) {
        if(!message) return

        if(chat) {
            if(chat == ChatUtils.chats.partylocalchat) {
                partyTracker.inParty ? ChatLib.command("pc " + message) : ChatLib.chat(message)
                return
            }
            if(chat == ChatUtils.chats.localchat) {
                ChatLib.chat(message)
                return
            }
            if(chat == ChatUtils.chats.partychat) {
                partyTracker.inParty ? ChatLib.command(chat + " " + message) : false
                return
            }
            if(chat == ChatUtils.chats.defaultchat) {
                ChatLib.say(message)
                return
            }
            ChatLib.command(chat + " " + message)
            return
        }
    }
}

register("messageSent", (message, event) => {
    if(message.startsWith("/") && !Object.values(ChatUtils.chats).includes(message.slice(1,3))) return
    ChatUtils.lastMessage = Date.now()
})
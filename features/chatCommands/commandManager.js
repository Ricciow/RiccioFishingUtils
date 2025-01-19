import settings from "../../settings/settings";
import partyTracker from "./partyTracker";
import { removeRankTag } from "../../utils/functions";
import { playerName } from "../../data/constants";
import { registerWhen } from "../../utils/functions";

/**
 * Verifies if a player is in the chat Commands blacklist
 * @param {str} username 
 * @returns {boolean}
 */
function verifyBlacklist(username) {
    return (settings().partyBlacklist?.split(",")?.find(blacklisted => blacklisted === removeRankTag(username)) ? true : false);
}

class commandManager {
    constructor() {
        this.commands = [];
        this.lastTrigger = 0;

        registerWhen('chat', (name, message, event) => {
            if(name.includes(":")) {
                tempName = name.split(": ");
                name = tempName.shift();
                message = tempName.reduce((accumulator, currentValue) => accumulator + currentValue + ": ", "") + message;
            }
            this.verifyCommand(removeRankTag(name), message)
        },
        () => settings().partyCommands
        ).setCriteria("Party > ${name}: ${message}");
    }

    /**
     * Verifies if the command is one of the existing commands and sends it to the execution
     * @param {string} name Player who triggered the command
     * @param {string} message Message from the player
     */
    verifyCommand(name, message) {
        if(message.startsWith(settings().partyPrefix)) {
            parameters = message.split(" ")
            commandText = parameters?.shift()?.substr(1)?.toLowerCase()
            command = this.commands.find(({ triggers }) => triggers?.some(trigger => trigger === commandText));
            if(command) this.executeCommand(name, command, parameters);
        }
    }

    /**
     * Verifies if the cooldown is over
     * @returns {boolean}
     */
    shouldRun() {
        now = Date.now()
        result = now > (this.lastTrigger + settings().partyCooldown * 1000)
        if(result) this.lastTrigger = now
        return result
    }

    /**
     * Checks for blacklist, leaderonly/memberOnly/selfTrigger conditions
     * @param {String} name Player who triggered the command
     * @param {string} command Command triggered
     * @param {Array} parameters Parameters sent in
     */
    executeCommand(name, command, parameters) {
        if(!verifyBlacklist(name) && this.shouldRun() && command.checkFunc()) {
            //Verify selfTrigger
            if((!command.selfTrigger && name != playerName) || command.selfTrigger) {
                timeout = 0;
                if(command.selfTrigger && name == playerName) timeout = 100; 
                setTimeout(() => {
                    //Verify memberOnly and LeaderOnly
                    if((command.leaderOnly && partyTracker.isLeader) || (command.memberOnly && !partyTracker.isLeader) || (!command.memberOnly && !command.leaderOnly)) {
                        //Verify parameters
                        if(command.parameters > 0) {
                            if(command.parameters == 1) command.func(this, name, parameters[0]);
                            else command.func(this, name, ...parameters.slice(0, command.parameters));
                        }
                        else if(command.parameters != -1){
                            command.func(this, name);
                        }
                        else {
                            command.func(this, name, ...parameters);
                        }
                    }         
                }, timeout);
            }
        }
    }

    /**
     * Add a command to be verified
     * @param {Object} command Object in a specific format, see commands.js for example
     */
    addCommand(command) {
        this.commands.push(command);
    }

    /**
     * Adds a bunch of commands
     * @param {Array} commands Array of commands in the same format in commands.js
     */
    setCommands(commands) {
        this.commands = commands
    }
}

export default new commandManager()
import { help, warp } from "./commands"
import settings from "../../settings/settings"
import partyTracker from "./partyTracker"
import { checkIfUser, registerWhen, removeRankTag } from "../../utils/functions"
import commandManager from "./commandManager"
import ChatUtils from "../../utils/ChatUtils"

let lastkick
register('chat', (user) => {
    if(settings().partyAutoRejoin) {
        user = removeRankTag(user)
        lastkick = Date.now()
    }
}).setCriteria("You have been kicked from the party by ${user} ")

register('chat', (user) => {
    if(settings().partyAutoRejoin) {
        user = removeRankTag(user)
        if((Date.now() - lastkick??0) < 10000) ChatUtils.sendCommand(`p join ${user}`)
    }
}).setCriteria("-----------------------------------------------------\n${user} has invited you to join their party!\nYou have 60 seconds to accept. Click here to join!\n-----------------------------------------------------")

register("chat", (user, message) => {
    if(user.includes(":")) {
        tempName = user.split(": ");
        user = tempName.shift();
        message = tempName.reduce((accumulator, currentValue) => accumulator + currentValue + ": ", "") + message;
    }
    user = removeRankTag(user)

    if(message == "Hey! I'm currently muted and am unable to message right now." && settings().partyWarpMuted && partyTracker.PARTY.isLeader && settings().partyCommands) {
        if(partyTracker.PARTY.members.includes(user)) warp(commandManager, user)
        else ChatUtils.sendCommand("r You're not on the party smh.")
    }

    if(message == settings().partyInviteKeyword) {
        if(settings().partyAutoInviteToggle) {
            ChatUtils.sendCommand(`p ${user}`)
        }
        else {
            setTimeout(() => {
                ChatLib.chat(new TextComponent(`&a&l[Click to party ${user}]`)
                .setClick('run_command', `/p ${user}`)
                .setHover("show_text", `/p ${user}`));
            }, 100);
        }
    }

    if(/^!invite(\s[^\s]+)+$/.test(message)) {
        let members = [user].concat(message.split(" ").slice(1)).join(" ")
        setTimeout(() => {
            ChatLib.chat(new TextComponent(`&a&l[Click to invite ${members}]`)
            .setClick('run_command', `/rfuinvitepeople ${members}`)
            .setHover("show_text", `/rfuinvitepeople ${members}`));
        }, 100);
    }
}).setCriteria("From ${user}: ${message}")

register("command", (...members) => {
    ChatUtils.sendCommand(`w ${members[0]} OK!`)
    members.forEach((member) => {
            ChatUtils.sendCommand(`p ${member}`)
    })
}).setName("rfuinvitepeople")

register("chat", (user) => {
    if(!settings().partyJoinHelp || (settings().partyJoinHelpLeader && !partyTracker.PARTY.isLeader)) return
    help(commandManager, removeRankTag(user))
}).setCriteria("${user} joined the party.");


const partyRegex = /(((lf|any(one)?|who)\s(cish(ing)?|fish|p((art)(y|ies))?|crimson p((art)(y|ies))?|ci p((art)(y|ies))?|inv(ite)?(\s|$))(ing)?)|(^p(arty)?$)|((\s|^)inv(ite)?)(\s|$)|((\s|^)p(arty)? me)|(\s|^)(parties)(\s|$)|^me+($|(\sme+($|(\sme+)))))/ig;
registerWhen("chat", (user, message) => {
    user = removeRankTag(user);
    if(user.includes(" ")) user = user.split(" ")[0];
    partyRegex.lastIndex = 0;
    if(partyRegex.test(message) && !checkIfUser(user)) {
        setTimeout(() => {
            Msg = new TextComponent(`&a&l[Click to party ${user}]`)
            .setClick('run_command', `/p ${user}`)
            .setHover("show_text", `/p ${user}`);
            ChatLib.chat(Msg);
        }, 100)
    }
},
() => settings().clickToParty).setCriteria("Guild > ${user}: ${message}")

// From [MVP++] Jenyk: Hey! I'm currently muted and am unable to message right now.
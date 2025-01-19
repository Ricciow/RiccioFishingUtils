import { help, warp } from "./commands"
import settings from "../../settings/settings"
import partyTracker from "./partyTracker"
import { checkIfUser, removeRankTag } from "../../utils/functions"
import commandManager from "./commandManager"

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
        if((Date.now() - lastkick??0) < 10000) ChatLib.command(`p join ${user}`)
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
        else ChatLib.command("r You're not on the party smh.")
    }

    if(message == settings().partyInviteKeyword) {
        if(settings().partyAutoInviteToggle) {
            ChatLib.command(`p ${user}`)
        }
        else {
            ChatLib.chat(new TextComponent(`&a&l[Click to party ${user}]`).setClickAction('run_command').setClickValue(`/p ${user}`).setHoverAction("show_text").setHoverValue(`/p ${user}`));
        }
    }
}).setCriteria("From ${user}: ${message}")


register("chat", (user) => {
    if(!settings().partyJoinHelp || (settings().partyJoinHelpLeader && !partyTracker.PARTY.isLeader)) return
    help(commandManager, removeRankTag(user))
}).setCriteria("${user} joined the party.");


const partyRegex = /(((lf|any(one)?|who)\s(cish(ing)?|fish|p((art)(y|ies))?|crimson p((art)(y|ies))?|ci p((art)(y|ies))?|inv(ite)?)(ing)?)|(^p(arty)?$)|((\s|^)inv(ite)?)|((\s|^)p(arty)? me)|(\s|^)(parties)(\s|$)|^me+($|(\sme+($|(\sme+)))))/ig;
register("chat", (user, message) => {
    user = removeRankTag(user);
    if(user.includes(" ")) user = user.split(" ")[0];
    partyRegex.lastIndex = 0;
    if(partyRegex.test(message) && !checkIfUser(user)) {
        Msg = new TextComponent(`&a&l[Click to party ${user}]`).setClickAction('run_command').setClickValue(`/p ${user}`).setHoverAction("show_text").setHoverValue(`/p ${user}`);
        ChatLib.chat(Msg);
    }
}).setCriteria("Guild > ${user}: ${message}")

// From [MVP++] Jenyk: Hey! I'm currently muted and am unable to message right now.
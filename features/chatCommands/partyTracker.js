//This code is responsible for tracking the party joins/leave/transfers etc.

import { playerData } from "../../data/data";
import { playerName } from "../../data/constants";
import { checkIfUser, removeFromArray, removeRankTag } from "../../utils/functions";

class partyTracker {
    constructor() {
        this.PARTY = playerData.PARTY

        if(!this.PARTY.logOff) this.PARTY.logOff = 564004800000
        if(!this.PARTY.inParty) this.PARTY.inParty = false
        if(!this.PARTY.isLeader) this.PARTY.isLeader = false
        if(!this.PARTY.members) this.PARTY.members = []
        if(!this.PARTY.warpExcluded) this.PARTY.warpExcluded = []

        register("chat", () => {
            this.PARTY.inParty = true;
        }).setCriteria("Party > ${*}: ${*}");
        
        register("chat", (user) => {
            this.PARTY.members = [removeRankTag(user)]
        }).setCriteria("You have joined ${user}'s party!");
        
        register("chat", (user) => {
            this.PARTY.members = [removeRankTag(user)]
        }).setCriteria("You have joined ${user}' party!");
        
        register("chat", (people) => {
            if(people.includes(", ")) people = people.split(", ").map((name) => {return removeRankTag(name)})
            else people = [removeRankTag(people)]
            people.forEach((person) => {
                this.PARTY.members.push(person)  
            })
        }).setCriteria("You'll be partying with: ${people}");
        
        register("chat", (user) => {
            if(removeRankTag(user) != playerName) this.PARTY.members = [removeRankTag(user)]
        }).setCriteria("Party Leader: ${user} ●");
        
        register("chat", (people) => {
            people = people.split(" ● ").map((name) => {return removeRankTag(name)})
            people.forEach((person) => {
                if(person != "" && person != playerName)this.PARTY.members.push(person)    
            })
        }).setCriteria("Party Moderators: ${people}");
        
        register("chat", (people) => {
            people = people.split(" ● ").map((name) => {return removeRankTag(name)})
            people.forEach((person) => {
                if(person != "" && person != playerName)this.PARTY.members.push(person)  
            })
        }).setCriteria("Party Members: ${people}");
        
        register("chat", (user) => {
            if(!this.PARTY.inParty) {
                if(checkIfUser(removeRankTag(user))) {
                    this.PARTY.isLeader = true;
                }
            }
            this.PARTY.inParty = true;
        }).setCriteria("${user} invited ${*} to the party! They have 60 seconds to accept.");
        
        register("chat", (user) => {
            this.PARTY.inParty = true;
            this.PARTY.members.push(removeRankTag(user))
        }).setCriteria("${user} joined the party.");
        
        register("chat", (user) => {
            this.PARTY.inParty = true;
            this.PARTY.isLeader = true;
        }).setCriteria("Created a public party! Players can join with /party join ${user}");
        
        register("chat", () => {
            this.PARTY.inParty = true;
            this.PARTY.isLeader = false;
        }).setCriteria("You are not this party's leader!");
        
        register("chat", () => {
            this.PARTY.inParty = false;
            this.PARTY.isLeader = false;
            this.PARTY.members = [];
            this.PARTY.warpExcluded = [];
        }).setCriteria("You left the party.");
        
        register("chat", () => {
            this.PARTY.inParty = false;
            this.PARTY.isLeader = false;
            this.PARTY.members = [];
            this.PARTY.warpExcluded = [];
        }).setCriteria("You have been kicked from the party by ${*}");
        
        register("chat", () => {
            this.PARTY.inParty = false;
            this.PARTY.isLeader = false;
            this.PARTY.members = [];
            this.PARTY.warpExcluded = [];
        }).setCriteria("The party was disbanded because all invites expired and the party was empty.");
        
        register("chat", () => {
            this.PARTY.inParty = false;
            this.PARTY.isLeader = false;
            this.PARTY.members = [];
            this.PARTY.warpExcluded = [];
        }).setCriteria("The party was disbanded because the party leader disconnected.");
        
        register("chat", () => {
            this.PARTY.inParty = false;
            this.PARTY.isLeader = false;
            this.PARTY.members = [];
            this.PARTY.warpExcluded = [];
        }).setCriteria("${*} has disbanded the party!");
        
        register("chat", () => {
            this.PARTY.inParty = false;
            this.PARTY.isLeader = false;
            this.PARTY.members = [];
            this.PARTY.warpExcluded = [];
        }).setCriteria("You are not in a party right now.");
        
        register("chat", (user, user2) => {
            this.PARTY.inParty = true;
            if(checkIfUser(removeRankTag(user))) {
                this.PARTY.isLeader = true;
            }
            else if (checkIfUser(removeRankTag(user2))) {
                this.PARTY.isLeader = false;
            }
        }).setCriteria("The party was transferred to ${user} by ${user2}");
        
        register("chat", (user, user2) => {
            if(checkIfUser(removeRankTag(user))) {
                this.PARTY.isLeader = true;
                this.PARTY.inParty = true;
            }
            else if (checkIfUser(removeRankTag(user2))) {
                this.PARTY.isLeader = false;
                this.PARTY.inParty = false;
                this.PARTY.members = [];
                this.PARTY.warpExcluded = [];
                return
            }
            removeFromArray(this.PARTY.members, removeRankTag(user2))
        }).setCriteria("The party was transferred to ${user} because ${user2} left");
        
        register("chat", (user) => {
            removeFromArray(this.PARTY.members, removeRankTag(user))
            if(this.PARTY.warpExcluded.includes(removeRankTag(user))) removeFromArray(this.PARTY.warpExcluded, removeRankTag(user));
        }).setCriteria("${user} has left the party.");
        
        register("chat", (user) => {
            removeFromArray(this.PARTY.members, removeRankTag(user))
            if(this.PARTY.warpExcluded.includes(removeRankTag(user))) removeFromArray(this.PARTY.warpExcluded, removeRankTag(user));
        }).setCriteria("${user} was removed from your party because they disconnected.");
        
        register("chat", (user) => {
            removeFromArray(this.PARTY.members, removeRankTag(user))
        }).setCriteria("${user} has been removed from the party.");
        
        register("messageSent", (message) => {
            const result = /\/^p kick (.+)$/.exec(message)
            if(result) {
                let user = result[1]
                if(this.PARTY.warpExcluded.includes(removeRankTag(user))) removeFromArray(this.PARTY.warpExcluded, removeRankTag(user));
            }
        })
        
        register("worldunload", () => {
            this.PARTY.logOff = Date.now();
        });
        
        register("gameunload", () => {
            this.save();
        });
        
        register("worldload", () => {
            if (this.PARTY.inParty){
                if (this.PARTY.logOff + 300000 < Date.now()){
                    this.PARTY.inParty = false;
                    this.PARTY.isLeader = false;
                    this.PARTY.members = [];
                    this.PARTY.warpExcluded = [];
                }
            }
        });
    }

    save() {
        playerData.PARTY = this.PARTY
        playerData.save()
    }
}

export default new partyTracker()
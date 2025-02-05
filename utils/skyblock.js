import ChatUtils from "./ChatUtils";

//Class that has sb data from locraw
class Skyblock {

    constructor() {
        this.lobbyData = undefined;
        this.functions = [];
        this.onetime = [];
        register('worldLoad', () => {
            this.lobbyData = undefined;
            this.deleteLocraw = true
            ChatUtils.sendCommand('locraw');
        })
        
        register("chat", (event) => {
            cancel(event)
            this.lobbyData = JSON.parse(ChatLib.getChatMessage(event, false));
            this._runOnData();
        }).setCriteria('{${*}}');
    }

    get skyblock() {
        return this.lobbyData?.gametype == 'SKYBLOCK'
    }

    get lobby() {
        return this.lobbyData?.server
    }

    get map() {
        return this.lobbyData?.map
    }
    
    _PlayerCountTexts() {
        PlayerCountTexts = TabList.getNames().filter((name) => /(Players|Guests|Party) \(\d+\)/.test(name.removeFormatting()));
        return PlayerCountTexts
    }

    get playerCount() {
        return parseInt((/\d+/).exec(this._PlayerCountTexts()[0]?.removeFormatting()))
    }

    _runOnData() {
        this.functions.forEach(func => func());
        this.onetime.forEach(func => func());
        this.onetime = [];
    }

    /**
     * Adds a function that is ran every time when lobby data comes in
     * @param {function} func The function that is ran, must not have any parameters
     * @param {boolean} singleUse Wether the function should only run once or permanently
     * @returns {Skyblock} for chaining
     */
    addListener(func, singleUse = false) {
        if(singleUse) {
            if(!this.lobbyData) this.onetime.push(func)
            else func()
            return this
        }
        this.functions.push(func)
        return this
    }
}

export default new Skyblock()
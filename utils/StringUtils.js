export default class StringUtils {

    /**
     * Splits a string into chunks with at most a certain size
     * @param {string} string 
     * @param {Int} size Size limit of the strings
     * @returns {String[]} Strings with length of at most [size]
     */
    static splitString(string, size) {
        const split = string?.match(new RegExp(`.{1,${size}}`, "g"));
        if (!split) return [];
        return split;
    }

    /**
     * Generates a random string of 13 characters
     * @returns {string} <@??????????>
     */
    static generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return "<@"+result+">";
      }
}
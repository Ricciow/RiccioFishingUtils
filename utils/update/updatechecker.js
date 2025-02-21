import ModuleUtils from "../ModuleUtils";

const version = ModuleUtils.version

/**
 * Processes a version number in a way where "x.y.z" => [x, y, z, 1000]
 * or if there's a pre number "x.y.zprew" => [x,y,z,w]
 * @param {String} version 
 * @returns {Number[]}
 */
function processVersion(version) {
    let prerelease
    let versionParts = version.split('.').map((value) => {
        const releaseNumber = /pre(\d{1,3})/.exec(value)
        if(releaseNumber) {
            prerelease = releaseNumber[1]
        }
        const verNumber = /\d+/.exec(value)
        return Number(verNumber ? verNumber[0] : 0)
    });
    //Add a the release number if its a prerelease or a 1000 if its not so normal releases have priority over prereleases
    //Will only work until there are 999 prereleases, should be fine
    versionParts.push(prerelease ? prerelease : 1000)
    return versionParts
}

/**
 * Verifies if version2 is bigger than version1
 * @param {string} version1 
 * @param {string} version2 
 * @returns {boolean}
 */
function compareVersions(version1, version2) {
    const v1Parts = processVersion(version1)
    const v2Parts = processVersion(version2)

    const maxLength = Math.max(v1Parts.length, v2Parts.length);
    for (let i = 0; i < maxLength; i++) {
        let v1 = v1Parts[i] || 0; // Default to 0 if part is missing
        let v2 = v2Parts[i] || 0; // Same
        if (v1 < v2) return true;
        if (v1 > v2) return false;
    }
    return false;
}

let latestRelease
let latestVersion
let downloadLink
let latestReleaseAvailable
let downloadUrl

/**
 * Update the data from GitHub's API
 * @param {boolean} preRelease If versions on the format "x.y.zprew" should be considered
 */
export function updateGithubData(preRelease = false) {
    let releases
    let assets

    try {
        releases = JSON.parse(FileLib.getUrlContent("https://api.github.com/repos/ricciow/RiccioFishingUtils/releases"))
    }
    catch (error) {
        console.log(`Github rate limited or ct version outdated: v${com.chattriggers.ctjs.Reference.MODVERSION}`)
    }
    
    //Release
    latestRelease = releases?.find(({ prerelease, tag_name }) => prerelease === preRelease && compareVersions(version, tag_name?.substring(1)));
    
    if(!latestRelease) {
        latestRelease = releases?.find(({ prerelease , tag_name}) => prerelease === false && compareVersions(version, tag_name?.substring(1)));
    }

    if(latestRelease) {
        latestVersion = latestRelease.tag_name.substring(1);
        downloadLink = latestRelease.html_url;
        latestReleaseAvailable = true
        
        const assetsUrl = latestRelease.assets_url
        try {
            assets = JSON.parse(FileLib.getUrlContent(assetsUrl))
            downloadUrl = assets ? assets[0].browser_download_url : undefined
        } 
        catch(error) {
            console.log(`Github rate limited or ct version outdated: v${com.chattriggers.ctjs.Reference.MODVERSION}`)
        }
    }
    
}

/**
 * Verifies wether there's an update or not
 * @returns {boolean} Update
 */
export function checkIfUpdate() {
    return latestReleaseAvailable??false
}

/**
 * Get Github's release URL
 * @returns {string} Github's release URL
 */
export function getDownloadLink() {
    return downloadLink
}

/**
 * Self explanatory
 * @returns {string} Direct download URL
 */
export function getDirectDownloadLink() {
    return downloadUrl
}

/**
 * Self explanatory
 * @returns {string} version number.
 */
export function getRFUVersion() {
    return version
}

/**
 * Checks if there's an update and sends an according chat message.
 * @param {boolean} announceUpToDate 
 */
export function checkIfUpdateText(announceUpToDate = false) {
    //Verify if ctjs is in version 2.2.1 or later
    if(!compareVersions(com.chattriggers.ctjs.Reference.MODVERSION, "2.2.1")) { 
        if (latestReleaseAvailable) {
            if(!downloadUrl) {
                ChatLib.chat(
                    new TextComponent(`&5[&b&lRFU&5] &9&lNew RFU Release: &fv${latestVersion} &a&l[Download Link]`)
                    .setClick("open_url", downloadLink)
                    .setHover("show_text", "Click to open the download website")
                )
            }
            else {
                ChatLib.chat(
                    new TextComponent(`&5[&b&lRFU&5] &9&lNew RFU Release: &fv${latestVersion} &a&l[Download]`)
                    .setClick("run_command", "/rfudownloadnewestversion")
                    .setHover("show_text", "Click to automatically update RFU.")
                )
            }
        }
        else if(announceUpToDate) {
            ChatLib.chat("&5[&b&lRFU&5] &9You're on the latest version!")
        }
    }
    else {
        ChatLib.chat(
            new TextComponent(`&5[&b&lRFU&5] &cUnable to check if there's a new version since your chattriggers is outdated. &a&l[CT website]`)
            .setClick("open_url", "https://www.chattriggers.com")
        )
    }
}

const tempZip = Config.modulesFolder + "/RiccioFishingUtils/RiccioFishingUtils.zip"

/**
 * Updates RFU if there's a downloadURL found, make sure this only runs while inside a world.
 */
export function updateModule() {
    if(downloadUrl) {
        downloadFile(downloadUrl, tempZip)
        FileLib.unzip(tempZip, Config.modulesFolder)
        FileLib.delete(tempZip)
        ChatLib.chat("&5[&b&lRFU&5] &e&lYour RFU has been updated! &6Reloading...")
        ChatLib.command('ct reload', true)
    }
}

const FileOutputStream = Java.type("java.io.FileOutputStream")
const File = Java.type("java.io.File")
const Channels = Java.type("java.nio.channels.Channels")
const Long = Java.type("java.lang.Long")

/**
 * Downloads a file from an URL in a set destination
 * @param {String} url URL of the download
 * @param {String} destination Path to the destination
 */
function downloadFile(url, destination) {
    destination = new File(destination);
    destination.getParentFile().mkdirs();
    connection = com.chattriggers.ctjs.CTJS.INSTANCE.makeWebRequest(url)

    const is = connection.getInputStream()
    rbc = Channels.newChannel(is);
    fos = new FileOutputStream(destination);
    fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
    fos.close()
    is.close()
};
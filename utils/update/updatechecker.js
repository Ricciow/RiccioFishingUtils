const version = JSON.parse(FileLib.read("RiccioFishingUtils", "metadata.json")).version

function compareVersions(version1, version2) {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
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

export function updateGithubData(preRelease = false) {
    let releases
    try {
        releases = JSON.parse(FileLib.getUrlContent("https://api.github.com/repos/ricciow/RiccioFishingUtils/releases"))
    }
    catch (error) {
        console.log(`Github rate limited or ct version outdated: v${com.chattriggers.ctjs.Reference.MODVERSION}`)
    }
    
    
    //Release
    latestRelease = releases?.find(({ prerelease, tag_name }) => prerelease === preRelease && compareVersions(version, tag_name?.substring(1)));
    
    if(!latestRelease) {
        latestRelease = releases?.find(({ prerelease }) => prerelease === false && compareVersions(version, tag_name?.substring(1)));
    }

    if(latestRelease) {
        latestVersion = latestRelease.tag_name.substring(1);
        downloadLink = latestRelease.html_url;
        latestReleaseAvailable = true
    }
    
    let assets
    if(latestReleaseAvailable) {
        const assetsUrl = latestRelease.assets_url
        try {
            assets = JSON.parse(FileLib.getUrlContent(assetsUrl))
        } 
        catch(error) {
            console.log(`Github rate limited or ct version outdated: v${com.chattriggers.ctjs.Reference.MODVERSION}`)
        }
    }
    
    downloadUrl = assets ? assets[0].browser_download_url : undefined
}

export function checkIfUpdate() {
    return latestReleaseAvailable??false
}

export function getDownloadLink() {
    return downloadLink
}

export function getDirectDownloadLink() {
    return downloadUrl
}

export function getRFUVersion() {
    return version
}

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

export function updateModule(prerelease = false) {
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
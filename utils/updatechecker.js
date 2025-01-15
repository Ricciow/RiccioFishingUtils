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

try {
    releases = JSON.parse(FileLib.getUrlContent("https://api.github.com/repos/ricciow/RiccioFishingUtils/releases"))
}
catch (error) {
    console.log(`Github rate limited or ct version outdated: v${com.chattriggers.ctjs.Reference.MODVERSION}`)
}

const latestRelease = releases ? releases[0] : undefined;
const latestVersion = latestRelease?.name.substring(1);
const downloadLink = latestRelease?.html_url;
const latestReleaseAvailable = compareVersions(version, latestVersion??"0.0.0")

export function checkIfUpdate() {
    return latestReleaseAvailable
}

export function getDownloadLink() {
    return downloadLink
}

function checkIfUpdateText(announceUpToDate = false) {
    //Verify if ctjs is in version 2.2.1 or later
    if(!compareVersions(com.chattriggers.ctjs.Reference.MODVERSION, "2.2.1")) { 
        if (latestReleaseAvailable) {
            ChatLib.chat(
                new TextComponent(`&5[&b&lRFU&5] &9&lNew RFU Release: &fv${latestVersion} &a&l[Download]`)
                .setClick("open_url", downloadLink)
            )
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

const latestwarn = register('worldLoad', () => {
    setTimeout(() => {
        checkIfUpdateText()
    }, 1000);
    latestwarn.unregister()
})

register("command", () => checkIfUpdateText(true)).setName("rfucheckupdate")
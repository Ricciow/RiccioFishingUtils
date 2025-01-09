import request from "../../requestV2"

const metadata = JSON.parse(FileLib.read("RiccioFishingUtils", "metadata.json"));
const version = metadata.version;

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

function getLatestVersion() {
    request({
        url: "https://api.github.com/repos/ricciow/RiccioFishingUtils/releases",
        json: true
    })
    .then((response) => {
        const latestRelease = response[0];
        const latestVersion = latestRelease.name.substring(1);
        if (compareVersions(version, latestVersion)) {
            const downloadLink = latestRelease.html_url;
            ChatLib.chat(new TextComponent(`&5[&b&lRFU&5] &9&lNew Release: &f&lv${latestVersion} &a&l[Download]`).setClick("open_url", downloadLink))
        }
    })
}


const latestwarn = register('worldLoad', () => {
    getLatestVersion()
    latestwarn.unregister()
})
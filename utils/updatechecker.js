import request from "../../requestV2"

const metadata = JSON.parse(FileLib.read("RiccioFishingUtils", "metadata.json"));
const version = metadata.version;

function compareVersions(version1, version2) {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    const maxLength = Math.max(v1Parts.length, v2Parts.length);
    for (let i = 0; i < maxLength; i++) {
        const v1 = v1Parts[i] || 0; // Default to 0 if part is missing
        const v2 = v2Parts[i] || 0; // Same
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
        const releases = response

        const latestRelease = releases[0];

        console.log(JSON.stringify(latestRelease))

        const latestVersion = latestRelease.tag_name.replace("v", "");

        console.log(version && compareVersions(version, latestVersion))

        if (version && compareVersions(version, latestVersion)) {
            const downloadLink = latestRelease.html_url;
            ChatLib.chat(`\n&c&lNEW RELEASE: &f&lv${latestVersion}`);
            ChatLib.chat(`&dDownload the new version here: ${downloadLink}`);
        }
        else {
            ChatLib.chat("Only old versions L")
        }
    })
}

getLatestVersion()
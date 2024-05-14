const fs = require('fs');

function updateTokenFile(website, tokens) {
    let apiKeys = require('../apiKeys.json');
    apiKeys[website].refreshToken = tokens.refreshToken;
    apiKeys[website].accessToken = tokens.accessToken;
    fs.writeFileSync('./apiKeys.json', JSON.stringify(apiKeys, null, 2));
}

module.exports = updateTokenFile;
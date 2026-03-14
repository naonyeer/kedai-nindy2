const https = require('https');
const fs = require('fs');

const searchImage = (query) => {
    return new Promise((resolve, reject) => {
        const reqURL = 'https://duckduckgo.com/?q=' + encodeURIComponent(query) + '&iax=images&ia=images';
        https.get(reqURL, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/vqd=([^&]+)/);
                if (!match) return reject(new Error('No token found'));
                const token = match[1];
                const searchUrl = 'https://duckduckgo.com/i.js?q=' + encodeURIComponent(query) + '&o=json&p=1&s=0&u=bing&f=,,,,,&vqd=' + token;
                https.get(searchUrl, { headers: { 'referer': 'https://duckduckgo.com/' } }, (res2) => {
                    let data2 = '';
                    res2.on('data', chunk => data2 += chunk);
                    res2.on('end', () => {
                        const json = JSON.parse(data2);
                        if (json.results && json.results.length > 0) {
                            resolve(json.results[0].image);
                        } else {
                            reject(new Error('No results'));
                        }
                    });
                });
            });
        }).on('error', reject);
    });
};

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error('Failed to download ' + res.statusCode));
            }
            const file = fs.createWriteStream(filepath);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
    });
};

const items = [
    { query: 'beras karung putih', file: 'beras.png' },
    { query: 'beras merah karung', file: 'beras-merah.png' },
    { query: 'daging ayam mentah segar pasar', file: 'ayam.png' },
    { query: 'snack chitato indomie snack', file: 'snack.png' },
    { query: 'pucuk harum botol kratiran', file: 'minuman.png' },
    { query: 'rokok surya 16', file: 'rokok.png' },
    { query: 'botol herbalife shake', file: 'herbalife.png' },
    { query: 'perbaikan smartphone service hp', file: 'service.png' },
    { query: 'service elektronik rumah tangga tv', file: 'service-elektronik.png' },
    { query: 'mobile legends logo transparent', file: 'ml.png' },
    { query: 'free fire logo transparent', file: 'ff.png' },
    { query: 'pubg mobile logo transparent', file: 'pubg.png' },
    { query: 'genshin impact logo transparent', file: 'genshin.png' },
    { query: 'valorant logo transparent', file: 'valorant.png' },
    { query: 'roblox logo transparent', file: 'roblox.png' },
    { query: 'honkai star rail logo', file: 'hsr.png' },
    { query: 'clash of clans logo transparent', file: 'coc.png' },
    { query: 'call of duty mobile logo', file: 'codm.png' },
];

(async () => {
    for (const item of items) {
        try {
            console.log(`Searching for ${item.query}...`);
            const url = await searchImage(item.query);
            console.log(`Downloading to ${item.file}...`);
            await downloadImage(url, `c:/Users/User/.gemini/antigravity/scratch/kedai-nindy/nextapp/public/assets/products/${item.file}`);
        } catch (e) {
            console.error(`Error with ${item.file}:`, e.message);
        }
    }
})();

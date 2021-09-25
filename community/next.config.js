const env = {};

for (const key in process.env) {
    if (key.startsWith('__')) continue;
    if (key.startsWith('NODE_')) continue;
    env[key] = process.env[key];
}

module.exports = {
    env,
    reactStrictMode: true,
}

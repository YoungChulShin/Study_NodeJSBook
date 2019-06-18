const util = require('util');
const crypto = require('crypto');

const randomBytesPromoise = util.promisify(crypto.randomBytes);
randomBytesPromoise(64)
    .then((buf) => {
        console.log(buf.toString('base64'))
    })
    .catch((err) => {
        console.error(err);
    });
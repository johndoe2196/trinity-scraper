// General imports
const crypto = require("crypto")
const fs = require("fs")

// Assign SEPARATOR value according to server value
const SEPARATOR = "kQIthbOxiqK60EePFaZxkaqtmMOw8wkBp+XODvW8R30="

const encryptAuth = (email, password, form) => {
    // Fetch public key
    const publicKey = fs.readFileSync(`${__dirname}/../config/.ssl/public.pem`)
    // Create authObject including some random nonce intended to make the data to
    // encrypt more irregular
    const authObject = {
        email: email,
        password: password,
        form: form,
        nonce: crypto.randomBytes(64).toString("base64")
    }
    // Stringify the authObject data using a random separator (32 bytes) - random
    // separator allows string to be split back at the decrypt end (obviously if
    // "," was used as the separator, this could appear in user password for
    // example, and cause an error when rebuilding the authObject after 
    // decryption)
    const authString = Object.values(authObject).join(SEPARATOR)
    // Generate buffer from provided data, and encrypt using public key
    const authBuffer = Buffer.from(authString)
    const encrypted = crypto.publicEncrypt(publicKey, authBuffer)
    // Ensure that string is url safe according to rfc4648 specification 
    // (https://tools.ietf.org/html/rfc4648) - node base64 includes +/ that
    // would otherwise not be url safe, and could not be included in request
    // params etc.
    const toBase64URLSafe = encrypted
        .toString("base64")
        .replace(/[+]/g, "-")
        .replace(/[/]/g, "_")
    return toBase64URLSafe
}

// Exports
module.exports = {
    encrypt: encryptAuth
}

var jwt = require("jsonwebtoken");
var uuid = require("uuid");

// LoginID Management API key - created on LoginID admin dashbaord 
const apiKey = process.env.MANAGEMENT_API_KEY || "";

// Generates LoginID authorization token for management api requests
// scope: the action scope of the requested operation
const generateToken = (scope) => {

    // API Credential Key - created and assigned to the Mangement API key on LoginID admin dashbaord 
    const pkey = process.env.API_PRIVATE_KEY.replace(/\\n/g, '\n') 

    // JWT payload:
    // type - the scope of the action 
    // nonce - a token to prevent repetetive requests with the same JWT
    // iat - issue at time 
    var payload = {
    type: scope,
    nonce: uuid.v4(),
    iat: parseInt(Date.now() / 1000),
    };

    // create a signed JWT 
    token = jwt.sign(payload, pkey, { algorithm: "ES256" });
    return token;
} 

// Headers for the Management API requests
// authToken: the signed JWT/authorization token that created and signed in generateToken()
const getHeaders = (authToken) => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "authorization": `Bearer ${authToken}`,
        'X-API-Key': apiKey,
    };
}

module.exports = {
    generateToken,
    getHeaders
}
var jwt = require("jsonwebtoken");
var uuid = require("uuid");

// Generates LoginID authorization token for management api requests
// scope: the scope of the requested operation
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

module.exports = {
    generateToken
}
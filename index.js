require("dotenv").config();
const express = require("express");
const fetch = require('node-fetch');
var jwt = require("jsonwebtoken");
var uuid = require("uuid");
/**
 *
 */
const app = express();
const port = process.env.PORT || 6000;
const managementApiServiceUrl = process.env.MANAGEMENT_API_SERVICE_URL || '';

/**
 * Making sure that the required environment variables are filled out
 */
const requiredEnvParams = [
  "API_PRIVATE_KEY",
  "MANAGEMENT_API_KEY",
  "MANAGEMENT_API_SERVICE_URL"
];
for (const param of requiredEnvParams) {
  if (!process.env[param]) {
    console.log(
      `WARNING: Parameter ${param} is undefined, unexpected behaviour may occur, check your environment file`
    );
  }
}

app.get("/_health", (req, res) => {
  res.sendStatus(200);
});

/**
 * Requests LoginID Management API to delete a user by user id
 */
app.delete("/users/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  
  // Management API key - created on LoginID admin dashbaord 
  const clientId = process.env.MANAGEMENT_API_KEY

  // API Credential Key - created and assigned to the Mangement API key on LoginID admin dashbaord 
  const pkey = process.env.API_PRIVATE_KEY.replace(/\\n/g, '\n') 

  // JWT payload:
  // type - the scope of the action 
  // nonce - a token to prevent repetetive requests with the same JWT
  // iat - issue at time 
  var payload = {
    type: "users.delete",
    nonce: uuid.v4(),
    iat: parseInt(Date.now() / 1000),
  };

  // create a signed JWT 
  token = jwt.sign(payload, pkey, { algorithm: "ES256" });
  
  // make a request to LoginID Management API
  try {
    let response = await fetch(managementApiServiceUrl + `/manage/users/${userId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': `Bearer ${token}`,
          'X-API-Key': clientId,
        }
    });

    // user record is successfully deleted
    if (response.status === 204) {	
        return res.sendStatus(204)
    }

    // check whether something went wrong 
    let jsonResponse = await response.json();
    if (response.ok) {
      return res.status(200).json(jsonResponse);
    } else {
      return res.status(response.status).json({ code: jsonResponse.code, message: jsonResponse.message });
    }

  } catch(err) {
      console.log(err);
      return res.status(500).json(err);
  }
});

/**
 *
 */
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

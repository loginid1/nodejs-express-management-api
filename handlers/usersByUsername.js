const fetch = require("node-fetch");
const { generateToken } = require("../utils/utils")

// LoginID Management API key - created on LoginID admin dashbaord 
const clientID = process.env.MANAGEMENT_API_KEY || "";
// LoginID Management API Service URL
const managementApiServiceUrl = process.env.MANAGEMENT_API_SERVICE_URL || "";

// User management api handlers
const UserHandlers = {
    async updateUserByUsername(req, res, next) {
        const username = req.params.username;

        // create a signed JWT 
        token = generateToken("users.update");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(managementApiServiceUrl + `/manage/${clientID}/users/username/${username}`, {
                method: "put",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(req.body)
            });

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
    },
    
    async activateUserByUsername(req, res, next) {
        const username = req.params.username;

        // create a signed JWT 
        token = generateToken("users.activate");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(managementApiServiceUrl + `/manage/${clientID}/users/username/${username}/activate`, {
                method: "put",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": `Bearer ${token}`,
                }
            });

            // user record is successfully activated
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
    },
    
    async deactivateUserByUsername(req, res, next) {
        const username = req.params.username;

        // create a signed JWT 
        token = generateToken("users.deactivate");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(managementApiServiceUrl + `/manage/${clientID}/users/username/${username}/deactivate`, {
                method: "put",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": `Bearer ${token}`,
                }
            });

            // user record is successfully deactivated
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
    },
    
    async deleteUserByUsername(req, res, next) {
        const username = req.params.username;

        // create a signed JWT 
        token = generateToken("users.delete");

        // make a request to LoginID Management API
        try {
            let response = await fetch(managementApiServiceUrl + `/manage/${clientID}/users/username/${username}`, {
                method: "delete",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": `Bearer ${token}`,
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
    },

    async dispatchEmailVerification(req, res, next) {
        const username = req.params.username;

        // create a signed JWT 
        token = generateToken("users.email-verification.dispatch");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(managementApiServiceUrl + `/manage/${clientID}/users/username/${username}/email-verification/dispatch`, {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authorization": `Bearer ${token}`,
                }
            });

            // user record is successfully deactivated
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
    },
}

module.exports = UserHandlers;
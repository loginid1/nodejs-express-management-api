const fetch = require("node-fetch");
const { generateToken, getHeaders } = require("../utils/utils")


// LoginID Management API Service URL
const managementApiServiceUrl = process.env.MANAGEMENT_API_SERVICE_URL || "";

// User management api handlers
const UserHandlers = {
    async updateUser(req, res, next) {
        const userID = req.params.user_id;

        // create a signed JWT 
        token = generateToken("users.update");

        // make a request to LoginID Management API
        try {
            let response = await fetch(`${managementApiServiceUrl}/manage/users/${userID}`, {
                method: "put",
                headers: getHeaders(token),
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

    async activateUser(req, res, next) {
        const userID = req.params.user_id;

        // create a signed JWT 
        token = generateToken("users.activate");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(`${managementApiServiceUrl}/manage/users/${userID}/activate`, {
                method: "put",
                headers: getHeaders(token),
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

    async deactivateUser(req, res, next) {
        const userID = req.params.user_id;

        // create a signed JWT 
        token = generateToken("users.deactivate");

        // make a request to LoginID Management API
        try {
                let response = await fetch(`${managementApiServiceUrl}/manage/users/${userID}/deactivate`, {
                method: "put",
                headers: getHeaders(token),
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

    async deleteUser(req, res, next) {
        const userID = req.params.user_id;
  
        // create a signed JWT 
        token = generateToken("users.delete");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(managementApiServiceUrl + `/manage/users/${userID}`, {
                method: "delete",
                headers: getHeaders(token),
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
        const userID = req.params.user_id;

        // create a signed JWT 
        token = generateToken("users.email-verification.dispatch");
        
        // make a request to LoginID Management API
        try {
            let response = await fetch(`${managementApiServiceUrl}/manage/users/${userID}/email-verification/dispatch`, {
                method: "post",
                headers: getHeaders(token),
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
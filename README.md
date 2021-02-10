# Node.JS (Express) Management API

This is LoginID Management API sample written in JavaScript using the [Node.JS](https://nodejs.org/) runtime and the [express](https://expressjs.com/) web framework. The core logic of this application is at the [index.js](https://github.com/loginid1/nodejs-express-integration/blob/master/index.js).

## Requirements

- `Node.JS`
- `Git`

## Local setup

To run this project locally in your development environment, you will have to use `localhost` or `127.0.0.1`. For this project, we are using `localhost` URI.

**Optional configuration:**

If you are running multiple projects, consider accessing the `hosts` file to add a custom URI setting for your project.

**Linux and macOS:** `/etc/hosts`

**Windows:** `C:\windows\system32\drivers\etc\hosts`

The `hosts` file will look like the following:
```
# Default Settings
127.0.0.1       localhost
255.255.255.255 broadcasthost
::1             localhost

# Custom URI Settings
127.0.0.1       node.integration.localhost
```

**Note:** When using a custom URIs for your local projects, you will have to use `.localhost` suffix.

#### Clone the project

The first step to getting this project up and running is to clone this repository. Once you cloned the project, you will need to `cd` into the project folder.

```
$ git clone https://github.com/loginid1/nodejs-express-management-api.git
$ cd nodejs-express-management-api
```
#### Install dependencies

This project utilizes [npm](https://www.npmjs.com/) to manage its dependencies. So, before using this project, make sure you have npm installed on your machine.

```
$ npm install
```

#### Fill the environment variables

To configure environment variables you will need make a copy of `.env.example` file and rename it to `.env` and fill all the environment variables. To have a better understanding of the variables please refer to this [section](#filling-the-environment-variables).

```
$ cp .env.example .env
```

#### Execute the project

```
$ npm run start
```

Or run the project with a watcher 

```
$ npm run dev
```

## Filling the environment variables

#### The `MANAGEMENT_API_SERVICE_URL` variable

This is the URI that will be used to communicate with LoginID's Management API servers.

```
MANAGEMENT_API_SERVICE_URL=https://
```

#### The `MANAGEMENT_API_KEY` and `API_PRIVATE_KEY` variables

In order to receive access to LoginID Management API endpoints, you will need to create your client credentials. This is similar to the credentials you would create with Google to use Google authentication. This allows you to use LoginID services in a secure, authenticated fashion.

To obtain the client keys you will need to perform the following steps:

**Step 1** - Using an existing account or registering a new one

 - Navigate to https://usw1.loginid.io/en/register
 - Enter your username and organization id for an existing account or select the **"Sign Up"** option and create a new account.
 - Hit the **"Login"** or **"Register"** button

**Step 2** - Use your biometric capabilities

 - Your web browser will ask for permission to use your security key or another authenticator in order to proceed with account creation.
 - Please note that the native dialogues for doing so vary by browser, operating system and the type of authenticator you are using. 

**Step 3** - Enter the integration dashboard

Once you have access to the LoginID dashboard, use the navigation bar to select **"Integrations"** option or press the **"Add Integration"** button.

**Step 4** - Sign the Customer License Agreement

 - Scroll down the page and press the **"View"** button.
 - Agree to the terms and press the **"Sign"** button.

**Step 5** - Add new Management API Integration
 
 - Choose the **"Management"** as an integration type.
 - Choose the **"New API Credential"** to create a new api private key.
 - Enter a name for your management api integration.
 - Enter a name for your api credential.
 - Press the **"Create"** button.
 - Copy the API Credential and Mangement API Key and use them to fill the `API_PRIVATE_KEY` and `MANAGEMENT_API_KEY` variables respectively.

```
API_PRIVATE_KEY=-----BEGIN EC PRIVATE KEY-----\nTOKEN\n-----END EC PRIVATE KEY-----
MANAGEMENT_API_KEY=hgYQ4YTdJAgufBxogSZii7_JXWt412mDxVPYQkP0ztEBPFi--XXhxDMmGPnPB3RLwiHUF7JYneI-YvAlmwzrmqg==
```
**NOTE:** API_PRIVATE_KEY has to be entered as a single line string with all newlines replaces with `\n` character.

## Endpoints

The sample includes these endpoints:

**DELETE** /users/:username

An endpoint to delete the user by a specified username which returns 204 status on success.

```
curl --location --request DELETE 'http://localhost:6000/users/john.doe'
```

##How to get a Management API Token?

To call the LoginID Management API endpoints, developers need to authenticate with an access token called the Management API token. These tokens are JSON Web Tokens (JWTs) which contain specific grant permissions known as scopes. 

###Create a Mangament API token
A Management API token has to be signed by a developer and added to request headers as `Authorization: Bearer <token>` header before sending requests. 

The required token payload structure is shown below:
```json
  {
    "type": "users.delete",
    "username": "john.doe",
    "nonce": "749206e3-cbc0-47c9-af67-19fa8c31ec16",
    "iat": "1610376333"
  }; 
```
`type` - The scope of the requested API endpoint call.
`username` - The user's username which is used in the requested operation.
`nonce` - uuid to prevent repetetive requests with the same JWT. 
`iat` - The issue date of the token.

The header of a token:
```json
{
    "alg": "ES256",
    "typ": "JWT"
}
```

Once the token is created, it must be signed with ES256 algorithm using the API credential private key.

###How to find out which scope is required?
Each backend-to-backend application that accesses an API must be granted a specific scope. Scopes are permissions that should be granted by the owner. To see the required scope for each endpoint, check out the Management API reference. For example, the Delete a user by username endpoint requires the scope users:delete.

###Token security and lifetime
Each Management API token must contain a `nonce` key which ensures that it is expired once the request is sent. The same token cannot be used to make a new request. Create a new access token when a new request is made.
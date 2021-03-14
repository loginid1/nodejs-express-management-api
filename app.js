require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./routes")

const app = express();
const port = process.env.PORT || 6000;

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

app.use(bodyParser.json());

// health check endpoint
app.get("/_health", (req, res) => {
    res.sendStatus(200);
});
  
// Register routes
app.use("/", routes);

/**
 *
 */
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
  
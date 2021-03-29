require("dotenv").config();
const production = process.env.NODE_ENV === "production";

// your configs
// edit example.env file and rename to .env
const DEV_ID = process.env.DEV_ID;
const TOKEN = process.env.TOKEN;
const URL = process.env.URL;
const PORT = process.env.PORT;

module.exports = {
	DEV_ID,
	TOKEN,
	PORT,
	URL,
};

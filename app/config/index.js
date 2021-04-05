require("dotenv").config();
const production = process.env.NODE_ENV === "production";

// your configs
// edit example.env file and rename to .env
const DEV_ID = process.env.DEV_ID;
const TOKEN = process.env.TOKEN;
const URL = process.env.URL;
const PORT = process.env.PORT;
const DEV_TOKEN =process.env.DEV_TOKEN
const db_name = process.env.db_name
const user_name = process.env.user_name
const password = process.env.password
const dialect = process.env.dialect
const host = process.env.host
const db_port = process.env.db_port

module.exports = {
	DEV_ID,
	TOKEN,
	DEV_TOKEN,
	PORT,
	URL,
	db_name,
	user_name,
	password,
	dialect,
	host,
	db_port
};

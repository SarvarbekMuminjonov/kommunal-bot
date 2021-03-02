const { Telegraf, Scenes, session } = require("telegraf");
const { TOKEN } = require("../config/index.js");
const { Stage } = Scenes;
const bot = new Telegraf(TOKEN);
const scenes = require("../scenes");
const stage = new Stage(scenes);

bot
	.use(session())
	.use(stage.middleware())
	.start((ctx) => ctx.scene.enter("services"))
	.on("text", (ctx) => ctx.scene.enter("region"))
	.launch()
	.then((res) => {
		console.log("Bot started");
		//bot.telegram.sendMessage(DEV_ID, "bot started");
	});


const { Scenes, Markup } = require("telegraf");
const numberScene = new Scenes.BaseScene("number");
const getUserData = require("../services/exemple");
let personalNumberKeyboard = [
	[
		Markup.button.callback("1", "1"),
		Markup.button.callback("2", "2"),
		Markup.button.callback("3", "3"),
	],
	[
		Markup.button.callback("4", "4"),
		Markup.button.callback("5", "5"),
		Markup.button.callback("6", "6"),
	],
	[
		Markup.button.callback("7", "7"),
		Markup.button.callback("8", "8"),
		Markup.button.callback("9", "9"),
	],
	[
		Markup.button.callback("Orqaga", "orqaga"),
		Markup.button.callback("0", "0"),
		Markup.button.callback("Delete", "delete"),
	],
	[Markup.button.callback("Natija", "natija")],
];

// numberScene.use(session())
let editing = "";
numberScene.enter((ctx) => {
	ctx.deleteMessage();
	editing=''
	// if(ctx.session.districtNumber)ctx.session.districtNumber=0
	return ctx.reply("<b>Hisob raqamingizni kiriting</b>", {
		parse_mode: "HTML",
		...Markup.inlineKeyboard(personalNumberKeyboard),
	});
});

numberScene.action(/.+/, (ctx) => {
	if (ctx.match[0] == "delete") editing = editing.slice(0, -1);

	if (ctx.match[0] == "orqaga") {
		ctx.scene.enter("district");
		return ctx.answerCbQuery("ok");
	}

	if (ctx.match[0] == "natija") {
		ctx.session.personalNumber = editing;
		const creditials = {
			personal_account: (ctx.session.personalNumber),
			service_id: 3,
			region_id: Number.parseInt(ctx.session.regionNumber),
			sub_region_id: Number.parseInt(ctx.session.districtNumber),
		};
		let resultMsg = ``;
		console.log(creditials);
		getUserData(creditials).then((res) => {
			console.log(res)
			res.forEach((val) => {
				resultMsg += `${val.name} : ${val.value}\n`
			})
			ctx.deleteMessage();
			ctx.reply(resultMsg);}
		);
		return ctx.answerCbQuery("So'rov qabul qilindi");
	}

	if (ctx.match[0] !== "delete" && ctx.match[0] != "natija") {
		editing += ctx.match[0];
		ctx.answerCbQuery("ok");
	}

	ctx.editMessageReplyMarkup({
		inline_keyboard: [
			[Markup.button.callback(`${editing}`, "edit")],
			...personalNumberKeyboard,
		],
	});
});

module.exports = numberScene;

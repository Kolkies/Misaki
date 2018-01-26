const Social = require(`${process.cwd()}/base/Social.js`);
const snek = require("snekfetch");

class Oneliner extends Social {
  constructor(client) {
    super(client, {
      name: "oneline",
      description: "Thie command will give you a one liner joke.",
      usage: "oneline",
      category: "Fun",
      cost: 5,
      aliases: ["1l", "joke"]
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (message.settings.socialSystem === "true") {
      if (!(await this.cmdPay(message, message.author.id, this.help.cost))) return;
    }
    const msg = await message.channel.send(`<a:typing:397490442469376001> **${message.member.displayName}** is thinking of something funny...`);
    const { body } = await snek.get("https://dashboard.typicalbot.com/api/jokes").set("Authentication", this.client.config.tbToken);
    msg.edit(body.data);
  }

}

module.exports = Oneliner;

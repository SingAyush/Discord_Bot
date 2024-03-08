const { Client, Intents } = require("discord.js");

const axios = require("axios");

const intents = new Intents([
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
]);

const client = new Client({ intents });

const token = "";
const api = "";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!topmovies") {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${api}`
      );

      const topMovies = response.data.results.slice(0, 5);

      const moviesList = topMovies
        .map((movie, index) => `${index + 1}. ${movie.title}`)
        .join("\n");

      const embed = new Discord.MessageEmbed()
        .setTitle("Top 5 Movies Of Current Time")
        .setDescription(moviesList)
        .setColor("#0858ff");

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error", error.message);
      message.reply("Sorry, there is an error");
    }
  }
});

client.login(token);

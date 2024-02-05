const Discord = require("discord.js");
const axios = require("axios");

const client = new Discord.Client();
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

      const MoviesList = topMovies
        .map((movie, index) => `${index + 1}. ${movie.title}`)
        .join("\n");

      const embed = new Discord.MessageEmbed()
        .setTitle("Top 5 Movies Of Current Time")
        .setDiscrpition(MoviesList)
        .setColor("#0058ff");

      message.channel.send(embed);
    } catch (error) {
      console.error("Error", error.message);
      message.reply("Sorry, there was an error");
    }
  }
});

client.login(token);
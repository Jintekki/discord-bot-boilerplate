// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import handleCommands from "./handlers/commands.js";
import handleEvents from "./handlers/events.js";
import mongoDBConnect from "./mongodb-connect.js";
import routes from "./routes.js";

export class ExtendedClient extends Client {
  commands;
  loadCommands;
  loadEvents;
}

// Find and configure .env environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Create a new client instance
const client: ExtendedClient = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.loadCommands = (client) => handleCommands(client);
client.loadCommands(client);

client.loadEvents = (client) => handleEvents(client);
client.loadEvents(client);

// Discord client login
client.login(process.env.DISCORD_TOKEN);

/* MongoDB and Express */
if (process.env.MONGODB_CONNECTION_STRING) {
  mongoDBConnect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    const app = express();

    app.use(express.json());
    app.use("/api", routes);

    app.listen(3000, "localhost", () => {
      console.log(`Listening on port 3000...`);
    });
  });
}

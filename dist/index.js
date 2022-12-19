// Require the necessary discord.js classes
import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import path from "path";
import { fileURLToPath } from "url";
import handleCommands from "./handlers/commands.js";
import handleEvents from "./handlers/events.js";
export class ExtendedClient extends Client {
}
// Find and configure .env environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Create a new client instance
const client = new ExtendedClient({
    intents: [GatewayIntentBits.Guilds],
});
client.commands = new Collection();
client.loadCommands = (client) => handleCommands(client);
client.loadCommands(client);
client.loadEvents = (client) => handleEvents(client);
client.loadEvents(client);
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map
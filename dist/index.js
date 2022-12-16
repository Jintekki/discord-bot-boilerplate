// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import path from "path";
import { fileURLToPath } from "url";
// Find and configure .env environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map
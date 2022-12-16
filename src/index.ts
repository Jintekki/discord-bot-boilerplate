// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export class ExtendedClient extends Client {
  commands;
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

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command.default && "execute" in command.default) {
    client.commands.set(command.default.data.name, command.default);
  } else {
    console.log(
      `[WARNING] The command at ${command.default} is missing a required "data" or "execute" property.`
    );
  }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (interaction.client as ExtendedClient).commands.get(
    interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

import fs from "fs";

async function handleCommands(client) {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = await import(`../commands/${file}`);
    client.commands.set(command.default.data.name, command.default);
  }
}

export default handleCommands;

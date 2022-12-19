import fs from "fs";
async function handleEvents(client) {
    const eventFiles = fs
        .readdirSync("./events")
        .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = await import(`../events/${file}`);
        if (event.default.once) {
            client.once(event.default.name, (...args) => event.default.execute(...args));
        }
        else {
            client.on(event.default.name, (...args) => event.default.execute(...args));
        }
    }
}
export default handleEvents;
//# sourceMappingURL=events.js.map
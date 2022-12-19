# Discord Bot Boilerplate 
A simple Discord bot template that works out-of-the-box (minus environment variables)

### Configuring your environment variables: 
This boilerplate uses [dotenv](https://www.npmjs.com/package/dotenv) to configure environment variables out-of-the-box. 

Upon cloning this repo, `cd` into the root folder of the project and create a `.env` file (`touch .env`).

The following environment variables are required:<br/>
`DISCORD_CLIENT_ID`: Can be found in your Discord Development Portal, after selecting your application and clicking "OAuth2" under the settings menu.<br/>
`DISCORD_TOKEN`: Your bot's personal token. For security purposes, tokens can only be viewed once, when created. Can be found in your Discord Development Portal, after selecting your application and clicking "Bot" under the settings menu. 

For MongoDB support, add the following enviroment variable:<br/>
`MONGODB_CONNECTION_STRING`: The connection string to connect to your MongoDB cluster.

During development, it may be more convenient to deploy slash commands to a single server, such as a testing server. To do so, include the following enviornment variable. If it is not included, slash commands will automatically be deployed to every server your bot is in.<br/>
`DISCORD_GUILD_ID`: Can be found in the Discord client while in Developer Mode. 

### Running the bot:
1. Create a application in the Discord Development Portal and add a bot to it. Invite the bot to a server of your choice. 
2. Attain your Discord app's token and client ID. You may also want to attain your MongoDB connection string and the guild ID of the server you invited your bot to.
3. Fork and clone this respository
4. `cd` into the root folder of the project and configure the enviroment variables as stated above. 
5. `npm install`
6. `npm run build`, then `npm run deploy` (the first time, and any time or change your slash commands), then `npm run start`
7. In your test server, use the `/ping` slash command to ensure everything is working correctly. 

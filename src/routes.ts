import express from "express";

import Guild from "./models/guild.js";
const router = express.Router();

router.get("/guilds", async (req, res) => {
  const guild = await Guild.find();
  res.send(guild);
});

router.get("/guilds/:guildId", async (req, res) => {
  try {
    const guild = await Guild.findOne({
      guildId: req.params.guildId,
    });
    res.send(guild);
  } catch (err) {
    res.status(404);
    res.send({ error: "Guild ID not registered in the database." });
  }
});

router.post("/guilds", async (req, res) => {
  const guilds = new Guild({
    guildId: req.body.guildId,
  });
  await guilds.save();
  res.send(guilds);
});

router.delete("/guilds/:guildId", async (req, res) => {
  try {
    await Guild.deleteOne({ guildId: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Guild ID not registered in the database." });
  }
});

export default router;

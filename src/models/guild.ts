import mongoose from "mongoose";

const schema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Guilds", schema);

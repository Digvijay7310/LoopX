import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true});

const Conversation = new mongoose.model("Conversation", conversationSchema);

export {Conversation};
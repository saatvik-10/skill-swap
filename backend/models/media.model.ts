import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    eTag: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

export const Medias = mongoose.model("Media", mediaSchema);

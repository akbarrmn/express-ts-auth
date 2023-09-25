import mongoose from "mongoose";

const URI = `mongodb://0.0.0.0:27017/express`;

const mongooseConnect: Promise<void> = mongoose.connect(URI).then(() => {
        console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log(err);
});

export const connect = () => mongooseConnect;
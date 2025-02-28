
const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/olx-clone";

async function connectDB(params) {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB using Mongoose");

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectDB();

module.exports = mongoose; 
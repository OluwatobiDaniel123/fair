// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import router from "./routes/route.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Fair Share API is running.");
// });

// mongoose
// .connect(process.env.MONGO_URI)
// .then(() => console.log("Mongo URI is:", process.env.MONGO_URI ? "loaded" : "missing"))
// .catch((err) => console.error("DB error:", err));

// app.use("/api", router);

// app.use((req, res, next) => {
//     res.status(404).json({error: "Route not found"});
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server started on port ${PORT}`);
// });
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/route.js";
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is missing from environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

// Connect DB before starting server
connectDB();
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import "dotenv/config";
import express from "express";
import cors from "cors";
import threadsRouter from "./routes/threads.js";
import authRouter from "./routes/auth.js";
import prisma from "./prisma/client.js";
import verifyToken from "./middleware/verifyToken.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/threads", threadsRouter);

// Task 5: protected identity route
app.get("/api/me", verifyToken, (req, res) => {
  res.json(req.user);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected");
    app.listen(PORT, () => {
      console.log(`✅ Threadbase API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

start();

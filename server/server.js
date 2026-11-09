
import "dotenv/config";
import express from "express";
import cors from "cors";

import threadsRouter from "./routes/threads.js";
import authRouter from "./routes/auth.js";
import prisma from "./prisma/client.js";
import verifyToken from "./middleware/verifyToken.js";

const app = express();

app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/auth", authRouter);

// Threads routes
app.use("/api/threads", threadsRouter);

// Protected user profile route
app.get("/api/me", verifyToken, (req, res) => {
  res.json(req.user);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: {
      code: "INTERNAL",
      message: "Something went wrong"
    }
  });
});

const PORT = 3001;

async function start() {
  await prisma.$connect();

  console.log("Prisma connected");

  app.listen(PORT, () => {
    console.log(
      `Threadbase API running on http://localhost:${PORT}`
    );
  });
}

start().catch((err) => {
  console.error("Failed to start");
  console.error(err);
  process.exit(1);
});

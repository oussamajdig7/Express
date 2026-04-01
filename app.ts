import express from "express";
import type { Request, Response } from "express";
import path from "path";
// import router from "./routes/web.js";
import webRoutes from "./routes/web.js";

const app = express();
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "frontend")));

app.get("/login", (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "frontend", "index.html"));
});

// app.use('/',router);
app.use("/", webRoutes);

// ------------------- Running API route ------------------
app.get("/", (req: Request, res: Response) => {
    res.send("API is running 🚀");
});

// ---------------- Start the server ----------------
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});

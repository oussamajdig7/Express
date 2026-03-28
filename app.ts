import express from "express";
import type { Request, Response } from "express";
import {prisma} from "./lib/prisma.js";

const app = express();

app.get("/",async(req: Request, res: Response) => {
    const {nom,prenom,email,password,datedenaissance} = req.query;
    const data = await prisma.user.create({
        data:{
            nom,
            prenom,
            email,
            password,
            datedenaissance: new Date(String(datedenaissance)),
        },
    });
    res.json(data);
});

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany(); // تجيب جميع users
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
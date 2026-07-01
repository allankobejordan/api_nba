import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import playerRoutes from "./routes/player.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(playerRoutes);
app.use(errorHandler);

app.use(playerRoutes);

app.get("/", (req, res) =>{
    return res.json({
        message: "NBA API TS rodando!"
    });
});

export default app;
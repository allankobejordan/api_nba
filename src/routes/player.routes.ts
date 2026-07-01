import { Router } from "express";
import PlayerController from "../controllers/PlayerController";

const router = Router();

router.get("/players", PlayerController.getPlayers);
router.get("/players/:id", PlayerController.getPlayerById);
router.post("/players", PlayerController.createPlayer);
router.put("/players/:id", PlayerController.updatePlayer);
router.delete("/players/:id", PlayerController.deletePlayer);

export default router;
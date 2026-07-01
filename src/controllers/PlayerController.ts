import { Request, Response } from "express";
import PlayerService from "../services/PlayerService.js";
import { createPlayerSchema, updatePlayerSchema } from "../validations/player.validation.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { idParamSchema } from "../validations/common.validation.js";

class PlayerController {
  async getPlayers(req: Request, res: Response){
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const team = req.query.team as string | undefined;
    const country = req.query.country as string | undefined;
    const name = req.query.name as string | undefined;

    const result = await PlayerService.getAllPlayers(page, limit, {
      team,
      country,
      name,
    });
    return successResponse(res, result);
  }

  async getPlayerById(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const player = await PlayerService.getPlayerById(id);

    if (!player) {
      return errorResponse(res, "Jogador não encontrado", 404);
    }

    return successResponse(res, player);
  }

  async createPlayer(req: Request, res: Response) {
    const playerData = createPlayerSchema.parse(req.body);

    const newPlayer = await PlayerService.createPlayer(playerData);

    return successResponse(res, newPlayer, 201);
  }

  async updatePlayer(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const playerData = updatePlayerSchema.parse(req.body);

    const updatedPlayer = await PlayerService.updatePlayer(id, playerData);

    if (!updatedPlayer) {
      return errorResponse(res, "Jogador não encontrado", 404);
    }

    return successResponse(res, updatedPlayer);
  }

  async deletePlayer(req: Request, res: Response) {
    const { id } = idParamSchema.parse(req.params);

    const deleted = await PlayerService.deletePlayer(id);

    if (!deleted) {
      return errorResponse(res, "Jogador não encontrado", 404);
    }

    return res.status(204).send();
  }
}

export default new PlayerController();
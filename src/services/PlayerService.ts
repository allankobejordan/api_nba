import type { Player } from "../interfaces/Player";
import PlayerRepository from "../repositories/PlayerRepository";


class PlayerService {

  async getAllPlayers(
    page = 1,
    limit = 10,
    filters?:{
      team?: string;
      country?: string;
      name?: string;
    }
  ){
    const skip = ( page - 1) * limit;

    
    const where = {
      ...(filters?.team && {
        team: filters.team,
      }),

      ...(filters?.country && {
        country: filters.country,
      }),

      ...(filters?.name && {
        name: filters.name,
      }),
    };

    const { players, total } = await PlayerRepository.getAllPlayers(
      skip,
      limit,
      where
    );
    return {
      players,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }


  async getPlayerById(id: number) {
    return PlayerRepository.getPlayerById(id);
  }

  async createPlayer(playerData: Player) {
    return PlayerRepository.createPlayer(playerData);
  }

  async updatePlayer(id: number, playerData: Partial<Player>) {
      const playerExists = await PlayerRepository.getPlayerById(id);

    if (!playerExists) {
      return null;
    }

  return PlayerRepository.updatePlayer(id, playerData);
  }

  async deletePlayer(id: number): Promise<boolean> {
  const playerExists = await PlayerRepository.getPlayerById(id);

  if (!playerExists) {
    return false;
  }

  await PlayerRepository.deletePlayer(id);

  return true;
  }
}

export default new PlayerService();
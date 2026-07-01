import type { Player } from "../interfaces/Player";
import prisma from "../lib/prisma";

class PlayerRepository {
  async getAllPlayers(skip: number, limit: number, where: object) {
    const [players, total] = await Promise.all([
      prisma.player.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          id: "asc",
        },
      }),

      prisma.player.count({
        where,
      }),
    ]);

    return {
      players,
      total,
    };
  }

  async getPlayerById(id: number) {
    return prisma.player.findUnique({
      where: { id },
    });
  }

  async createPlayer(playerData: Player) {
    return prisma.player.create({
      data: {
        name: playerData.name,
        team: playerData.team,
        position: playerData.position,
        jerseyNumber: playerData.jerseyNumber,
        country: playerData.country,
        active: playerData.active,
      },
    });
  }

  async updatePlayer(id: number, playerData: Partial<Player>) {
    return prisma.player.update({
      where: { id },
      data: playerData,
    });
  }

  async deletePlayer(id: number) {
    return prisma.player.delete({
      where: { id },
    });
  }
}

export default new PlayerRepository();
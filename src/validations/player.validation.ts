import { z }  from "zod";

    export const createPlayerSchema = z.object({
        name:z.string().min(2, "Nome obrigatório"),
        team:z.string().min(2, "Time obrigatório"),
        position:z.string().min(1, "Posição obrigatória"),
        jerseyNumber:z.number().int().positive("Número da camisa inválido"),
        country:z.string().min(2, "País obrigatório"),
        active:z.boolean().optional(),
    });

    export const updatePlayerSchema = createPlayerSchema.partial();
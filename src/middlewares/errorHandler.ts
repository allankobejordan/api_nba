import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../utils/apiResponse.js";



export function errorHandler(
    error: Error,
    req: Request,
    res:Response,
    next: NextFunction
){
if(error instanceof ZodError){
    return errorResponse(
        res,
        "Erro de validação",
        400,
        error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }))
    );
}

console.error(error);

return errorResponse(res, "Erro interno do servidor", 500);
}
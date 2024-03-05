import { Request, Response, NextFunction } from "express";

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.tokenData.roleName !== "user"){
            return res.status(404).json({
                success: false,
                message: "No puedes marca cita"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "No tienes permiso para marcar cita"
        })
    }
}
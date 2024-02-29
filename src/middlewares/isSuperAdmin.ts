
import { NextFunction, Request, Response } from "express";

export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.tokenData.rolename !== 'siperAdmin'){
            return res.status(401).json({
                success: false,
                message: "No authorizado"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No tienes permiso"
        })
    }
}
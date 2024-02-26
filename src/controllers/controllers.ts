
import { Request ,Response } from "express";
const getRoles = (req:Request, res:Response) =>{
    res.json({
        success: true,
        message: "Roles"
    });
}

const crearRoles = (req:Request, res:Response) => {
    res.status(200).json({
        success: true,
        message: "Crear Roles"
    });
}

const updateRoles = (req:Request, res:Response) => {
    res.status(200).json({
        success: true,
        message: "Roles Actualizar"
    });
}

const deleteRoles = (req:Request, res:Response) => {
    res.status(200).json({
        success: true,
        message: "Roles Eliminar"
    });
}

export { getRoles, crearRoles, updateRoles, deleteRoles}
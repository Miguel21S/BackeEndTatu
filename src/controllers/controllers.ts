
import { Request ,Response } from "express";
import { Role } from "../models/Role";

const getRoles = (req:Request, res:Response) =>{
    res.status(200).json({
        success: true,
        message: "Mostrar Roles"
    });
}

const crearRoles = async (req:Request, res:Response) => {
    try {
        const name = req.body.name;

        if(name.length > 50){
            return res.status(400).json({
                success: true,
                message: "El nombre es muy largo"
            })
        }
        
        const newRole = await Role.create({
            name:name
        }).save()

        res.status(200).json({
            success: true,
            message: "Crear Roles"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear Role", 
            errro: error
        })
        
    }    
}
export { getRoles, crearRoles}
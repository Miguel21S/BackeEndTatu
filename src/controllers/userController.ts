import { Request, Response } from "express";
import { User } from "../models/User";

const getUser = async (req:Request, res:Response) =>{
    try {
        const users = await User.find({
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true
            }
        })
        res.status(200).json({
            success: true,
            message: "Lista de usuario encontrado",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Ocurrio un error al buscar usuario",
            error: error
        })
    } 
}

const crearUser = async (req:Request, res:Response) => {
    try {
        const name = req.body.name;

        if(name.length > 50){
            return res.status(400).json({
                success: true,
                message: "El nombre es muy largo"
            })
        }
        
        const newRole = await User.create({
            name:name,
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
export {getUser, crearUser, updateRoles, deleteRoles}
import { Request, Response } from "express";
import { User } from "../models/User";

//MÉTODO LISTAR USUARIOS
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

//MÉTODO CREAR ROLES
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

//MÉTODO BUSCAR USUARIO POR ID
const updateUser= async (req:Request, res:Response) => {
    try {
        const users = req.params.id;
        const firstUser = await User.findOneBy({
            id: parseInt(users)
        });

        const mostar = () => {
            return firstUser?.name +" "+ firstUser?.lastname +" "+firstUser?.email;
        }
        if(!users){
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        res.status(200).json({
            success: true,
            message: "Roles Actualizar",
            data: mostar()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar usuario",
            error: error
        })
    }
}

const deleteRoles = (req:Request, res:Response) => {
    res.status(200).json({
        success: true,
        message: "Roles Eliminar"
    });
}
export {getUser, crearUser, updateUser, deleteRoles}

import { Request, Response } from "express";
import { User } from "../models/User";

// // // // MÉTODOS VER PERFIL DEL USUARIO
const myPerfil = async (req: Request, res: Response) => {
    try {
        const id_user = req.tokenData.roleId;

        const getPerfil = await User.findOne(
            {
                where: {
                    id: id_user
                },
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    email: true
                }
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Datos carregados con suceso",
                datos: getPerfil
            }
        )
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                message: "Error al carregar los datos",
                error: error.message
            }
        )
    }
}

//MÉTODO LISTAR USUARIOS
const getUser = async (req: Request, res: Response) => {
    try {
        let limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const users = await User.find({
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true
            },
            take: limit,
            skip: skip
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

//MÉTODO BUSCAR USUARIO POR EMAIL
const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email;
        const name = req.query.name;

        interface queryFiltersI {
            email?: string
            name?: string
        }

        let queryFilters: queryFiltersI = {}

        if (email) {
            queryFilters.email = email as string
        }

        if (name) {
            queryFilters.name = name as string
        }

        const users = await User.find(
            {
                where: queryFilters,
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    email: true,
                    role_id: true
                }
            }
        )

        res.status(200).json({
            success: true,
            message: "Usuario encontrado con suceso",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar usuario",
            error: error
        })
    }
}
//MÉTODO EDITAR USUARIO POR PIRFIL (RETIFICAR)
const getupdateUser = async (req: Request, res: Response) => {
    try {

        const id_user = req.tokenData.roleId;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;

        //COMPROVAR SI USUARIO EXISTE
        const findMyPerfil = await User.findOne(
            {
                where: {
                    id: id_user
                }
            }
        )
        if (!findMyPerfil) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        // ACTUALIZAR LOS DATOS DE USUARIO
        const userUpdate = await User.update(
            {
                id: id_user
            },
            {
                name: name,
                lastname: lastname,
                email: email
            }
        )
        res.status(200).json({
            success: true,
            message: "Usuario actualizado con suceso",
            data: userUpdate
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar usuario",
            error: error.message
        })
    }
}

//MÉTODO DELETE USUARIO
const deleteUserById = async (req: Request, res: Response) => {
    try {
        const users = req.params.id;

        const userToRemove: any = await User.findOneBy(
            {
                id: parseInt(users)
            }
        )

        const deletado = await User.delete(userToRemove);
        
        res.status(200).json({
            success: true,
            message: "Usuario eliminado con suceso",
            data: deletado
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al intentar eliminar usuario",
            error: error
        })
    }
}

export {
    myPerfil, getUser, getUserByEmail, getupdateUser, deleteUserById
}
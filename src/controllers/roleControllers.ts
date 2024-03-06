
import { Request, Response } from "express";
import { Role } from "../models/Role";
import { User } from "../models/User";

//MÉTODO CREAR ROLES PARA LOS USUARIOS
const createRoles = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;

        if (name.length > 50) {
            return res.status(400).json({
                success: true,
                message: "El nombre es muy largo"
            })
        }

        const newRole = await Role.create({
            name: name
        }).save()

        res.status(200).json({
            success: true,
            message: "Roles Creado"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear Role",
            errro: error
        })

    }
}

//MÉTODO ACTUALIZAR ROLE
const updateRoles = async (req: Request, res: Response) => {
    try {
        const users = req.params.id;
        const role_id = req.body.role_id;

        //COMPROVAR SI USUARIO EXISTE
        const user = await User.findOneBy(
            {
                id: parseInt(users)
            }
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        // ACTUALIZAR LOS DATOS DE USUARIO
        const userUpdate = await User.update(
            {
                id: parseInt(users)
            },
            {
                role_id: role_id
            },
        )
        res.status(200).json({
            success: true,
            message: "Roles actualizado con suceso",
            data: userUpdate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al intentar actualizar el role",
            error: error
        })
    }
}

/////// MÉTODO ELIMINAR ROLE
const deleteRole = async (req: Request, res: Response) => {
    try {
        const id_role = req.params.id;

        const buscarRole = await Role.findOne(
            {
                where: {
                    id: parseInt(id_role)
                }
            }
        )

        if (!buscarRole) {
            return res.status(404).json({
                success: false,
                message: "Este role no existe"
            })
        }

        const eminar = await Role.remove(buscarRole)
        res.status(200).json({
            success: true,
            message: "Role eliminado con suceso"
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "Error al intentar eliminar role"
        })
    }
}

export{
    createRoles, updateRoles, deleteRole
}
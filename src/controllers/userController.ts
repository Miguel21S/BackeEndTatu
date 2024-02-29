import { Request, Response } from "express";
import { User } from "../models/User";
import { Role } from "../models/Role";

//MÉTODO LISTAR USUARIOS
const getUser = async (req: Request, res: Response) => {
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
const crearUser = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;

        if (name.length > 50) {
            return res.status(400).json({
                success: true,
                message: "El nombre es muy largo"
            })
        }

        const newRole = await User.create({
            name: name,
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

//MÉTODO EDITAR USUARIO POR
const getupdateUser = async (req: Request, res: Response) => {
    try {
        const users = req.params.id;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;

        //COMPROVAR SI USUARIO EXISTE
        const firstUser = await User.findOneBy({
            id: parseInt(users)
        });

        if (!users) {
            return res.status(400).json({
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
                name: name,
                lastname: lastname,
                email: email
            },
        )
        res.status(200).json({
            success: true,
            message: "Usuario actualizado con suceso",
            data: userUpdate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar usuario",
            error: error
        })
    }
}

//MÉTODO BUSCAR USUARIO POR EMAIL
const getUserByEmail = async (req: Request, res: Response) => {
    try {

        const email = req.body.email;
        //COMPROVAR SI USUARIO EXISTE
        const user = await User.findBy({
            email: email
        })

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        res.status(200).json({
            success: true,
            message: "Usuario encontrado",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar usuario",
            error: error
        })
    }
}

//MÉTODO ACTUALIZAR ROLE
const updateRoles = async(req: Request, res: Response) => {
    try {
        const users = req.params.id;
        const name = req.body.name;
        //COMPROVAR SI USUARIO EXISTE
        const user = await User.findOneBy({
            id: parseInt(users)

        }
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario encontrado"
            })
        }

        // ACTUALIZAR LOS DATOS DE USUARIO
        const userUpdate = await Role.update(
            {
                id: parseInt(users)
            },
            {
                name: name
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

//MÉTODO DELETE USUARIO
const deleteUserById = async (req: Request, res: Response) => {
    try {
        const users = req.params.id;
        const name = req.body.name;

        //COMPROVAR SI USUARIO EXISTE
        const userToRemove: any = await User.findOneBy(
            {
                id: parseInt(users)
            }
        )

        const deletado = await User.delete(userToRemove);
        //DEVOLVER LA RESPUESTA TRUE
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

export { getUser, crearUser, getupdateUser, getUserByEmail, updateRoles, deleteUserById }
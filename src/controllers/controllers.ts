
import { Request, Response } from "express";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { Service } from "../models/Service";

//MÉTODO CREAR ROLES
const crearRoles = async (req: Request, res: Response) => {
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

//MÉTODO ACTUALIZAR ROLE {*}
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
const eliminarRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const buscarRole = await Role.findOne(
            {
                where: {
                    id: parseInt(id)
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

//MÉTODO DELETE USUARIO
const deleteUserById = async (req: Request, res: Response) => {
    try {
        const users = req.params.id;

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

//////// MÉTODO CREAR SERVICIO
const crearServicio = async (req: Request, res: Response) => {
    try {
        const service_name = req.body.service_name;
        const description = req.body.description;

        const servicio = await Service.create(
            {
                service_name: service_name,
                description: description
            }
        ).save()

        res.status(200).json({
            success: true,
            message: "Servicio creado con suceso"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear servicios",
            error: error
        })
    }
}

//////////MÉTODO VER TODO LOS SERVICIOS
const getServices = async (req: Request, res: Response) => {
    try {
        const id_user = req.tokenData.roleId;

        const getServicios = await Service.find(
            {
                select: {
                    id: true,
                    service_name: true,
                    description: true
                }
            }
        )
        console.log(id_user)
        res.status(200).json(
            {
                success: true,
                message: "Servicios encontrado con suceso",
                datos: getServicios
            }
        )
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                message: "Error al carregar los servicios",
                error: error.message
            }
        )
    }
}

////////// MÉTODO EDITAR SERVICIO
const editarServicio = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;
        const service_name = req.body.service_name;
        const description = req.body.description;

        const buscarServicio = await Service.findOneBy({ id: parseInt(serviceId) })

        if (!buscarServicio) {
            return res.status(404).json({
                success: false,
                message: "No existe el servicio"
            })
        }

        const updateService = await Service.update(
            { id: parseInt(serviceId) },
            {
                service_name: service_name,
                description: description
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Servicio actualizado con suceso"
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar servicios",
            error: error
        })

    }
}

////////// MÉTODO ELIMINAR SERVICIO
const deleteServicio = async (req: Request, res: Response) => {
    try {
        const serviceId = parseInt(req.params.id);

        const buscarServicio = await Service.findOne(
            {
                where: {
                    id: serviceId
                }
            }
        )

        if (!buscarServicio) {
            return res.status(404).json({
                success: false,
                message: "No existe el servicio"
            })
        }
        const eliminar = await Service.remove(buscarServicio)

        res.status(200).json(
            {
                success: true,
                message: "Servicio eliminado con suceso"
            }
        )
    } catch (error) {
        res.status(200).json(
            {
                success: false,
                message: "Error al intentar eliminar servicio"
            }
        )
    }
}
export {
    crearRoles, getUser, updateRoles,
    getUserByEmail, deleteUserById,
    crearServicio, getServices, editarServicio,
    deleteServicio, eliminarRole
}
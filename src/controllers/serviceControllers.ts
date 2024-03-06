
import { Request, Response } from "express";
import { Service } from "../models/Service";

//////// MÉTODO CREAR SERVICIO
const createServicio = async (req: Request, res: Response) => {
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
        
        const getServicios = await Service.find(
            {
                select: {
                    id: true,
                    service_name: true,
                    description: true
                }
            }
        )

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
const updateServicio = async (req: Request, res: Response) => {
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

export{
    createServicio, getServices, updateServicio, deleteServicio
}

import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Service } from "../models/Service";
import { User } from "../models/User";

///// MÉTODO CREAR CITAS
const createAppointments = async (req: Request, res: Response) => {
    try {
        // const user_id = req.params.id;
        // const { user_id, services_id } = req.body
        const user_id = req.tokenData.roleId;
        const services_id = req.body.services_id;

        const findUserId = await User.findOne(
            {
                where: {
                    id: user_id
                }
            }
        )
        const findServices_id = await Service.findOne(
            {
                where: {
                    id: services_id
                }
            }
        )

        if (!findUserId || !findServices_id) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Usuario o Servicio no encontrado"
                }
            )
        }

        const cita = await Appointment.create(
            {
                user_id: user_id,
                services_id: services_id
            }
        ).save()

        res.status(200).json({
            success: true,
            message: "Cita marcada con succeso"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear la cita",
            error: error
        })
    }
}

//MÉTODO QUE LISTA TODOS LAS CITAS DE UN USUARIO LOGUIADO
const myAppointments = async (req: Request, res: Response) => {
    try {
        const user_id = req.tokenData.roleId;
        const services_id = req.body.services_id;

        const findUser = await User.findOne(
            {
                where: {
                    id: user_id
                }
            }
        )
        const findServices = await Service.findOne(
            {
                where: {
                    id: services_id
                }
            }
        )

        if (!findUser || !findServices) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Citas no encotradas"
                }
            )
        }
        const findAllCitas = await Appointment.find(
            {
                where: {
                    user: {
                        id: user_id
                    }
                },
            }
        )

        res.status(200).json(
            {
                success: true,
                message: "Lista de citas encontradas",
                data: findAllCitas
            }
        )
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                message: "Error en encontrar todas las citas",
                error: error.message
            }
        )

    }
}

////////////////           MÉTODO BUSCAR CITAS
const searchAppointmentsPorId = async (req: Request, res: Response) => {
    try {
        const id_user = req.tokenData.roleId;
        const id_appointment = Number(req.params.id);

        const findCita = await Appointment.findOne(
            {
                where: {
                    id: id_appointment,
                    user: {
                        id:id_user
                    }
                },
                select:{
                    id: true,
                    services_id: true,
                    appointments_date: true
                }
            }
        )

        if (!findCita) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No existe la cita"
                }
            )
        }

        // const findAppointments = await Appointment.findOne(
        //     {
        //         where: {
        //             id: id_appointment
        //         },
        //         select:{
        //             id:true,
        //             services_id:true,
        //             appointments_date:true
        //         }
        //     }
        // )

        res.status(200).json(
            {
                success: true,
                message: "Cita encontrada con suceso",
                data:findCita
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error al buscar la cita"
            }
        )

    }
}
// // //MÉTODO ACTUALIZAR CITA
const updateAppointments = async (req: Request, res: Response) => {
    try {
        const id_appointments = req.body.id;
        const user_id = req.tokenData.roleId;
        const services_id = req.body.services_id;

        const findAppointment = await Appointment.findOne(
            {
                where: {
                    id: id_appointments,
                    user: { id: user_id },
                }
            }
        )

        if (!findAppointment) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Datos introducidos no coinciden con los datos de la cosulta"
                }
            )
        }

        const actualizando = await Appointment.update(
            {
                id: id_appointments,
                user: {
                    id: user_id
                },
            },
            {
                id: id_appointments,
                services_id: services_id
            }
        )
        res.status(200).json(
            {
                success: true,
                message: "Cita actualizada con suceso",
                data: actualizando
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la cita",
            error: error
        })
    }
}
export {
    createAppointments, myAppointments, searchAppointmentsPorId, updateAppointments
}
import { Request, Response } from "express";
import { User } from "../models/User";
import { Service } from "../models/Service";
import { Appointment } from "../models/Appointment";

// // // // MÉTODOS VER PERFIL
const myPerfil = async (req: Request, res: Response) => {
    try {
        const id_user = req.tokenData.roleId;

        
        const verPerfil = await User.findOne(
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
                datos: verPerfil
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
///// MÉTODO CREAR CITAS
const Appointments = async (req: Request, res: Response) => {
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

        console.log(findUserId);
        console.log(findServices_id)

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

// // //MÉTODO ACTUALIZAR CITA
const actualizarCita = async (req: Request, res: Response) => {
    try {
        const id_appointments = req.body.id;
        const user_id = req.tokenData.roleId;
        const services_id = req.body.services_id;

        const findAppointment = await Appointment.findOneBy(
            {
                id: id_appointments
            }
        )

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
                    message: "Datos introducidos no coinciden con los datos de la cosulta"
                }
            )
        }

        const actualizando = await Appointment.update(
            {
                id: id_appointments,
                user_id: user_id,
            },
            {
                services_id: services_id
            }
        )
        res.status(200).json(
            {
                success: true,
                message: "Cita actualizada con suceso"
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

export { myPerfil, getupdateUser, Appointments, actualizarCita }
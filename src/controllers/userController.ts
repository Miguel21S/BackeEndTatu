import { Request, Response } from "express";
import { User } from "../models/User";
import { Service } from "../models/Service";
import { Appointment } from "../models/Appointment";

///// MÉTODO CREAR CITAS
const Appointments = async (req: Request, res: Response) => {
    try {
        // const user_id = req.params.id;
        const { user_id, services_id } = req.body
        const findUserId = await User.findOneBy(
            {
                id: parseInt(user_id)
            }
        )
        const findServices_id = await User.findOneBy(
            {
                id: parseInt(services_id)
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
                user_id: parseInt(user_id),
                services_id: parseInt(services_id)
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

//MÉTODO EDITAR USUARIO POR PIRFIL (RETIFICAR)
const getupdateUser = async (req: Request, res: Response) => {
    try {
        console.log(req.tokenData);
        
        const id = req.tokenData.roleId;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;
        console.log(id);
        //COMPROVAR SI USUARIO EXISTE
        const findMyPerfil = await User.findOne(
            {
                where: {
                    id: id
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
                id: id
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

export { getupdateUser, Appointments }
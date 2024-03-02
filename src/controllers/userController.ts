import { Request, Response } from "express";
import { User } from "../models/User";
// import { Service } from "../models/Service";
// import { Appointment } from "../models/Appointment";

///// MÉTODO CREAR CITAS
/*
const Appointments = async (req: Request, res: Response) => {
    try {
        const user_id = req.params.id;
        const services_id = req.params.id;

        const userFind = await User.findBy({ id: parseInt(user_id) })
        const servicesFind = await Service.findBy( { id: parseInt(services_id) })

        if(!userFind || !servicesFind){
            return res.status(404).json({
                success: false,
                message: "Usuario y Servicio no existen"
            })
        }

        const cita = await Appointment.create(
            {
                user_id:user_id,
                services_id:services_id
            }
        ).save();
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
}*/
//MÉTODO EDITAR USUARIO POR PIRFIL (RETIFICAR)
const getupdateUser = async (req: Request, res: Response) => {
    try {
        const users = req.params.id;
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;

        //COMPROVAR SI USUARIO EXISTE

        if (!users) {
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

export { getupdateUser }
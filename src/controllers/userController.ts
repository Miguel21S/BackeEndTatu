import { Request, Response } from "express";
import { User } from "../models/User";
// import { Appointment } from "../models/Appointment";
// import { Service } from "../models/Service";

//MÉTODO EDITAR USUARIO POR PIRFIL (RETIFICAR)
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

export { getupdateUser}
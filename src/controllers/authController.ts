
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/User';


export const registro = async (req: Request, res: Response) => {
    try {
        
        const name = req.body.name;
        const lastname = req.body.lastname
        const email = req.body.email;
        const password = req.body.password

        if ((password.length < 6) && (password.length > 10)) {
            return res.status(400).json({
                success: false,
                message: "La contraseña tiene que ser mayor que 7 y menor que 20"
            })
        }

        // VALIDACIÓN DEL EMAIL
        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "formato de email invalido"
                }
            )
        }

        // ENCRIPTACIÓN DEL PASSWORD
        const passwordEncrypted = bcrypt.hashSync(password, 8)

        // CREACIÓN DEL USUARIO
        // console.log(passwordEncrypted);

        const newUser = await User.create(
            {
                name: name,
                lastname: lastname,
                email: email,
                password: passwordEncrypted,
                role: {
                    id: 1
                }
            }
        ).save();

        res.status(200).json({
            success: true,
            message: "Usuario registrado con successo"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering",
            error: error
        })
    }
}




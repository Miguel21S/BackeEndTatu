
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { User } from '../models/User';

//MÉTODO REGISTRAR USUARIO
export const register = async (req: Request, res: Response) => {
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

// ///// MÉTODO REGISTRAR ADMIN Y SUPERADMIN
export const registerAdministradores = async (req: Request, res: Response) => {
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
                    id: 3
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

//////////      MÉTODO LOGIN
export const login = async (req: Request, res: Response) => {
    try {
         // RECUPERAR LA INFORMACIÓN
         const email = req.body.email;
         const password = req.body.password;

         // VALIDACIÓN DE EMAIL Y PASSWORD
         if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email y Password incorrecto"
            })
         }

         const user = await User.findOne(
            {
                where:{
                    email:email
                },
                relations:{
                    role: true
                },
                select:{
                    id:true,
                    password:password,
                    email:email
                }
            }
         )
         if(!user){
            return res.status(400).json({
                success: false,
                message: "Datos invalidos"
            })
         }
        const validarPassword = bcrypt.compareSync(password, user.password);
        if(!validarPassword){
            return res.status(400).json({
                success: false,
                message: "Password invalidos"
            })
        }

        //CREAR TOKEN
        const token = Jwt.sign(
            {
                roleId: user.id,
                roleName: user.role.name
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2h"
            }
        )

        res.status(200).json({
            success: true,
            message: "Se ha loguiado con suceso",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al intentar registrarse",
            error: error
        })
    }
}




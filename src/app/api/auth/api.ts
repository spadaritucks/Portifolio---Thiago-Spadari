'use server'

import prisma from "@/lib/prisma"
import jwt from 'jsonwebtoken'; // Certifique-se de instalar a biblioteca jsonwebtoken
import bcrypt from 'bcrypt';


export const LoginAPI = async (email: string, password: string) => {

    const user = await prisma.users.findFirst({
        where: {
            email: email,
            password: password
        }
    })




    if (user) {
        return {
            status: 200,
            message: 'Login realizado com sucesso',
            token: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '1h' }),
            user: user
        }
    } else {
        return {
            status: 401,
            message: 'Email ou senha inválidos',
            
        }
    }

}

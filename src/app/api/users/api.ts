import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';


interface UserProps {
    id: number;
    name: string;
    email: string;
    password: string;
}


// Server Action para buscar todos os usuários
export async function GET() {
    try {
        const users = await prisma.users.findMany();
        return { status: true, users };
    } catch (error: any) {
        return { status: false, message: "Erro ao buscar usuários: " + error.message };
    }
}


// Server Action para criar um usuário
export async function POST(data: FormData) {
    try {
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.get('password') as string, saltRounds);

        const newUser = await prisma.users.create({
            data: {
                name: data.get('name') as string,
                email: data.get('email') as string,
                password: hashedPassword
            },
        });
        return { status: true, message: "Usuário criado com sucesso", user: newUser };
    } catch (error: any) {
        return { status: false, message: "Erro ao criar usuário: " + error.message };
    }
}

// Server Action para atualizar um usuário
export async function UPDATE(id: number, data: FormData) {
    try {
        const updatedUser = await prisma.users.update({
            data: {
                name: data.get('name') as string,
                email: data.get('email') as string,
            },
            where: {
                id: id,
            },
        });
        return { status: true, message: "Usuário atualizado com sucesso", user: updatedUser };
    } catch (error: any) {
        return { status: false, message: "Falha ao atualizar o usuário: " + error.message };
    }
}

// Server Action para deletar um usuário
export async function DELETE(id: number) {
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: id,
            },
        });
        return { status: true, message: "Usuário deletado com sucesso", user: deletedUser };
    } catch (error: any) {
        return { status: false, message: "Erro ao deletar o usuário: " + error.message };
    }
}

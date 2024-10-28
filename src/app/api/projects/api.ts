'use server'
import prisma from "@/lib/prisma";
import multer from "multer";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';




export async function GET() {
    try {
        const projetos = await prisma.projetos.findMany();
        const technologies = await prisma.projetos_Technologies.findMany()
        return { status: true, projetos: projetos, technologies: technologies }
    } catch (error: any) {
        return { status: false, message: "Erro ao buscar os projetos: " + error.message };
    }
}


export async function POST(formData: FormData) {
    try {
        // Processa o upload da imagem
        const projectImage = formData.get('project_image') as File;
        const uploadDir = path.resolve('public/uploads'); // Mudei para 'public/uploads'
        const timePath = Date.now();
        const uniqueFileName = `${timePath}_${projectImage.name}`;
        const uploadPath = path.join(uploadDir, uniqueFileName);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const buffer = await projectImage.arrayBuffer();
        fs.writeFileSync(uploadPath, Buffer.from(buffer));

        const newProject = await prisma.projetos.create({
            data: {
                title: formData.get('title') as string,
                project_image: `/uploads/${uniqueFileName}`, // Armazenando caminho relativo
                company: formData.get('company') as string,
                description: formData.get('description') as string,
                git_link_1: formData.get('git_link_1') as string,
                git_link_2: formData.get('git_link_2') as string,
                project_link: formData.get('project_link') as string,
                projetos: {
                    create: formData.getAll('tecnologies[]').map((tech: FormDataEntryValue) => ({ technologies: tech as string })),
                }
            }
        });

        return { status: true, message: "Projeto criado com sucesso ", project: newProject };
    } catch (error: any) {
        return { status: false, message: "Falha ao criar o projeto : " + error.message };
    }
}

export async function UPDATE(id: number, formData: FormData) {
    try {
        // Processa o upload da imagem
        const projectImage = formData.get('project_image') as File;
        const uploadDir = path.resolve('public/uploads'); // Mudei para 'public/uploads'
        const timePath = Date.now();
        const uniqueFileName = `${timePath}_${projectImage.name}`;
        const uploadPath = path.join(uploadDir, uniqueFileName);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const buffer = await projectImage.arrayBuffer();
        fs.writeFileSync(uploadPath, Buffer.from(buffer));

        const updatedProject = await prisma.projetos.update({
            where: {
                id: id,
            },
            data: {
                title: formData.get('title') as string,
                project_image: `/uploads/${uniqueFileName}` || null, // Armazenando caminho relativo
                company: formData.get('company') as string,
                description: formData.get('description') as string,
                git_link_1: formData.get('git_link_1') as string,
                git_link_2: formData.get('git_link_2') as string,
                project_link: formData.get('project_link') as string,
                projetos: {
                    set: [], // Limpa as tecnologias existentes
                    create: formData.getAll('tecnologies[]').map((tech: FormDataEntryValue) => ({ technologies: tech as string }))
                }
            }
        });
        return { status: true, message: "Projeto atualizado com sucesso ", project: updatedProject };
    } catch (error: any) {
        return { status: false, message: "Falha ao atualizar o projeto : " + error.message };
    }
}

export async function DELETE(id: number) {
    try {
        const deletedProject = await prisma.projetos.delete({
            where: {
                id: id,
            },
        });
        return { status: true, message: "Projeto deletado com sucesso", project: deletedProject };
    } catch (error: any) {
        return { status: false, message: "Erro ao deletar o usuário: " + error.message };
    }
}

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
        if (!projectImage) {
            return { status: false, message: "Imagem do projeto é obrigatória." };
        }

        const timePath = Date.now();
        const uniqueFileName = `${timePath}_${projectImage.name}`;
        const tempUploadDir = '/tmp'; // Diretório temporário em ambiente serverless
        const tempUploadPath = path.join(tempUploadDir, uniqueFileName);

        // Criação do buffer para salvar no diretório temporário
        const buffer = await projectImage.arrayBuffer();
        fs.writeFileSync(tempUploadPath, Buffer.from(buffer));

        // Salvar o caminho relativo da imagem no banco de dados
        const newProject = await prisma.projetos.create({
            data: {
                title: formData.get('title') as string,
                project_image: `/uploads/${uniqueFileName}`, // Ajuste para refletir o caminho final após upload permanente
                company: formData.get('company') as string,
                description: formData.get('description') as string,
                git_link_1: formData.get('git_link_1') as string,
                git_link_2: formData.get('git_link_2') as string,
                project_link: formData.get('project_link') as string,
                projetos: {
                    create: formData
                        .getAll('tecnologies[]')
                        .map((tech: FormDataEntryValue) => ({ technologies: tech as string })),
                },
            },
        });

        // Note: Em ambientes serverless, mova o arquivo do /tmp para um serviço de armazenamento em nuvem
        // como S3 para armazenamento permanente. Este é apenas um exemplo básico.

        return { status: true, message: "Projeto criado com sucesso", project: newProject };
    } catch (error: any) {
        return { status: false, message: "Falha ao criar o projeto: " + error.message };
    }
}

export async function UPDATE(id: number, formData: FormData) {
    try {
        let projectImagePath: string | null = null; // Inicializa como nulo

        // Verifica se uma nova imagem foi enviada
        const projectImage = formData.get('project_image') as File;
        if (projectImage) {
            const timePath = Date.now();
            const uniqueFileName = `${timePath}_${projectImage.name}`;
            const tempUploadDir = '/tmp'; // Diretório temporário em ambiente serverless
            const tempUploadPath = path.join(tempUploadDir, uniqueFileName);

            // Criação do buffer para salvar no diretório temporário
            const buffer = await projectImage.arrayBuffer();
            fs.writeFileSync(tempUploadPath, Buffer.from(buffer));

            projectImagePath = `/uploads/${uniqueFileName}`; // Define o caminho relativo da imagem
        }

        // Atualiza o projeto, incluindo project_image apenas se uma nova imagem foi enviada
        const updatedProject = await prisma.projetos.update({
            where: {
                id: id,
            },
            data: {
                title: formData.get('title') as string,
                project_image: projectImagePath ? projectImagePath : undefined, // Atualiza apenas se projectImagePath não for nulo
                company: formData.get('company') as string,
                description: formData.get('description') as string,
                git_link_1: formData.get('git_link_1') as string,
                git_link_2: formData.get('git_link_2') as string,
                project_link: formData.get('project_link') as string,
                projetos: {
                    set: [], // Limpa as tecnologias existentes
                    create: formData
                        .getAll('tecnologies[]')
                        .map((tech: FormDataEntryValue) => ({ technologies: tech as string })),
                },
            },
        });

        // Observação: transfira o arquivo do `/tmp` para um serviço de armazenamento permanente, como S3.
        // Isso evita perda de dados quando o ambiente serverless é reciclado.

        return { status: true, message: "Projeto atualizado com sucesso", project: updatedProject };
    } catch (error: any) {
        return { status: false, message: "Falha ao atualizar o projeto: " + error.message };
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

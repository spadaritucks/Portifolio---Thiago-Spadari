"use server";
import { DELETE, GET, POST, UPDATE } from "./api";

 // Indica que este arquivo contém Server Actions

export async function getProjects(){
    const response = await GET();
    return response;
}

export async function createProject(formdata: FormData) {
    const response = await POST(formdata);
    return response;
}

export async function updateProject(id:number, formData:FormData){
    const response = await UPDATE(id, formData)
    return response
}

export async function deleteProject(id:number){
    const response = await DELETE(id)
    return response
}
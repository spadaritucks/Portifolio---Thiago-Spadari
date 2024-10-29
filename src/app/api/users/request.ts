'use server'

import { DELETE, GET, POST, UPDATE } from "./api"


export async function getUsers(){
    const response = await GET()
    return response
}

export async function createUser(formdata: FormData){
    const response = await POST(formdata)
    return response
}

export async function updateUser(userId: number, formdata: FormData){
    const response = await UPDATE(userId, formdata)
    return response
}

export async function deleteUser(userId: number){
    const response = await DELETE(userId)
    return response
}
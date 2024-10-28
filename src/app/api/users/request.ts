'use server'

import { POST } from "./api"

export async function createUser(formdata: FormData){
    const response = await POST(formdata)
    return response
}
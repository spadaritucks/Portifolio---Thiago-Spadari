'use server'

import { LoginAPI } from "./api"

export const handleLogin = async (email: string, password: string) => {
    
    try{
         const response = await LoginAPI(email, password)

         return{
            status: response.status,
            message: response.message,
            token: response.token,
            user: response.user,
          
         }
        
    }catch(error: any){
        // Aqui você pode adicionar um tratamento de erro mais robusto
        return {
            status: false,
            message: 'Erro ao tentar realizar o login. Tente novamente mais tarde.'
        };
    }
}

'use client'
import Input from "@/components/inputs";
import '@/Assets/css/pages-styles/login.css'
import { useRef, useState } from "react";
import { handleLogin } from "../api/auth/request";


export default function Login() {

    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formRef.current){
            const formdata = new FormData(formRef.current)
            const email = formdata.get('email') as string
            const password = formdata.get('password') as string

            setLoading(true);
            const response = await handleLogin(email, password);
            setLoading(false);

            if(response){
                if(response.status === 401){
                    alert(response.message)
                }else{
                    if(response.token && response.user){
                        alert(response.message)
                        sessionStorage.setItem('token', response.token)
                        sessionStorage.setItem('user', JSON.stringify(response.user))
                        window.location.href = '/admin'
                    }
                }
            }
       
    }
}
   

    return (
        <section className="login-content">
            <div className="login-area">
                <h2>Login Admin</h2>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <Input label="Email" type="email" placeholder="mauro@domain.com" name="email" />
                    <Input label="Password" type="password" name="password" />
                    <button type="submit" disabled={loading}>Login</button>
                    {loading && <p>Carregando...</p>}
                </form>
            </div>
        </section>
    );
}

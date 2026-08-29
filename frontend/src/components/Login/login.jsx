import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import "./login.css";
import Footer from '../Footer';
import Header from '../Header';
import Hero from '../Hero';


function Login (){
    const [username, setUserName]= useState("");
    const [password, setPassword]= useState("");
    const [erro, setErro]=useState("");
   
    const handleSubmit =async (event)=>{
        event.preventDefault();
        setErro('');

        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Enviado com sucesso!");
                window.location.replace ('/admin/');
            } else {
                setErro(data.message || "Usuário ou senha inválidos.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
    <div className='pagina-conteiner' >
    <Header />
    <Hero />
    <div className="conteiner">
        <form onSubmit={handleSubmit}>
            <h1>Login Administrativo</h1>
            <div>
                <input type ='text' placeholder="Nome"
                onChange={(e) =>setUserName(e.target.value)}/>
                <FaUser className='icon' />
            </div>
            <div>
                <input type="password" placeholder="Senha"
                onChange={(e)=>setPassword(e.target.value)}/>
                <FaLock className="lock" />
            </div>
            {erro && <p className="mensagem-erro">{erro}</p>}
            <button>Entrar</button>
        </form>
    </div>
    <Footer />
    </div>
    )
}
export default Login
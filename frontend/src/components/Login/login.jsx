import { FaUser, FaLock } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import "./login.css";


function Login (){
    const [username, setUserName]= useState("");
    const [password, setPassword]= useState("");

    const handleSubmit =(event)=>{
        event.preventDefault();
        console.log("Envio");
    };

    return
    <div className="conteiner">
        <form onSubmit={handleSubmit}>
            <h1>Login Administrativo</h1>
            <div>
                <input type ='email' placeholder="E-mail"
                onChange={(e) =>setUserName(e.target.value)}/>
                <FaUserme  className='icon' />
            </div>
            <div>
                <input type="password" placeholder="Senha"
                onChange={(e)=>setPassword(e.target.value)}/>
                <FaLock className="lock" />
            </div>
            <button>Entrar</button>
        </form>
    </div>

}
export default Login
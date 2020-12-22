import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdKeyboardTab} from 'react-icons/md';
import './styles.css';

import api from '../../services/api';

import logo from '../../assets/images/logo_login.png'

export default function Logon(){
    const [nome_cliente, setNome_cliente] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        const data = {
            nome_cliente,
            password,
        };
        
        try {
            const response = await api.post('session',data);
            if(response.data.length !== 0){
                localStorage.setItem('clienteId', response.data[0].clienteId);
                history.push('/history');
            }
        } catch (error) {
            alert('tente novamente');
        }
    }
    

    return (
        <div className="logon-container">
            

            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input placeholder='Insira seu Email ou nome' value ={nome_cliente} onChange={e => setNome_cliente(e.target.value)}/>
                    <input type="password" placeholder='Insira sua senha' value ={password} onChange={e => setPassword(e.target.value)}/>
                    <button className="button"type='submit'>Entrar</button>
                        <Link className="link" to="/register">
                            <MdKeyboardTab size={16} color="#979c38"/>
                            Não tenho cadastro
                        </Link>
                </form>
            </section>
            <img src={logo} alt="capa do melhor salão"/>
        </div>
    );
}
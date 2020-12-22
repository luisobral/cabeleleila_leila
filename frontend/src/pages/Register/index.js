import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdKeyboardReturn} from 'react-icons/md';

import api from '../../services/api';

import './styles.css';

import capa from '../../assets/images/capa_register.jpg';

export default function Register(){
    const [nome_cliente,setNome_cliente] = useState('');
    const [email,setEmail] = useState('');
    const [cel,setCel] = useState('');
    const [rg,setRg] = useState('');
    const [cpf,setCpf] = useState('');
    const [password,setPassword] = useState('');
    const [passwordconfirm,setPasswordconfirm] = useState('');
    
    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();
        
        if(password.length >= 8){
            if(password === passwordconfirm){
                const data = {
                    nome_cliente,
                    email,
                    password,
                    cel,
                    rg,
                    cpf,
                };
                
                try {
                    await api.post('cliente',data);
                    history.push('/');
                } catch (error) {
                    alert('Erro no cadastro, tente novamente');
                }
            }else{
                alert('Senhas divergentes');
            }
        }else{
            alert('O mínimo para uma senha são 8 caracteres');
        }

        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={capa} alt="Cabelo Maravilhoso"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro para poder marcar seu horário no melhor salão de todos</p>

                    <Link className="link" to="/">
                        Já tenho cadastro
                        <MdKeyboardReturn size={16} color="#979c38"/>
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Insira seu Nome" value={nome_cliente} onChange={e => setNome_cliente(e.target.value)}/>
                    <input type="email" placeholder="Insira seu Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="text" placeholder="Insira seu Celular" maxlength="14" value={cel} onChange={e => setCel(e.target.value)}/>
                    <div className="input-group">
                        <input type="text" placeholder="Insira seu Cpf" maxlength="11" style={{width:210}} value={cpf} onChange={e => setCpf(e.target.value)}/>
                        <input type="text" placeholder="Insira seu Rg" maxlength="9" style={{width:210}} value={rg} onChange={e => setRg(e.target.value)}/>
                    </div>
                    <input type="password" placeholder="Insira sua Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirme sua senha" value={passwordconfirm} onChange={e => setPasswordconfirm(e.target.value)}/>

                    
                    <button className="button" type='submit'>Cadastrar</button>
                </form>

            </div>
        </div>
    );
}
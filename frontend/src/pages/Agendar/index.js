import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../navbar';

import "./styles.css";

export default function Agendar(){
    const [tipo_serv, setTipo_serv] = useState([]);
    const [func, setFunc] = useState([]);
    const [tipo, setTipo] = useState('');
    const [funcionarioId, setFuncionarioId] = useState('');
    var hoje = new Date().toISOString().substr(0,16);
    const [horario, setHorario] = useState(`${hoje}`);
    const clienteId = localStorage.getItem('clienteId');

    useEffect(() => {
        api.get('tipo').then(response => {
            setTipo_serv(response.data);
        });
        api.get('funcionario/'+tipo).then(response => {
            setFunc(response.data)
        });
    } , [tipo]); 
    const history = useHistory();
    function voltar(){
        history.push('/history')
    }
    async function handleAgendar(e){
        e.preventDefault();
        const data = {
            horario,
            funcionarioId,
        };
        
        try {
            if(funcionarioId === ''){
                alert("insira o Funcionario")
            }else{
            await api.post('horario',data,{headers: {
                authorization: clienteId,}});
            history.push('/history');
            }
        } catch (error) {
            alert('Este horário já está confirmado para este funcionário, tente novamente');
        }

    }
    return(
        <div className="todo">
            <Navbar/>
            <div className="agendar-container">
                <div className="content">
                    <form onSubmit={handleAgendar} onReset={voltar}>
                        <input type="datetime-local"  value={horario} onChange={e => setHorario(e.target.value)}/>
                        <div className="select">
                            <select onChange={e => setTipo(e.target.value)}>
                            <option value="">Escolha o tipo de serviço...</option>
                                {tipo_serv.map(tipo =>(
                                    <option key={tipo.tipoId} value={tipo.tipoId}>{tipo.nome_tipo}</option>
                                ))}
                            </select>
                        </div>
                        <div className="select">                            
                            <select onChange={e => setFuncionarioId(e.target.value)}>
                            <option value="">Escolha o funcionario...</option>
                            {func.map(funcionario =>(
                                    <option key={funcionario.funcionarioId} value={funcionario.funcionarioId}>{funcionario.nome_func}</option>
                                ))}
                            </select>
                        </div>
                        <button className="button" type='reset'>Voltar</button>
                        <div></div>
                        <button className="button"  type='submit'>Agendar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
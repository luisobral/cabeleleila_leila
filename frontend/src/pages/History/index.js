import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Navbar from '../navbar';

import api from '../../services/api';

import './styles.css'

export default function History(){
    const [clientes, setClientes] = useState([]);
    var hoje = new Date().toISOString().substr(0,10);
    const [horario, setHorario] = useState(hoje);
    const clienteId = localStorage.getItem('clienteId');
    const history = useHistory();
    async function Alterarhorario(e){
        const confirmar = await api.get('horario/verificardata/'+e);
        if(confirmar.data.return !== 0){
            localStorage.setItem('horarioId',e);
            localStorage.setItem('horario',confirmar.data.horario);
            history.push('/horario/alterar');
        }
    }
        
    useEffect(() => {
        api.get('historico',{headers: {
            authorization: clienteId,
            time:horario,
        }}).then(response => {
            setClientes(response.data);
        });
    } , [horario]); 
    


    return (
        <div className="todo">
            <Navbar/>
            <div className="history-container">
                <div className="history-initial">
                    <h1>Historico de Horários</h1>
                    <div className="select">
                        <label>Escolha o mês que deseja: </label>
                            <input type="date" value={horario} onChange={e => setHorario(e.target.value)}/>
                        </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de serviço</th>
                            <th>Funcionário</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Alterar</th>
                        </tr>
                    </thead>
                    <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.horarioId}>
                                    <th>{cliente.nome_tipo}</th>
                                    <th>{cliente.nome_func}</th>
                                    <th>{cliente.horario.substr(0,16)}</th>
                                    <th>R${cliente.valor},00</th>
                                    <th>
                                        <button className="button" value={cliente.horarioId} onClick={e => Alterarhorario(e.target.value)}>Alterar</button>
                                    </th>
                                </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};
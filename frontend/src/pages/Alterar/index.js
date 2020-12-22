import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../navbar';

import "./styles.css";

export default function Agendar(){
    const horariostorage = localStorage.getItem('horario');
    const [horario, setHorario] = useState(horariostorage);
    const clienteId = localStorage.getItem('clienteId');
    const horarioId = localStorage.getItem('horarioId');

    
    const history = useHistory();
    async function voltar(){
        await api.delete('horario/'+horarioId);
        history.push('/history')
    }
    async function handleAlterar(e){
        e.preventDefault();
        const data = {
            horario,
        };
        console.log(horario,horarioId);
        try {
            
            const res = await api.post('horario/alterar/'+horarioId,data);
            
            history.push('/history');
            
        } catch (error) {
            alert('Este horário já está confirmado para este funcionário, tente novamente');
        }

    }
    return(
        <div className="todo">
            <Navbar/>
            <div className="agendar-container">
                <div className="content">
                    <form onSubmit={handleAlterar} onReset={voltar}>
                        <input type="datetime-local"  value={horario} onChange={e => setHorario(e.target.value)}/>
                        
                        <button className="button" type='reset'>Desmarcar</button>
                        <button className="button"  type='submit'>Agendar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
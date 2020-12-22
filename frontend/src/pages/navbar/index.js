import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdPowerSettingsNew} from 'react-icons/md'

import './styles.css'

import logo from '../../assets/images/logo_login_menor.png'
export default function Navbar(){
    const history = useHistory();

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }
    return (
        <div className="profile-container">
            <div className="profile-navbar">    
                <header>
                    <Link to="/history" style={{margin:0}}>
                        <img src={logo} alt="Cabeleleila leila"/>
                    </Link>
                    <Link className="button" to="/history">Ver histórico</Link>
                    <Link className="button" to="/agendar">Marcar horário</Link>
                    <button type='button' onClick={handleLogout}>
                        <MdPowerSettingsNew/>
                    </button>
                </header>
            </div>
        </div>
    );
}
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Agendar from './pages/Agendar';
import History from './pages/History';
import Alterar from './pages/Alterar';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/agendar" component={Agendar}/>
                <Route path="/history" component={History}/>
                <Route path="/horario/alterar" component={Alterar}/>
            </Switch>
        </BrowserRouter>
    );
}
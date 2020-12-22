const express = require('express');
const TipoController = require('./controllers/TipoController');
const FuncionarioController = require('./controllers/FuncionarioController');
const HorarioController = require('./controllers/HorarioController');
const ClienteController = require('./controllers/ClienteController');
const AlterarHorarioController = require('./controllers/AlterarHorarioController');
const HistoricoController = require('./controllers/HistoricoController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.get('/tipo', TipoController.index);
routes.post('/tipo', TipoController.create);
routes.delete('/tipo/:id', TipoController.delete);

routes.get('/funcionario/:id', FuncionarioController.index);
routes.post('/funcionario', FuncionarioController.create);
routes.delete('/funcionario/:id', FuncionarioController.delete);

routes.post('/session', SessionController.index);

routes.get('/horario', HorarioController.index);
routes.post('/horario', HorarioController.create);
routes.delete('/horario/:id', HorarioController.delete);

routes.get('/horario/verificardata/:id', AlterarHorarioController.verificardata);
routes.put('/horario/alterar/:id', AlterarHorarioController.alterar);
routes.put('/horario/confirmar/:id', AlterarHorarioController.confirmar);

routes.get('/historico', HistoricoController.index);

routes.get('/cliente', ClienteController.index);
routes.post('/cliente', ClienteController.create);
routes.put('/cliente/:id', ClienteController.delete);

module.exports = routes;
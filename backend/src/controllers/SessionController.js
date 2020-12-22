const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const {nome_cliente, password} = request.body;

        const session = await connection('cliente').whereRaw('nome_cliente = ?',[nome_cliente])
        .andWhereRaw('password = ?', [password])
        .orWhereRaw('email = ?', [nome_cliente])
        .select('clienteId');
        return response.json(session);
    },

}
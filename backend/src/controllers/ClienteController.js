const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const cliente = await connection('cliente').select('*');
    
        return response.json(cliente);
    },

    async create(request, response){
        const {nome_cliente,email,password,cpf,rg,cel}= request.body;
        const ativo = true;
        const clienteId = crypto.randomBytes(4).toString('HEX');

        await connection('cliente').insert({
            nome_cliente,
            email,
            password,
            cpf,
            rg,
            cel,
            ativo,
            clienteId,
        })


        return response.status(200).send();
    },
    async delete(request,response){
        const {id} = request.params;

        await connection('cliente').where('clienteId',id).update({
            ativo : false
        });
        
        return response.status(204).send();
    }
}
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const tipo = await connection('tipo').select('*');
    
        return response.json(tipo);
    },

    async create(request, response){
        const {nome_tipo}= request.body;

        await connection('tipo').insert({
            nome_tipo,
        })


        return response.status(200).send();
    },
    async delete(request,response){
        const {id} = request.params;

        const tipo = await connection('tipo').where('tipoId',id).delete();
        
        return response.status(204).send();
    }
}
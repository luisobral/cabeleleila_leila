const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {id} = request.params;
        const funcionario = await connection('funcionario').select('*')
        .whereRaw('tipoId = ?', [id]);
    
        return response.json(funcionario);
    },

    async create(request, response){
        const {nome_func,valor,tipoId}= request.body;

        await connection('funcionario').insert({
            nome_func,
            valor,
            tipoId,
        })


        return response.status(200).send();
    },
    async delete(request,response){
        const {id} = request.params;

        await connection('funcionario').where('funcionarioId',id).delete();
        
        return response.status(204).send();
    }
}
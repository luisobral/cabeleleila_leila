const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const horario = await connection('horario').select('*');
    
        return response.json(horario);
    },

    async create(request, response){
        const {horario,funcionarioId}= request.body;
        const clienteId = request.headers.authorization;
        const status = false;
        const horarioId = clienteId+horario;
        const consultahorario = funcionarioId+horario;
        const res = await connection('horario').where('consultahorario',consultahorario).select(1);
        if(res.length==0)
        {
            await connection('horario').insert({
                horario,
                funcionarioId,
                clienteId,
                status,
                horarioId,
                consultahorario,
            })
        return response.status(200).send();
        }else{
            response.status(404).send();
        }
    },
    async delete(request,response){
        const {id} = request.params;

        await connection('horario').where('horarioId',id).delete();
        
        return response.status(204).send();
    },

}
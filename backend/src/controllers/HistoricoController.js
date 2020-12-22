const connection = require('../database/connection');
const knex = require('knex');

module.exports = {
    async index(request,response){
        const clienteId = request.headers.authorization;
        const data = request.headers.time;

        
        var id = JSON.stringify(clienteId).substr(1,8);

        var datacerta = JSON.stringify(data).substr(1,10).split('-');
        var mes = parseInt(datacerta[1])+1;
        if(mes>10){
            if(mes==13){
                datacerta = ""+JSON.stringify(parseInt(datacerta[0])+1)+"-01-"+datacerta[2];
            }else{
                datacerta = ""+datacerta[0]+"-"+JSON.stringify(parseInt(datacerta[1])+1)+"-"+datacerta[2];
            }
        }else{
            datacerta = ""+datacerta[0]+"-0"+mes+"-"+datacerta[2];
        }
        const retorno = await connection('horario')
        .innerJoin('funcionario','horario.funcionarioId','=','funcionario.funcionarioId')
        .innerJoin('tipo','tipo.tipoId','=','funcionario.tipoId')
        .innerJoin('cliente','cliente.clienteId', knex.raw('?', [id]))
        .whereRaw('ativo = ?', [1])
        .andWhereRaw('horario.clienteId = ?', [id])
        .whereBetween('horario.horario',[data,datacerta])
        .select('*');
        return response.json(retorno);
    }
}
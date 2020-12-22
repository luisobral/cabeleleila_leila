const { json } = require('express');
const connection = require('../database/connection');

module.exports = {
    async verificardata (request,response) {
        const {id} = request.params;
        const retorno = await connection('horario').where('horarioId',id).andWhere('status',0).select().first();
        if(retorno !== undefined){
            var horario = JSON.stringify(retorno);
            var marcado = horario.substr(22,10).split('-');
            
            var data = new Date();
            var mes = data.getMonth() + 1;
            var hoje = data.getDate();
            var mensal =parseInt(marcado[1],10) - mes;
            if ( mensal >=0){
                if(parseInt(marcado[2],10)+ (30*mensal) - hoje >= 2){
                return response.json({
                    "return" : 1,
                    "horario": horario.substr(22,16),
                })
                }
            }
        }
        return response.json({
            "return" : 0
        })
    },
    async alterar(request,response){
        const {id} = request.params;
        const {horario} = request.body;

        const passagem = JSON.stringify(id).substr(1,24);
        var novoID = JSON.stringify(id).substr(1,8) + horario;
        console.log(passagem);
        const retorno = await connection('horario').where('horarioId',passagem).andWhere('status',0).update({
            horarioId: novoID,
            horario: horario
        });
        
        return response.status(200).send();

    },
    async confirmar(request,response){
        const {id} = request.params;

        const passagem = JSON.stringify(id).substr(1,27);
        const retorno = await connection('horario').where('horarioId',passagem).andWhere('status',0).update({
            status : 1
        });
        if(retorno !== null){
            return response.status(200).send();
        }else{
            return response.status(404).send();
        }
    }
}

exports.up = function(knex) {
    return knex.schema.createTable('cliente', function (table) {
        table.string("clienteId").primary();
        table.string('nome_cliente').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();  
        table.string('cpf').notNullable();
        table.string('rg').notNullable();
        table.string('cel').notNullable();  
        table.boolean('ativo').notNullable(); 
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cliente');
};

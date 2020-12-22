
exports.up = function(knex) {
    return knex.schema.createTable('funcionario', function (table) {
        table.increments('funcionarioId');
        table.string('nome_func').notNullable();
        table.integer('valor').notNullable();
        table.string('tipoId').notNullable();


        table.foreign('tipoID').references('tipoId').inTable('tipo');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('funcionario');
};

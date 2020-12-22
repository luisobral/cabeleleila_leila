
exports.up = function(knex) {
    return knex.schema.createTable('tipo', function (table) {
        table.increments('tipoId');
        table.string('nome_tipo').notNullable();
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tipo');
};

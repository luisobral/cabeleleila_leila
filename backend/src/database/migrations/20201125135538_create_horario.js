
exports.up = function(knex) {
    return knex.schema.createTable('horario', function (table) {
        table.string("horarioId").primary();
        table.datetime('horario').defaultTo(knex.fn.now()).notNullable();
        table.string('funcionarioId').notNullable();
        table.boolean('status').notNullable();
        table.string('clienteId').notNullable();
        table.string('consultahorario').notNullable();


        table.foreign('funcionarioId').references('funcionarioId').inTable('funcionario');
        table.foreign('clienteId').references('clienteId').inTable('cliente');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('horario');
};

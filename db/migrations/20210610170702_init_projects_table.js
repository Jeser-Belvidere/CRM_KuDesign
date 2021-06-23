
exports.up = function(knex) {
    return knex.schema.createTable('projects', table =>{
        table.increments('project_id').unique().primary()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.user_id')
        table.string('adress')
        table.boolean('autor_status').defaultTo('false')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects')
};

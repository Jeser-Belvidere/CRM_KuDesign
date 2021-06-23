
exports.up = function(knex) {
    return knex.schema.createTable('request_access', table =>{
        table.increments('request_id').unique().primary()
        table.integer('user_name')
        table.string('mobile_phone')
        table.string('email')
        table.string('data')
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('request_access')
};


exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
      table.increments('user_id').unique().primary()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('first_name')
      table.string('last_name')
      table.string('mobile_phone')
      table.boolean('isadmin').defaultTo('false')
      table.string('activity')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};

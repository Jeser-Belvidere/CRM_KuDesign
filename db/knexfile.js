// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    version: '13.0',
    connection: 'postgres://dbmanager:qwerty@localhost:5432/kurm',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },




/*
  development: {
    client: 'postgresql',
    version: '13.0',
    connection: {
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.USERPASSWORD,
      port: process.env.DBPORT,
      host:process.env.DBHOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
*/
};

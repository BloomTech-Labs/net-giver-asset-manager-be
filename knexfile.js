// Update with your config settings.
// require('dotenv').config('/.env');

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/netGiver.sqlite3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  staging: {
    client: "sqlite3",
    connection: {
      filename: "./data/staging.sqlite3"
    },
    useDefaultAsTrue: true,
    migrations: {
      directory: "./data/migrations"
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

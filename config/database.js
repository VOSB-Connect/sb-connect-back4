const path = require('path');

module.exports = ({ env }) => {
  return env === "production"
    ? {
        connection: {
          client: "postgres",
          connection: {
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
            ssl: {
              rejectUnauthorized: false, // For self-signed certificates
            },
          },
          debug: false,
        },
      }
    : {
        connection: {
          client: "sqlite",
          connection: {
            filename: path.join(
              __dirname,
              "..",
              env("DATABASE_FILENAME", ".tmp/data.db")
            ),
          },
          useNullAsDefault: true,
        },
      };
};

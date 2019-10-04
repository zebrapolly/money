const mongoConfig = {
  url: 'localhost',
  port: 32768,
  database: 'money'
}


module.exports = {
  apps : [{
    name: 'API',
    script: 'cd api && npm i && npm start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      MONGO_URL: mongoConfig.url,
      MONGO_PORT: mongoConfig.port,
      MONGO_DB: mongoConfig.database
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, 
  {
    name: 'worker',
    script: 'cd parser && npm i && npm start',
    cron_restart: '*/15 * * * *',
    autorestart: false,
    env: {
      NODE_ENV: 'development',
      MONGO_URL: mongoConfig.url,
      MONGO_PORT: mongoConfig.port,
      MONGO_DB: mongoConfig.database
    }
  },
  {
    name: 'migration',
    script: 'cd api && npm run migrate',
    autorestart: false,
    env: {
      NODE_ENV: 'development',
      MONGO_URL: mongoConfig.url,
      MONGO_PORT: mongoConfig.port,
      MONGO_DB: mongoConfig.database
    }
  }
],
};

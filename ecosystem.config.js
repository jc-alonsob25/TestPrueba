module.exports = {
    apps : [{
      name   : "payroll",
      script : "./server.js",
      env_production: {
         NODE_ENV: "production",
         MONGO_URI: process.env.MONGO_URI,
         PORT: process.env.PORT
      },
      env_development: {
         NODE_ENV: "development",
         MONGO_URI: process.env.MONGO_URI,
         PORT: process.env.PORT
      }
    }]
  }
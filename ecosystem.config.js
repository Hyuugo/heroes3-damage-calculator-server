module.exports = {
  apps : [{
    name: "server",
    script: "./server.js",
    node_args: "--max-old-space-size=128",
    max_memory_restart: "128M",
    restart_delay: "1000",
    log_date_format: "DD-MM-YYYY HH:mm Z",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}

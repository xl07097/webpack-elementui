module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '192.1.6.55',
      ref  : 'origin/master',
      repo: 'git@192.1.6.46:xl07097/webpack-test.git',
      path: '/home/www/sports',
      'post-deploy': 'npm install && npm run build'
      // 'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

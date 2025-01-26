module.exports = {
    apps: [
        {
            name: 'ielts',
            script: 'npm',
            args: 'run start',
            cwd: process.cwd(),
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};
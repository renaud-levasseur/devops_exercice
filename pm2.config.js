module.exports = {
    apps: [{
        name: 'API CI/CD',
        script: 'server.js',
        node_args: '-r dotenv/config'
    }]
}
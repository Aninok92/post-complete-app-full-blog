const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER ) {
        return {
            env: {
                mongodb_username: 'aninok92',
                mongodb_password: 'k7qH3VAqsw1jJgzB',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'my-site-dev',
                NEXTAUTH_SECRET: 'upYyhOxRV/I0T5l5BrjI5+ZNF19CevZbFzFOW9IinVU='
            }
        }
    }

    return {
        env: {
            mongodb_username: 'aninok92',
            mongodb_password: 'k7qH3VAqsw1jJgzB',
            mongodb_clustername: 'cluster0',
            mongodb_database: 'my-site',
            NEXTAUTH_SECRET: 'upYyhOxRV/I0T5l5BrjI5+ZNF19CevZbFzFOW9IinVU='
        }
    }
}
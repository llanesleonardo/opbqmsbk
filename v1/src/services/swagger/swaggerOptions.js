const { format } = require("sequelize/lib/utils");


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API',
            version: '1.0.0',
            description: 'API'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Developement server API',
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-KEY',
                },
            },
            schemas: {
                Projects: {
                    type: 'object',
                    required: [],
                    properties: {
                        id: {
                            type: 'integer'
                        }
                    }
                },
            },

            responses: {
                400: {
                    description: 'the record was not found'
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

module.exports = options;
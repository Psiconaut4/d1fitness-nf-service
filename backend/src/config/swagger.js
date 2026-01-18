import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'D1 Fitness NF Service',
      version: '1.0.0',
      description: 'API para listagem de vendas, geração e envio de DANFE e XML por email.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)

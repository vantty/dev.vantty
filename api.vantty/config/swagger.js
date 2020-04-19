const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  apis: ['./routes/*.js'],
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Vantty API',
      description: '',
    },
    host: 'localhost:5000',
    basePath: '/api',
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
      User: {
        type: 'object',
        properties: {
          method: {
            type: 'string',
          },
          methodId: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          mobileNumber: {
            type: 'string',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          password: {
            type: 'string',
            format: 'password',
          },
          resetPasswordToken: {
            type: 'string',
          },
          resetPasswordExpires: {
            type: 'string',
          },
          profile: {
            type: 'object',
            properties: {
              original: {
                type: 'string',
              },
              cloudId: {
                type: 'string',
              },
            },
          },
          confirmed: {
            type: 'boolean',
          },
          role: {
            type: 'string',
          },
          stripeCustomerId: {
            type: 'string',
          },
          cards: {
            type: 'array',
            items: {
              properties: {
                stripeCardId: {
                  type: 'string',
                },
                fingerPrint: {
                  type: 'string',
                },
                brand: {
                  type: 'string',
                },
                expMonth: {
                  type: 'string',
                },
                expYear: {
                  type: 'string',
                },
                last4: {
                  type: 'string',
                },
              },
            },
          },
          bookings: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
};

module.exports = swaggerJSDoc(options);

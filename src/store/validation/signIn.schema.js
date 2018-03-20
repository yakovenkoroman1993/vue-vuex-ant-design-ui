export default {
    type: 'object',
    properties: {
        login: {
            type: 'string',
            minLength: 3,
            maxLength: 10,
        },
        password: {
            type: 'string',
            minLength: 6,
        }
    },
    required: ['login', 'password']
}
export default () => ({
    app: {
        port: parseInt(process.env.PORT, 10) || 3000,
        environment: process.env.NODE_ENV || 'development',
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        name: process.env.DB_NAME || 'mydatabase',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'mysecretkey',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
});
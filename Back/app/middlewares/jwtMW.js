const jwt = require('../services/jwt');
const dbCache = require('../services/cache')

module.exports = async (request, response, next) => {
    try {
        let token = request.headers['authorization'];
        if(!token) {
            return response.status(401).json('Invalid token')
        }
        const payload = jwt.validateToken(token);
        let cachedToken = await dbCache.get(`user-0${payload.data}`);
        if(!payload.data) {
            return response.status(401).json('Invalid token')
        }
        if(token !== cachedToken) {
            return response.status(401).json('No longer valid token')
        }
        request.userId = payload.data;
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json(error.message);
    }
}
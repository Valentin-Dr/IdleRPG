const User = require('../models/user');
const jwt = require('../services/jwt');
const dbCache = require('../services/cache')

module.exports = {
    subscribe: async (request, response) => {
        try {
            const user = await new User(request.body).save();
            const token = jwt.makeToken(user.id);
            response.setHeader('Authorization', token);
            await dbCache.set("user-0"+user.id, token, {EX: 4*60*60, NX: false});
            response.status(201).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message)
        }
    },

    login: async (request, response) => {
        try {
            const user = await new User(request.body).doLogin();
            const token = jwt.makeToken(user.id);
            response.setHeader('Authorization', token);
            await dbCache.set("user-0"+user.id, token, {EX: 4*60*60, NX: false});
            response.status(200).json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message)
        }
    },

    getInfos: async (request, response) => {
        try {
            const infos = {
                message: 'ceci est un message obtenu de qui a fait la requête'
            };
            const token = jwt.makeToken(request.userId);
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            await dbCache.set("user-0"+request.userId, token, {EX: 4*60*60, NX: false});
            response.status(200).json(infos);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message)
        }
    }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    async findByEmail(email) {
        const user = await user_entity_1.User.findOne({ where: { email } });
        return user;
    }
    async findById(id) {
        const user = await user_entity_1.User.findByPk(id, { attributes: { exclude: ['password'] } });
        return user;
    }
    async findBySearch(search) {
        const users = await user_entity_1.User.findAll({ where: { username: { [sequelize_2.Op.iLike]: `%${search}%` } } });
        return users;
    }
    async createUser({ email, username, password }) {
        const user = await user_entity_1.User.create({
            email,
            username,
            password
        });
        return user;
    }
    async updateUser(user) {
        try {
            const updatedUser = await user_entity_1.User.update(user, { where: { id: user.id } });
            return updatedUser;
        }
        catch (_a) {
            return {
                statusCode: '409',
                message: 'This username is already in use.'
            };
        }
    }
    async getFriends({ id }) {
        try {
            const friends = [];
            const friendIds = (await user_entity_1.User.findByPk(id)).friends;
            for (let i = 0; i < friendIds.length; i++) {
                const user = await user_entity_1.User.findByPk(friendIds[i]);
                friends.push(user);
            }
            return {
                statusCode: '200',
                friends
            };
        }
        catch (error) {
            return {
                statusCode: '404',
                message: 'Friends not found.'
            };
        }
    }
    async setFriend({ id, otherId, status }) {
        const firstUser = await this.findById(id);
        const secondUser = await this.findById(otherId);
        if (!firstUser || !secondUser)
            throw new exceptions_1.NotFoundException('User not found.');
        if ((firstUser.blocked && firstUser.blocked.includes(otherId)) ||
            (secondUser.blocked && secondUser.blocked.includes(id)))
            return {
                status: '406',
                message: 'You cannot do this. You are blocked.'
            };
        if (status && firstUser.friends && firstUser.friends.includes(otherId))
            return {
                statusCode: '409',
                message: 'You are already friend.'
            };
        if (status) {
            this.setRequest({ id: otherId, otherId: id, status: false });
            user_entity_1.User.update({ friends: sequelize_1.default.fn('array_append', sequelize_1.default.col('friends'), otherId) }, { where: { id } });
            user_entity_1.User.update({ friends: sequelize_1.default.fn('array_append', sequelize_1.default.col('friends'), id) }, { where: { id: otherId } });
        }
        else {
            user_entity_1.User.update({ friends: sequelize_1.default.fn('array_remove', sequelize_1.default.col('friends'), otherId) }, { where: { id } });
            user_entity_1.User.update({ friends: sequelize_1.default.fn('array_remove', sequelize_1.default.col('friends'), id) }, { where: { id: otherId } });
        }
        return {
            statusCode: '200',
            message: 'User updated successfully.'
        };
    }
    async getRequests({ id }) {
        try {
            const requests = [];
            const requestIds = (await user_entity_1.User.findByPk(id)).requests;
            for (let i = 0; i < requestIds.length; i++) {
                const user = await user_entity_1.User.findByPk(requestIds[i]);
                requests.push(user);
            }
            return {
                statusCode: '200',
                requests
            };
        }
        catch (_a) {
            return {
                statusCode: '404',
                message: 'Requests not found.'
            };
        }
    }
    async setRequest({ id, otherId, status }) {
        const firstUser = await this.findById(id);
        const secondUser = await this.findById(otherId);
        if (!firstUser || !secondUser)
            throw new exceptions_1.NotFoundException('User not found.');
        if ((firstUser.blocked && firstUser.blocked.includes(otherId)) ||
            (secondUser.blocked && secondUser.blocked.includes(id)))
            return {
                status: '406',
                message: 'You cannot do this. You are blocked.'
            };
        if (status && secondUser.friends && secondUser.friends.includes(id))
            return {
                statusCode: '406',
                message: 'You are already friends.'
            };
        if (status && secondUser.requests && secondUser.requests.includes(id))
            return {
                statusCode: '409',
                message: 'You already sent a request to this user.'
            };
        if (status) {
            user_entity_1.User.update({ requests: sequelize_1.default.fn('array_append', sequelize_1.default.col('requests'), id) }, { where: { id: otherId } });
        }
        else {
            user_entity_1.User.update({ requests: sequelize_1.default.fn('array_remove', sequelize_1.default.col('requests'), id) }, { where: { id: otherId } });
        }
        return {
            statusCode: '200',
            message: 'User updated successfully.'
        };
    }
    async getBlocked({ id }) {
        try {
            const blocked = [];
            const blockedIds = (await user_entity_1.User.findByPk(id)).blocked;
            for (let i = 0; i < blockedIds.length; i++) {
                const user = await user_entity_1.User.findByPk(blockedIds[i]);
                blocked.push(user);
            }
            return {
                statusCode: '200',
                blocked
            };
        }
        catch (_a) {
            return {
                statusCode: '404',
                message: 'Blocked not found.'
            };
        }
    }
    async setBlocked({ id, otherId, status }) {
        const firstUser = await this.findById(id);
        const secondUser = await this.findById(otherId);
        if (!firstUser || !secondUser)
            throw new exceptions_1.NotFoundException('User not found.');
        if (status && firstUser.blocked && firstUser.blocked.includes(otherId))
            return {
                statusCode: '409',
                message: 'This user has already been blocked.'
            };
        this.setRequest({ id, otherId, status: false });
        if (status) {
            await this.setFriend({ id, otherId, status: false });
            await this.setRequest({ id, otherId, status: false });
            user_entity_1.User.update({ blocked: sequelize_1.default.fn('array_append', sequelize_1.default.col('blocked'), otherId) }, {
                where: { id }
            });
        }
        else {
            user_entity_1.User.update({ blocked: sequelize_1.default.fn('array_remove', sequelize_1.default.col('blocked'), otherId) }, {
                where: { id }
            });
        }
        return {
            statusCode: '200',
            message: 'User updated successfully.'
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
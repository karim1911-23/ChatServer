"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const message_entity_1 = require("../message/message.entity");
const user_entity_1 = require("../user/user.entity");
const channel_entity_1 = require("./channel.entity");
let ChannelService = class ChannelService {
    async getChannel(id) {
        try {
            const channel = await channel_entity_1.Channel.findByPk(id);
            const participants = [];
            for (let i = 0; i < channel.participants.length; i++) {
                const user = await user_entity_1.User.findByPk(channel.participants[i]);
                participants.push(user);
            }
            channel.participants = participants;
            return channel;
        }
        catch (_a) {
            return {
                statusCode: '404',
                message: 'Channel not found.'
            };
        }
    }
    async getChannelsByUser(userId) {
        try {
            const channels = await channel_entity_1.Channel.findAll({
                where: {
                    participants: {
                        [sequelize_1.Op.contains]: [userId]
                    }
                },
                order: [['updatedAt', 'DESC']],
                attributes: { exclude: ['messages', 'createdAt'] }
            });
            const lastMessages = [];
            for (let i = 0; i < channels.length; i++) {
                const lastMessage = await message_entity_1.Message.findOne({
                    where: { channelId: channels[i].id },
                    order: [['createdAt', 'DESC']]
                });
                lastMessages.push(lastMessage);
            }
            return {
                lastMessages,
                channels
            };
        }
        catch (_a) {
            return {
                statusCode: '404',
                message: 'User or channel not found.'
            };
        }
    }
    async createChannel({ participants, admins, image, name, description }) {
        try {
            const channel = await channel_entity_1.Channel.create({ participants, admins, image, name, description });
            console.log(channel);
            return {
                statusCode: '201',
                message: 'Channel created successfully.',
                channel
            };
        }
        catch (error) {
            return {
                status: '400',
                message: error
            };
        }
    }
    async updateChannel({ id, channel }) {
        try {
            await channel_entity_1.Channel.update(channel, { where: { id } });
            return {
                statusCode: '200',
                message: 'Channel updated successfully.'
            };
        }
        catch (_a) {
            return {
                statusCode: '404',
                message: 'Channel not found.'
            };
        }
    }
    async deleteChannel(id) {
        try {
            await channel_entity_1.Channel.destroy({ where: { id } });
            return {
                statusCode: '200',
                message: 'Channel deleted successfully.'
            };
        }
        catch (_a) {
            return {
                statusCode: '404',
                message: 'Channel not found.'
            };
        }
    }
};
ChannelService = __decorate([
    (0, common_1.Injectable)()
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map
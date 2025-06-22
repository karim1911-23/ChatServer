"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const channel_entity_1 = require("../channel/channel.entity");
const message_entity_1 = require("../message/message.entity");
const user_entity_1 = require("../user/user.entity");
exports.databaseProviders = [
    {
        provide: "SEQUELIZE",
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize("postgresql://neondb_owner:npg_jaMc2QP1KRJw@ep-lively-band-a5oc9isq-pooler.us-east-2.aws.neon.tech/neondb", {
                dialect: "postgres",
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
                logging: false,
            });
            sequelize.addModels([user_entity_1.User, message_entity_1.Message, channel_entity_1.Channel]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map
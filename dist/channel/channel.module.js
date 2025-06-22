"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const message_module_1 = require("../message/message.module");
const channel_controller_1 = require("./channel.controller");
const channel_gateway_1 = require("./channel.gateway");
const channel_provider_1 = require("./channel.provider");
const channel_service_1 = require("./channel.service");
let ChannelModule = class ChannelModule {
};
ChannelModule = __decorate([
    (0, common_1.Module)({
        imports: [message_module_1.MessageModule],
        controllers: [channel_controller_1.ChannelController],
        providers: [channel_service_1.ChannelService, channel_gateway_1.ChannelGateway, ...channel_provider_1.ChannelProvider],
        exports: [channel_service_1.ChannelService]
    })
], ChannelModule);
exports.ChannelModule = ChannelModule;
;
//# sourceMappingURL=channel.module.js.map
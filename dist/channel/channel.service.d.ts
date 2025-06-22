import { Channel } from './channel.entity';
import { ChannelDto } from './dto/create-channel-dto';
export declare class ChannelService {
    getChannel(id: string): Promise<Channel | {
        statusCode: string;
        message: string;
    }>;
    getChannelsByUser(userId: string): Promise<{
        lastMessages: any[];
        channels: Channel[];
        statusCode?: undefined;
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        lastMessages?: undefined;
        channels?: undefined;
    }>;
    createChannel({ participants, admins, image, name, description }: ChannelDto): Promise<{
        statusCode: string;
        message: string;
        channel: Channel;
        status?: undefined;
    } | {
        status: string;
        message: any;
        statusCode?: undefined;
        channel?: undefined;
    }>;
    updateChannel({ id, channel }: {
        id: any;
        channel: any;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    deleteChannel(id: string): Promise<{
        statusCode: string;
        message: string;
    }>;
}

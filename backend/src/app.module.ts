import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TasksModule} from './modules/tasks/tasks.module';
import {UsersModule} from './modules/users/users.module';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from './config/configuration';
import {AuthModule} from './modules/auth/auth.module';
import {ModulesModule} from './modules/modules.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: ['environments/.env.local', 'environments/.env.development', '.env'],
        load: [configuration]
    }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({
                uri: configService.get('mongo.uri')
            }), inject: [ConfigService],
        }),
        SharedModule,
        ModulesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}



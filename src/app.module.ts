import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from './user/user.entity';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<'postgres' | 'mysql'>('DB_TYPE'),
          // entities: [User],
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get<string>('DB_HOST'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('DB_NAME'),
        }) as TypeOrmModuleOptions,
    }),
    ProfileModule,
    TweetModule,
    HashtagModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

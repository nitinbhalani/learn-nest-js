import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/user.entity';
import { ProfileModule } from './profile/profile.module';
import { TweetModule } from './tweet/tweet.module';
import { HashtagModule } from './hashtag/hashtag.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        // entities: [User],
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        username: 'admin',
        password: 'nitin9898',
        port: 5432,
        database: 'postgres',
      }),
    }),
    ProfileModule,
    TweetModule,
    HashtagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

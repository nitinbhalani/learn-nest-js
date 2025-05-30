import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/auth/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizedGuard } from 'src/auth/guard/authorize.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // this sentence secure all module route login api also protect
    // {provide: APP_GUARD,
    // useClass: AuthorizedGuard},

    {
      provide: APP_GUARD,
      useClass: AuthorizedGuard,
    },
  ],
  exports: [UserService],
})

// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'user', method: RequestMethod.GET });
//   }
// }
export class UserModule {}

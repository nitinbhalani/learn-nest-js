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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(authConfig),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UserService],
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

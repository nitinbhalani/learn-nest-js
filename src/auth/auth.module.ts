import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { BcryptProvider } from './provider/bycrpt.provider';
import { HashingProvider } from './provider/hashingProvider';

@Module({
  providers: [
    AuthService,
    { provide: HashingProvider, useClass: BcryptProvider },
  ],
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule)],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}

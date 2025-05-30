import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.SECRET_KEY,
  expiresIn: parseInt(process.env.EXPIRED_TOKEN ?? '3600', 10),
}));

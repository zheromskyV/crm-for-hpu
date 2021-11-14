import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'jwt-secret-zheromski',
  signOptions: {
    expiresIn: '12h',
  },
};

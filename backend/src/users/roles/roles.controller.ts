import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GetRolesConfigDto } from './roles.dto';
import { SkipAuth } from '../../auth/skip-auth.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @SkipAuth()
  @Get()
  async getConfig(): Promise<GetRolesConfigDto> {
    return this.rolesService.getConfig();
  }
}

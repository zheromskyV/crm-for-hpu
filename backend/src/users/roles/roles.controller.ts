import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GetRolesConfigDto } from './roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getConfig(): Promise<GetRolesConfigDto> {
    return this.rolesService.getConfig();
  }
}

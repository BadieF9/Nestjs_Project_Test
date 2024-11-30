import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLES_KEY } from './roles.decorator';
import { FarmerService } from 'src/farmer/farmer.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private farmerService: FarmerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { farmer } = context.switchToHttp().getRequest();
    const fetchedFarmer = await this.farmerService.getFarmerById(farmer.sub);

    return requiredRoles.some((role) => fetchedFarmer.roles?.includes(role));
  }
}

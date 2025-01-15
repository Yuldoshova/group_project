import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Users } from 'src/modules/users/model/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // "roles" kalitini to'g'ridan-to'g'ri ishlatamiz
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;  
    }

    const request = context.switchToHttp().getRequest();
    const user: Users = request.user;

    // Foydalanuvchi roli talab qilingan rollardan biriga mos kelsa, ruxsat beriladi
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}


  
// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly reflector: Reflector,
//   ) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       throw new UnauthorizedException('Authorization header missing');
//     }

//     const [bearer, token] = authHeader.split(' ');

//     if (bearer !== 'Bearer' || !token) {
//       throw new UnauthorizedException('Invalid authorization format');
//     }

//     try {
//       const user = this.jwtService.verify(token);
//       request.user = user;
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }

//     return true;
//   }
// }

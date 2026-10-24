import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'node:crypto';

@Injectable()
export class AdminKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const expected = process.env.ADMIN_API_KEY;
    const supplied = context.switchToHttp().getRequest().header('x-admin-key');
    if (!expected || !supplied) throw new UnauthorizedException('Chave administrativa inválida.');
    const a = Buffer.from(expected);
    const b = Buffer.from(supplied);
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new UnauthorizedException('Chave administrativa inválida.');
    return true;
  }
}

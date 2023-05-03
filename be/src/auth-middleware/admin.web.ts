import { NestMiddleware, Injectable, BadGatewayException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';
import { UserRole } from 'src/enums/enum_users';

interface RequestWithUser extends Request {
    user?: {
        email: string;
        id: number;
        permission: UserRole;
    }
}
@Injectable()
export class AdminWeb implements NestMiddleware {
    async use(req: RequestWithUser, _: Response, next: NextFunction) {
        const { permission } = req.user;
        if (permission !== UserRole.Admin) {
            throw new BadGatewayException({
                error: "error",
                message: "Bạn không có quyền truy cập"
            })
        }
        next();
    }

}
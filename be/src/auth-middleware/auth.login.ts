import { NestMiddleware, Injectable, BadGatewayException } from '@nestjs/common';
import {  JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from 'src/enums/enum_users';
import { UsersService } from '../users/users.service';


interface RequestWithUser extends Request {
   user ? : {
    email : string;
    id  : number;
    permission : UserRole;
   }
}
@Injectable()
export class AuthLogin implements NestMiddleware{
 
    constructor(private readonly userService: UsersService  ,  private jwtService: JwtService) {}

    async use(req  : RequestWithUser, res: Response , next : NextFunction){
        const authHeaders = req.headers.authorization;
        if(authHeaders && authHeaders.startsWith('Bearer') && authHeaders.split(' ')[1]){
            const token = authHeaders.split(' ')[1];
            const decodedToken = this.jwtService.verify(token);
            const  { email } = decodedToken;
            const findUserInDataBase = await this.userService.findOne(email);
            if (!findUserInDataBase){
                throw new BadGatewayException({
                    error : "error",
                    message : "Error Token"
                })
            }
            req.user = {
                email : findUserInDataBase.email,
                id :  findUserInDataBase.id,
                permission : findUserInDataBase.role
            }
            next();
        }else {
            return res.status(500).json({
                status: 'error',
                message: 'token error',
              });
        }
    }

}
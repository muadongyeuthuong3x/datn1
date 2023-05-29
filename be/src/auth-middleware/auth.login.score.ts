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
export class AuthLoginScore implements NestMiddleware{
 
    constructor(private readonly userService: UsersService  ,  private jwtService: JwtService) {}

    async use(req  : RequestWithUser, _ : Response , next : NextFunction){
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

            if(findUserInDataBase.role != UserRole._SCORE ){
                throw new BadGatewayException({
                    error : "error",
                    message : "Bạn không có quyền truy cập"
                })
            }


            req.user = {
                email : findUserInDataBase.email,
                id :  findUserInDataBase.id,
                permission : findUserInDataBase.role
            }
            next();
        }else {
            throw new BadGatewayException({
                error : "error",
                message : "Error Token"
            })
        }
    }

}
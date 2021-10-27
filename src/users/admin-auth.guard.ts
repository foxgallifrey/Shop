import {
    CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs"
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService){

    }

    canActivate(context: ExecutionContext) : boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }

            const user = this.jwtService.verify(token);
            request.user = user;

            if (user.is_admin === false){
                throw new HttpException({message: 'Нет доступа'}, HttpStatus.FORBIDDEN);
            }
            return true;

        } catch (e) {
            throw new HttpException({message: 'Нет доступа'}, HttpStatus.FORBIDDEN);
        }
    }





























}
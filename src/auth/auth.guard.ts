import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService,private configService:ConfigService

    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        // Log the entire authorization header
        console.log('Authorization Header:', request.headers['authorization']);
        
        const token = this.extractTokenFromHeader(request);
        console.log('Extracted Token:', token);  // Should log the actual token
        
        if (!token) {
            throw new UnauthorizedException();
        }
        
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('SECRET')
            });
            request['user_data'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers['authorization'] as string | undefined;
        const [type, token] = authHeader?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
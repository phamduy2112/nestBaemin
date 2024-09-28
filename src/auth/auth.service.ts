import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { responseSend } from 'src/model/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private PrismaServier:PrismaService,private jwtService:JwtService){}
  private async hashPassword(password:string){
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    const hash=await bcrypt.hash(password,salt);
    return hash
  }
  private async generaToken (payload:any){
    const access_token=await this.jwtService.signAsync(payload)
    
    return {access_token}
    }
  async register(createAuthDto:any){
    try{
      const hashPassword = await this.hashPassword(createAuthDto.password);
      const existingUser = await this.PrismaServier.user.findFirst({
        where: {
            email: createAuthDto.email,
        },
    });

    if (existingUser) {
   return responseSend('','Trùng Email',400)
    }

 const addUser= await this.PrismaServier.user.create({
        data: { ...createAuthDto, password: hashPassword },
    });
  return  responseSend(addUser,'Thành công',200)
    }catch(e){
      console.log(e);
      return  responseSend(e,'Thất bại',500)

    }
  }
  async login(createAuthDto: any) {
    const checkUser = await this.PrismaServier.user.findFirst({
        where: {
            email: createAuthDto.email,
        },
    });
  
    if (!checkUser) {
        return responseSend('', 'Email hoặc mật khẩu không tồn tại !', 400);
    }
  
    const checkPassword = await bcrypt.compare(createAuthDto.password, checkUser.password);
    if (!checkPassword) {
        return responseSend('', 'Email hoặc mật khẩu không tồn tại !', 400);
    }
  
    const payload = { id: checkUser.user_id, email: checkUser.email };
    const access_token = await this.generaToken(payload);
  
    return responseSend(access_token, 'Đăng nhập thành công!', 200);
  }

}

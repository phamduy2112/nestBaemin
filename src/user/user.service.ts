import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { responseSend } from 'src/model/response';

@Injectable()
export class UserService {
  constructor(  private PrismaService:PrismaService){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  @UseGuards(AuthGuard)  // Apply AuthGuard only to this route

  async findOne(id: number) {
    
    const data=await this.PrismaService.user.findFirst({
      where:{
        user_id:id
      }
    })
    if(!data){
      return responseSend(null,"Không tìm thấy id sản phẩm !",400);
    }
    return responseSend(data,"Thành công !",200);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

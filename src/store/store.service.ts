import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { responseSend } from 'src/model/response';

@Injectable()
export class StoreService {
  constructor(  private PrismaService:PrismaService){}

  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }
  async getStoreAll(){
    const data=await this.PrismaService.stores.findMany()
    if(!data){
      return responseSend(null,"Không tìm thấy id sản phẩm !",400);
    }
    return responseSend(data,"Thành công !",200);
  }
  async getStoreSearchPage(query:any){
    try{
      const pageIndex =Number(query.page); // Trang hiện tại, mặc định là 1
      const pageSize = 1  // Số bản ghi mỗi trang, mặc định là 10
      const search = query.search || '';       // Tìm kiếm
      // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
      console.log(search);
      
      if(!(pageIndex>0&&pageSize>0)){
        return responseSend(null, "Phải lớn hơn 0 !", 500);
  
      }
      const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua

      const findPage = await this.PrismaService.stores.findMany({
        skip,
        take: pageSize,
        where: {
          name: {
            contains: search,
            mode: 'insensitive', // Tìm kiếm không phân biệt chữ hoa/thường
          },
        },
      });
      const productSearch= await this.PrismaService.stores.findMany({
        
        where: {
          name: {
            contains: search,
          },
        },
      })
      const total=productSearch.length
      return responseSend({findPage,total}, "Thành công !", 200);
    
    }catch(e){
      return responseSend(null, "Thất bại !", 500);
  
    }
  }
  async getStoreById(id: number) {
    const data=await this.PrismaService.stores.findFirst({
      where:{
        id:id
      },
      include: {
        products: true,  
      },
    })
    if(!data){
      return responseSend(null,"Không tìm thấy id sản phẩm !",400);
    }
    return responseSend(data,"Thành công !",200);

  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}

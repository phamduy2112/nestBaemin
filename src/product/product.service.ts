import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { responseSend } from 'src/model/response';

@Injectable()
export class ProductService {
  constructor(  private PrismaService:PrismaService){}
  async create(createProductDto: any) {
    
    return 'This action adds a new product';
  }

  async getProductAll() {
    const data=await this.PrismaService.products.findMany()
    return responseSend(data,"Thành công !",200);
  }

  async getCateloryAll(){
    const data=await this.PrismaService.category.findMany()
    return responseSend(data,"Thành công !",200);
  }

  async getProductByCatelory(id:any){
    const checkCatelory=await this.PrismaService.category.findMany({
      where:{
        category_id:id
      }
    })
    if(!checkCatelory){
      return responseSend(null,"Không tìm thấy id loại !",400);

    }
    const data=await this.PrismaService.products.findMany({
      // where:{
      //   category_id:id
      // }
    })
    return responseSend(data,"Thành công !",200);
  }

  async getProductById(id: number) {
    const data=await this.PrismaService.products.findFirst({
      where:{
        id
      }
    })
    if(!data){
      return responseSend(null,"Không tìm thấy id sản phẩm !",400);
    }
    return responseSend(data,"Thành công !",200);

  }
  async findAllPageSearch(query: any) {
    try{
      const pageIndex =Number(query.page); // Trang hiện tại, mặc định là 1
      const pageSize = 1  // Số bản ghi mỗi trang, mặc định là 10
      const search = query.search || '';       // Tìm kiếm
      // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
      if(!(pageIndex>0&&pageSize>0)){
        return responseSend(null, "Phải lớn hơn 0 !", 500);
  
      }
      const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
    // Math.ceil(number)
    
      const findPage= await this.PrismaService.products.findMany({
        skip,
        take:pageSize,
        where: {
          // product_name: {
          //   contains: search,
          // },
        },
      });
      const productSearch= await this.PrismaService.products.findMany({
        
        // where: {
        //   product_name: {
        //     contains: search,
        //   },
        // },
      })
      const total=productSearch.length
      return responseSend({findPage,total}, "Thành công !", 200);
    
    }catch(e){
      return responseSend(null, "Thất bại !", 500);
  
    }
    
  }

  update(id: number, updateProductDto: any) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

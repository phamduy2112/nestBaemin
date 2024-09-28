import { Injectable } from '@nestjs/common';
import { CreateDonHangDto } from './dto/create-don-hang.dto';
import { UpdateDonHangDto } from './dto/update-don-hang.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonHangService {
  constructor(  private PrismaService:PrismaService){}

  create(createDonHangDto: CreateDonHangDto) {
    return 'This action adds a new donHang';
  }
  
  async order(model:any,userId:any){
    try{

      const listSanPham = JSON.parse(model.list_sanPham);

      const productUpdatesData = listSanPham.map(async (productItem) => {
        const product = await this.PrismaService.products.findUnique({
          where: { id: productItem.id },
          select: { id: true, inventory: true }, // Select only needed fields
        });

        if (!product) {
          throw new Error(`Sản phẩm với ID ${productItem.id} không tồn tại.`);
        } else if (product.inventory < productItem.sl) {
          throw new Error(`Số lượng sản phẩm với ID ${productItem.id} không đủ.`);
        }

        // Update inventory in transaction
        return await this.PrismaService.products.update({
          where: { id: product.id },
          data: { inventory: product.inventory - productItem.sl },
        });
      });

      // Wait for all product updates to finish before resolving
      const updatedProducts = await Promise.all(productUpdatesData);
      // order => lưu thông tin đơn hàng
      let newOrder={
          user_id:userId,
          list_sanpham:listSanPham,
          ngay_dathang:new Date()
      }



   let orderSuccess= await this.PrismaService.order.create({data:newOrder})



     
     let newShip={
      order_id:orderSuccess.order_id,
      full_name:model.full_name,
      email:model.email,
      phone:model.phone,
      address:model.address,
      ngay_dathang:new Date()
  }
  await this.PrismaService.shipping.create({data:newShip})
  return "Thành công"
  

    }
    catch(e){
      console.log(e);
      
    }
  
  }
  findAll() {
    return `This action returns all donHang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donHang`;
  }

  update(id: number, updateDonHangDto: UpdateDonHangDto) {
    return `This action updates a #${id} donHang`;
  }

  remove(id: number) {
    return `This action removes a #${id} donHang`;
  }
}

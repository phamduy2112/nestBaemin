import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get("/get-all")
  GetProductAll() {
    return this.productService.getProductAll();
  }

  @Get("/get-catelory")
  GetCateloryAll(){
    return this.productService.getCateloryAll();

  }
  @Get("/search-product")
  GetSearchPage(@Query() query:any){
    return this.productService.findAllPageSearch(query)
  }

  @Get("/get-product-by-idCate/:id")
  getProductByIdCatelory(@Param('id') id: string){
    return this.productService.getProductByCatelory(+id)
  }

  @Get('/get-product-by-id/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }
  @Get("/get-all")
  getStoreAll() {
    return this.storeService.getStoreAll();
  }

  @Get('/get-store/:id')
  getStoreById(@Param('id') id: string) {
    return this.storeService.getStoreById(+id);
  }
  @Get("/search-store")
  GetSearchPage(@Query() query:any){
    return this.storeService.getStoreSearchPage(query)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}

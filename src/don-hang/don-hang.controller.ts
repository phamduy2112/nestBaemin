import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards, Req, UnauthorizedException} from '@nestjs/common';
import { DonHangService } from './don-hang.service';
import { CreateDonHangDto } from './dto/create-don-hang.dto';
import { UpdateDonHangDto } from './dto/update-don-hang.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('don-hang')
export class DonHangController {
  constructor(private readonly donHangService: DonHangService,private jwtService:JwtService) {}


  @UseGuards(AuthGuard)  // Apply AuthGuard only to this route

  @Post()
   order(@Body() model: any, @Req() request: Request) {
    const userData = request['user_data']; // Retrieve decoded token data
    console.log(userData);
    
    if (!userData || !userData.id) {
      throw new UnauthorizedException('Invalid or missing user data');
    }

    // Proceed with the service call, passing the userId
    return this.donHangService.order(model, userData.id);
  }
}





import { Module } from '@nestjs/common';
import { DonHangService } from './don-hang.service';
import { DonHangController } from './don-hang.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({})],

  controllers: [DonHangController],
  providers: [DonHangService,PrismaService],
})
export class DonHangModule {}

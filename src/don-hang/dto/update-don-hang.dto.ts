import { PartialType } from '@nestjs/mapped-types';
import { CreateDonHangDto } from './create-don-hang.dto';

export class UpdateDonHangDto extends PartialType(CreateDonHangDto) {}

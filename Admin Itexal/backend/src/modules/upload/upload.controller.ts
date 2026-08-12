import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('admin')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('televerser-image')
  async televerserImage(@Body() body: { image: string; type?: string }) {
    return this.uploadService.televerserImage(body);
  }
}

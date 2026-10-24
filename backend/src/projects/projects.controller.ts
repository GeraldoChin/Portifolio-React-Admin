import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, UseInterceptors, UploadedFile, ParseUUIDPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminKeyGuard } from './admin-key.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

const imageUpload = FileInterceptor('image', { storage: memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get() findAll() { return this.projects.findAll(); }
  @Get(':id') findOne(@Param('id', ParseUUIDPipe) id: string) { return this.projects.findOne(id); }

  @Post()
  @UseGuards(AdminKeyGuard)
  @UseInterceptors(imageUpload)
  create(@Body() dto: CreateProjectDto, @UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif)$/ })], fileIsRequired: false })) image?: Express.Multer.File) {
    return this.projects.create(dto, image);
  }

  @Patch(':id')
  @UseGuards(AdminKeyGuard)
  @UseInterceptors(imageUpload)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProjectDto, @UploadedFile(new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif)$/ })], fileIsRequired: false })) image?: Express.Multer.File) {
    return this.projects.update(id, dto, image);
  }

  @Delete(':id')
  @UseGuards(AdminKeyGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) { return this.projects.remove(id); }
}

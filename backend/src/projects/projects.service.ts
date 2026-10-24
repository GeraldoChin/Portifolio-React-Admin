import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.module';
import { CloudinaryService } from '../storage/cloudinary.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService) {}

  findAll() { return this.prisma.project.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }); }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Projeto não encontrado.');
    return project;
  }

  async create(dto: CreateProjectDto, image?: Express.Multer.File) {
    const uploaded = image ? await this.cloudinary.upload(image.buffer) : undefined;
    return this.prisma.project.create({ data: { ...dto, techs: dto.techs || [], imageUrl: uploaded?.secure_url, imagePublicId: uploaded?.public_id } });
  }

  async update(id: string, dto: UpdateProjectDto, image?: Express.Multer.File) {
    const current = await this.findOne(id);
    const uploaded = image ? await this.cloudinary.upload(image.buffer) : undefined;
    const data: Prisma.ProjectUpdateInput = { ...dto };
    if (uploaded) { data.imageUrl = uploaded.secure_url; data.imagePublicId = uploaded.public_id; }
    const updated = await this.prisma.project.update({ where: { id }, data });
    if (uploaded && current.imagePublicId) await this.cloudinary.remove(current.imagePublicId);
    return updated;
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    const deleted = await this.prisma.project.delete({ where: { id } });
    await this.cloudinary.remove(project.imagePublicId);
    return deleted;
  }
}

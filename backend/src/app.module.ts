import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { CloudinaryModule } from './storage/cloudinary.module';

@Module({ imports: [PrismaModule, CloudinaryModule, ProjectsModule] })
export class AppModule {}

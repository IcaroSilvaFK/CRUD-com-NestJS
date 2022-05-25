import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostRepository } from './repositories/posts.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService,PrismaService,PostRepository]
})
export class PostsModule {}

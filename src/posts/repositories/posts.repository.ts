import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export class PostRepository {
  constructor(private readonly prisma:PrismaService){}

  async create(post:CreatePostDto){
    const data= await this.prisma.post.create({
      data:{
        ...post,
        author_id: post.authorEmail
      }
    })
    return data
  }
  async findALl(){
    const posts = await this.prisma.post.findMany()
  }

  async update({id,post}:{id:string,post:UpdatePostDto}){
    const response = await this.prisma.post.update({
      where:{
        id
      },
      data:{
        ...post
      }
    })
    return response
  }

  async delete({id}:{id:string}){
    await this.prisma.post.delete({
      where:{
        id
      }
    })
  }
}

import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma:PrismaService){}

  async create(post:CreatePostDto){
    const {authorEmail} = post
    const {id} = await this.prisma.user.findUnique({
      where:{
        email: authorEmail
      }
    })

    delete post.authorEmail;

    if(!id){
      throw new NotFoundError('Author not found')
    }

    const data= await this.prisma.post.create({
      data:{
        ...post,
        author:{
          connect:{
            id
          }
        }
      }
    })
    return data
  }
  async findALl(){
    const posts = await this.prisma.post.findMany({
      include:{
        author:{
          select:{
            email:true,
            name:true,
            id:true,
          }
        }
      }
    })

    return posts
  }

  async findOne({id}:{id:string}){
    const post = await this.prisma.post.findFirst({
      where:{
        id
      },
      include:{
        author:{
          select:{
            email:true,
            id:true,
            name:true,
          }
        }
      }
    })

    return post
  }

  async update({id,post}:{id:string,post:UpdatePostDto}){


    const postsExists = await this.prisma.post.findFirst({
      where:{
        id
      }
    })

    const {email} = await this.prisma.user.findFirst({
      where:{
        email: post.authorEmail
      }
    })

    if(!postsExists || !email){
      throw new NotFoundError('Post is not found')
    }

    delete post.authorEmail;

    const response = await this.prisma.post.update({
      where:{
        id
      },
      data:{
        ...post,
        author:{
          connect:{
            email
          }
        }
      },
      include:{
        author:{
          select:{
            name:true,
            email:true,
          }
        }
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
  async getPerUser({email}:{email:string}){
    const posts = await  this.prisma.post.findMany({
      where:{
        author:{
          email
        }
      }
    })

    return posts
  }
}

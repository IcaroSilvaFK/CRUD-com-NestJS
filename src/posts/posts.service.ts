import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


import { PostRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postService:PostRepository){

  }

  async create(createPostDto: CreatePostDto) {
    const post = await this.postService.create(createPostDto)

    return post
  }

  async findAll() {
    const posts = await this.postService.findALl()

    return posts
  }

  async findOne(id:string) {
    const post  = await this.postService.findOne({id})
    return post
  }

  async update(id: string,post: UpdatePostDto) {
    const postUpdate = await this.postService.update({id,post})

    return postUpdate
  }

  async remove(id: string) {

    await this.postService.delete({id})

    return {
      message:'Post remove success'
    }
  }
  async getPostPerEmail(email:string){
    const response = await this.postService.getPerUser({email})

    return response
  }
}

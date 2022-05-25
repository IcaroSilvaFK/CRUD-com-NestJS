import { Post } from "@prisma/client";

export class PostEntity implements Post{
  id: string;
  published: boolean;
  title: string;
  content: string;
  createAt: Date;
  updatedAt: Date;
  author_id: string;
}

export interface Post {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  authorId: number;
}
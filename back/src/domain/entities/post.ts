export class Post {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
  authorId: number;

  constructor(props) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }
}

export class User {
  id: number;
  name: string;
  email: string;

  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}

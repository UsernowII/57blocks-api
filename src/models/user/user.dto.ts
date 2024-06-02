export class UserDTO {
  public readonly username: string;
  public readonly password: string;
  public readonly email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

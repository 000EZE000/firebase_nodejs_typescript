import UserEntity, { useCaseUser } from "./userEntity";

export default class User implements useCaseUser {
  private lastName: string;
  private firstName: string;
  private readonly email: string;
  private password: string;
  private phone: number;
  private readonly id: string;

  constructor({ lastName, firstName, email, password, phone, id }: UserEntity) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.id = id;
  }
  public getAllProperty = () => {
    return {
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      id: this.id,
    };
  };

  public getFirstName = () => this.firstName;

  public getLastName = () => this.lastName;

  public getEmail = () => this.email;

  public getPassword = () => this.password;

  public getId = () => this.id;

  public getPhone = () => this.phone;

  public setFirstName(lastName: string) {
    this.firstName = lastName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public setPhone(phone: number) {
    this.phone = phone;
  }
}

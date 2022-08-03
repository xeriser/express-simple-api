import { UserEntity, UsersRepository } from "./users.repository";

export interface UserResponse {
  id: string;
  full_name: string;
  email: string;
  age: number;
}

export interface UserAddInput {
  full_name: string;
  email: string;
  age: number;
}

export interface UserUpdateInput extends Partial<UserAddInput> {}

export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  getAll() {}

  getById(id: string) {}

  updateById(id: string, user: UserUpdateInput) {}

  deleteById(id: string) {}

  add(user: UserAddInput) {}

  getAgeFromBirthday(birthDate: Date) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  mapEntityToResponse(user: UserEntity): UserResponse {
    const response: UserResponse = {
      id: user.id,
      full_name: user.first_name + " " + user.last_name,
      email: user.email,
      age: this.getAgeFromBirthday(new Date(user.birthday)),
    };

    return response;
  }
}

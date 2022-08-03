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
  password: string;
}

export interface UserUpdateInput extends Partial<UserAddInput> {}

export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  getAll() {}

  getById(id: string) {}

  updateById(id: string, user: UserUpdateInput) {}

  deleteById(id: string) {}

  add(user: UserAddInput) {}

  getBirthdayFromAge(age: number): Date {
    var today = new Date();
    return new Date(today.getUTCFullYear() - age, 0, 1);
  }

  getAgeFromBirthday(birthDate: Date) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  mapUpdateInput(userInput: UserUpdateInput): Partial<UserEntity> {
    const user: Partial<UserEntity> = {};
    if ("email" in userInput) {
      user.email = userInput.email;
    }

    if ("full_name" in userInput) {
      const [first_name, last_name] = userInput.full_name.split(" ");
      user.first_name = first_name;
      user.last_name = last_name;
    }

    if ("age" in userInput) {
      user.birthday = this.ageToDateString(userInput.age);
    }

    if ("password" in userInput) {
      user.password = userInput.password;
    }
    return user;
  }

  ageToDateString(age: number) {
    let birthDate = this.getBirthdayFromAge(age);
    const offset = birthDate.getTimezoneOffset();
    birthDate = new Date(birthDate.getTime() - offset * 60 * 1000);
    return birthDate.toISOString().split("T")[0];
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

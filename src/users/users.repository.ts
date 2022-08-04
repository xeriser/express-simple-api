import * as fs from "fs";
import * as path from "path";

export interface UserEntity {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birthday: string;
}

export class UsersRepository {
  private users = this.getStoredUsers();
  lastId = this.users.length;

  private getStoredUsers(): UserEntity[] {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../", "users.json"), "utf8")
    );
  }

  getAll() {
    return this.users;
  }
  getById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  add(user: Omit<UserEntity, "id">) {
    this.lastId++;
    const newUser: UserEntity = { ...user, id: "A" + this.lastId };
    this.users.push(newUser);
    return newUser;
  }

  updateById(id: string, user: Partial<Omit<UserEntity, "id">>) {
    const userRefrence = this.users.find((user) => user.id === id);

    if (!userRefrence) {
      return undefined;
    }
    for (const key in user) {
      userRefrence[key] = user[key];
    }

    return userRefrence;
  }

  deleteById(id: string) {
    const length = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    if (this.users.length === length) {
      return false;
    }
    return true;
  }
}

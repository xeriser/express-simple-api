import { UserEntity, UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

describe("users test", () => {
  const userRepo = new UsersRepository();
  const usersService = new UsersService(userRepo);

  it("should return a user without password and fullname ", () => {
    const user: UserEntity = {
      id: "A1",
      first_name: "first_nameA1",
      last_name: "last_nameA1",
      email: "first_nameA1@gmail.com",
      password: "passwordA1",
      birthday: "1992-11-12",
    };
    const result = usersService.mapEntityToResponse(user);

    expect(result).toHaveProperty("full_name");
    expect(result).not.toHaveProperty("password");
    expect(result).toHaveProperty("age");
    expect(result.age).toBe(29);
    expect(result.full_name).toBe("first_nameA1 last_nameA1");
  });

  it("should  return age from birthday", () => {
    const birthDate = new Date(1992, 11, 5);
    expect(usersService.getAgeFromBirthday(birthDate)).toBe(29);
  });

  /*
  it("should return birthday from age", () => {});

  it("should verify email uniqueness", () => {});

  it("should delete a user", () => {});

  it("should return true if user exist by id", () => {});
  */
});

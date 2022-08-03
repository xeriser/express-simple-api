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

  it("should map request body to user etity ", () => {
    const user = {
      full_name: "lotfi bouchama",
      email: "lotfi.0bouchama@gmail.com",
      age: 28,
    };

    const result = usersService.mapUpdateInput(user);

    expect(result).toHaveProperty("first_name");
    expect(result).toHaveProperty("last_name");
    expect(result).toHaveProperty("birthday");
    expect(result.first_name).toBe("lotfi");
    expect(result.last_name).toBe("bouchama");
    expect(result.birthday).toBe("1994-01-01");
  });

  /*
  it("should return birthday from age", () => {});

  it("should verify email uniqueness", () => {});

  it("should delete a user", () => {});

  it("should return true if user exist by id", () => {});
  */
});

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

  it("should map update request body to user entity ", () => {
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

  it("should map add request body to user entity ", () => {
    const user = {
      full_name: "lotfi bouchama",
      email: "lotfi.0bouchama@gmail.com",
      age: 28,
      password: "password123",
    };

    const result = usersService.mapUpdateInput(user);

    expect(result).toHaveProperty("first_name");
    expect(result).toHaveProperty("last_name");
    expect(result).toHaveProperty("birthday");
    expect(result).toHaveProperty("password");
    expect(result.first_name).toBe("lotfi");
    expect(result.last_name).toBe("bouchama");
    expect(result.birthday).toBe("1994-01-01");
    expect(result.password).toBe("password123");
  });

  it("shouldn't add user by duplicated email", () => {
    const user = {
      full_name: "lotfi bouchama",
      email: "first_nameA1@gmail.com", // existing email in users.json
      age: 28,
      password: "password123",
    };

    try {
      usersService.add(user);
    } catch (error) {
      expect(error.status).toBe(409);
    }
  });

  it("should throw not found when user does not exist", () => {
    try {
      usersService.deleteById("wrongId");
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
});

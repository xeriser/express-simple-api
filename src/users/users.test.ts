import { UsersService } from "./users.service";

describe("users test", () => {
  const usersService = new UsersService();

  it("should return a user without password and fullname and calculate age instead of birthday", () => {});

  it("should  return age from birthday", () => {
    const birthDate = new Date(1992, 11, 5);
    expect(usersService.getAgeFromBirthday(birthDate)).toBe(29);
  });

  it("should return birthday from age", () => {});

  it("should verify email uniqueness", () => {});

  it("should delete a user", () => {});

  it("should return true if user exist by id", () => {});
});

import { AppError } from "AppError";
import { AdministratorReadOneUseCase } from "../../../modules/administrators/useCases/readOne/administrator.readOne.useCase";
import { AdministratorsServiceMock } from "../mock/administrators.mock";
import { administratorsMockList } from "../mock/administrators.mockList";

function createSUT(): {
  sut: AdministratorReadOneUseCase;
  administratorServiceMock: AdministratorsServiceMock;
} {
  const administratorServiceMock = new AdministratorsServiceMock();
  const sut = new AdministratorReadOneUseCase(administratorServiceMock);

  return {
    sut,
    administratorServiceMock,
  };
}

describe("Must return a correct administrator given id or email as input", () => {
  const testPrep = createSUT();
  const administratorRepoMock = administratorsMockList[0];

  describe("Given 'id' that correspond to a administrator", () => {
    it("should return ONE 'Iadministrator' with correct id", async () => {
      const ret = await testPrep.sut.exec({
        administratorId: administratorRepoMock._id!,
        email: administratorRepoMock.email,
      });

      expect(ret).not.toBeUndefined();
      expect(testPrep.administratorServiceMock.readOne).toBeCalledTimes(1);
      expect(ret).toBe(administratorRepoMock);
    });
  });

  describe("Given 'email' that correspond to a administrator", () => {
    it("should return ONE 'Iadministrator' with correct email", async () => {
      const ret = await testPrep.sut.exec({
        administratorId: administratorRepoMock._id!,
        email: administratorRepoMock.email,
      });

      expect(ret).not.toBeUndefined();
      expect(testPrep.administratorServiceMock.readOne).toBeCalledTimes(2);
      expect(ret).toBe(administratorRepoMock);
    });
  });

  describe("Given both 'id' and 'email' that correspond to a administrator", () => {
    it("should return ONE 'Iadministrator' with correct id", async () => {
      const ret = await testPrep.sut.exec({
        administratorId: administratorRepoMock._id!,
        email: administratorRepoMock.email,
      });

      expect(ret).not.toBeUndefined();
      // the idea as to execute first for email and then for id
      expect(testPrep.administratorServiceMock.readOne).toBeCalledTimes(3);
      expect(ret).toBe(administratorRepoMock);
    });
  });

  describe("Given no parameter", () => {
    it('should throw an instance of AppError saying \'Os parâmetros "id" e "email" não foram fornecidos.\' on ptMessage', async () => {
      try {
        const ret = await testPrep.sut.exec({ administratorId: "", email: "" });
        expect(ret).toBe(undefined);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("ptMessage");
        expect((error as AppError).ptMessage).toBe(
          'Os parâmetros "id" e "email" não foram fornecidos.'
        );
      }
    });
  });

  describe("Given a parameter that no correspond to an administrator", () => {
    it("should throw an instance of AppError saying 'O administrador não pôde ser encontrado.' on ptMessage", async () => {
      try {
        const ret = await testPrep.sut.exec({
          administratorId: "non-valid-id",
          email: administratorRepoMock.email,
        });
        expect(ret).toBe(undefined);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("ptMessage");
        expect((error as AppError).ptMessage).toBe(
          "O administrador não pôde ser encontrado."
        );
      }
    });

    it("should throw an instance of AppError saying 'O administrador não pôde ser encontrado.' on ptMessage", async () => {
      try {
        const ret = await testPrep.sut.exec({
          administratorId: "",
          email: "non-valid-email",
        });
        expect(ret).toBe(undefined);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("ptMessage");
        expect((error as AppError).ptMessage).toBe(
          "O administrador não pôde ser encontrado."
        );
      }
    });
  });
});

import { AppError } from "AppError";
import { IAdministrators } from "../../../modules/administrators";
import {
  AdministratorDeleteUseCase,
  IAdministratorDeleteDTO,
} from "../../../modules/administrators/useCases";
import { AdministratorsServiceMock } from "../mock/administrators.mock";
import { administratorsMockList } from "../mock/administrators.mockList";

function createSUT(): {
  sut: AdministratorDeleteUseCase;
  administratorServiceMock: AdministratorsServiceMock;
} {
  const administratorServiceMock = new AdministratorsServiceMock();
  const sut = new AdministratorDeleteUseCase(administratorServiceMock);

  return {
    sut,
    administratorServiceMock,
  };
}

describe("This use case should remove an Administrator from repo", () => {
  const { sut, administratorServiceMock } = createSUT();

  describe("Given valid parameters", () => {
    it("should delete administrator", async () => {
      const administratorRepoMock = administratorsMockList.find(
        (a) => a._id === "administrators_id"
      );
      const administratorId = administratorRepoMock!._id;

      const dto: IAdministratorDeleteDTO = {
        administratorId: administratorId!,
        confirmation: "deletar",
      };

      await sut.exec(dto); //void

      expect(dto).toBeTruthy();
      expect(dto.confirmation).toEqual("deletar");
      expect(administratorServiceMock.delete).toBeCalled();
    });
  });

  describe("Given an empty parameter to administratorId", () => {
    it("should throw an instance of AppError saying 'O parâmetro \"administratorId\" não foi fornecido.' on ptMessage", async () => {
      try {
        const ret = await sut.exec({
          administratorId: "",
          confirmation: "deletar",
        });
        expect(ret).toBe(undefined);
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("ptMessage");
        expect((error as AppError).ptMessage).toBe(
          'O parâmetro "administratorId" não foi fornecido.'
        );
      }
    });
  });

  describe('Given a invalid passphrase "delete"', () => {
    it("should get an error", async () => {
      const administratorRepoMock = administratorsMockList[0];
      const administratorId = administratorRepoMock._id;
      try {
        const dto: IAdministratorDeleteDTO = {
          administratorId: administratorId!,
          confirmation: "",
        };

        const administrator = await sut.exec(dto);

        expect(administrator).toBeFalsy();
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("ptMessage");
        expect((error as AppError).ptMessage).toBe(
          'A palavra passe "confirmação" está incorreta.'
        );
      }
    });
  });
});

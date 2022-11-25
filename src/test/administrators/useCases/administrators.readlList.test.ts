import {
  AdministratorsReadListUseCase,
  IAdministratorsReadListDTO,
  IAdministratorsReadListResponse,
} from "../../../modules/administrators";
import { AdministratorsServiceMock } from "../mock/administrators.mock";
import { administratorsMockList } from "../mock/administrators.mockList";

function createSUT(): {
  sut: AdministratorsReadListUseCase;
  administratorsServiceMock: AdministratorsServiceMock;
} {
  const administratorsServiceMock = new AdministratorsServiceMock();
  const administratorsReadListUseCase = new AdministratorsReadListUseCase(
    administratorsServiceMock
  );

  return {
    sut: administratorsReadListUseCase,
    administratorsServiceMock,
  };
}
describe("Given no parameters, with valid Administrators in the repository", () => {
  const { sut } = createSUT();
  it("should list the first page of the Administrators", async () => {
    const AdministratorsReadListResponse: IAdministratorsReadListResponse =
      await sut.exec({});

    expect(AdministratorsReadListResponse).toBeTruthy();
    expect(AdministratorsReadListResponse.list).toBeTruthy();
    expect(AdministratorsReadListResponse.list.length).toBeGreaterThan(0);
    expect(AdministratorsReadListResponse.count).toBeTruthy();
    expect(AdministratorsReadListResponse.count).toBeGreaterThan(0);
  });

  describe("given query parameter", () => {
    it("should retrieve a list of Administrators for name", async () => {
      const name = administratorsMockList[0].name.substring(0, 10);
      const dto: IAdministratorsReadListDTO = {
        query: name,
      };

      const response: IAdministratorsReadListResponse = await sut.exec(dto);

      expect(response).toBeTruthy();
      expect(response.list).toBeTruthy();
      expect(response.list.length).toBeGreaterThan(0);
      expect(response.count).toBeTruthy();
      expect(response.count).toBeGreaterThan(0);
    });
  });

  describe("given email parameter", () => {
    const email = administratorsMockList[0].email;

    it("should return a list with the correct email", async () => {
      const correctAdministratorss = administratorsMockList.filter(
        (administrators) => administrators.email === email
      );

      const dto: IAdministratorsReadListDTO = {
        query: email,
      };

      const response: IAdministratorsReadListResponse = await sut.exec(dto);

      expect(response).toBeTruthy();
      expect(response.list).toBeTruthy();
      expect(response.list.length).toBe(correctAdministratorss.length);
      expect(response.count).toBeTruthy();
      expect(response.count).toBeGreaterThan(0);
    });
  });
});

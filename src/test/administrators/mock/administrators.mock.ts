import {
  IAdministrators,
  IAdministratorsReadListParamsPagination,
  IAdministratorsRepository,
} from "../../../modules/administrators";
import { administratorsMockList } from "./administrators.mockList";

export class AdministratorsServiceMock implements IAdministratorsRepository {
  create = jest
    .fn()
    .mockImplementation(
      async (params: {
        administrators: IAdministrators;
      }): Promise<IAdministrators> => {
        const { administrators } = params;
        const { name, email, password, confirmPassword, termsOfUse } =
          administrators;
        const newAdministrators: IAdministrators = {
          _id: "new_id",
          name,
          email,
          password,
          confirmPassword,
          termsOfUse,
        };
        return newAdministrators;
      }
    );

  delete = jest
    .fn()
    .mockImplementation(
      async (params: {
        administratorId: string;
      }): Promise<IAdministrators | null> => {
        const { administratorId } = params;

        const administratorToRemove: IAdministrators | undefined =
          administratorsMockList.find(
            (a: IAdministrators) => a._id?.toString() == administratorId
          );

        return administratorToRemove ?? null;
      }
    );

  readList = jest
    .fn()
    .mockImplementation(
      async (params: {
        query?: string | undefined;
        page?: number | undefined;
        regsPerPage?: number | undefined;
      }): Promise<IAdministrators[]> => {
        const { query } = params;

        let list = administratorsMockList;

        if (query && query != "") {
          list = list.filter((administrators) => {
            let q = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            if (administrators.email?.match(q)) return true;
            if (administrators.name.match(q)) return true;
            return false;
          });
        }

        return list;
      }
    );

  readListCount = jest
    .fn()
    .mockImplementation(
      async (params: IAdministratorsReadListParamsPagination) => {
        const filtered = this.queryMockList(params);

        return filtered.length;
      }
    );

  readOne = jest
    .fn()
    .mockImplementation(
      async (params: {
        administratorId: string;
      }): Promise<IAdministrators | null> => {
        const { administratorId } = params;

        const admnistrators: IAdministrators | undefined =
          administratorsMockList.find(
            (a: IAdministrators) => a._id?.toString() == administratorId
          );

        return admnistrators ?? null;
      }
    );

  readOneByEmail = jest
    .fn()
    .mockImplementation(async (params: { email: string }) => {
      const { email } = params;
      return await administratorsMockList.find(
        (a: IAdministrators) => a.email === email
      );
    });

  update = jest
    .fn()
    .mockImplementation(async (params: { administrator: IAdministrators }) => {
      const { administrator } = params;
      const admin = await administratorsMockList.find(
        (a: IAdministrators) => a._id === administrator._id
      );

      if (!admin) return null;

      Object.assign(admin, administrator);

      return admin!;
    });

  queryMockList(
    params: IAdministratorsReadListParamsPagination
  ): Array<IAdministrators> {
    const { query } = params;
    let { page, regsPerPage } = params;

    if (query) {
      administratorsMockList.filter((administrators: IAdministrators) => {
        let q = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        if (administrators.name?.match(q)) return true;
        if (administrators.email.match(q)) return true;
        return false;
      });
    }

    // Pages
    if (page == null) page = 1;
    if (regsPerPage == null) regsPerPage = 10;
    administratorsMockList.slice((page - 1) * regsPerPage, page * regsPerPage);

    return administratorsMockList;
  }
}

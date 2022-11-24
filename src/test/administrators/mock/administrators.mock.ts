import {
  IAdministrators,
  IAdministratorsCreate,
  IAdministratorsReadListParamsPagination,
  IAdministratorsRepository,
} from "../../../modules/administrators";
import { administratorsMockList } from "./administrators.mockList";

export class AdministratorsServiceMock implements IAdministratorsRepository {
  create = jest
    .fn()
    .mockImplementation(
      async (params: {
        administrators: IAdministratorsCreate;
      }): Promise<IAdministrators> => {
        const { administrators } = params;
        const { name, email, password, termsOfUse } = administrators;
        const newAdministrators: IAdministrators = {
          _id: "new_id",
          name,
          email,
          password,
          termsOfUse,
        };
        return newAdministrators;
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

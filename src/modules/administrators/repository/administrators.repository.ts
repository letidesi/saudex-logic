import { ESortOrientation } from "../../../config/enums/administrators/administrators";
import { IAdministrators } from "./administrators.model";

export type IAdministratorsReadListParamsPagination = {
  query?: string | undefined;
  page?: number | undefined;
  regsPerPage?: number | undefined;
};
export interface IAdministratorsRepository {
  create(params: { administrators: IAdministrators }): Promise<IAdministrators>;
  readList(
    params: IAdministratorsReadListParamsPagination
  ): Promise<Array<IAdministrators>>;
  readListCount(
    params: IAdministratorsReadListParamsPagination
  ): Promise<number>;
  readOne(params: { administratorId: string }): Promise<IAdministrators | null>;
  readOneByEmail(params: { email: string }): Promise<IAdministrators | null>;
  update(params: { administrator: IAdministrators }): Promise<IAdministrators | null>;
}

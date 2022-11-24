import { ESortOrientation } from "../../../config/enums/administrators/administrators";
import { IAdministrators, IAdministratorsCreate } from "./administrators.model";

export type IAdministratorsReadListParamsPagination = {
	query?: string | undefined;
	page?: number | undefined;
	regsPerPage?: number | undefined;
};
export interface IAdministratorsRepository {
	create(params: {administrators: IAdministratorsCreate }): Promise<IAdministrators>;
	readList(params: IAdministratorsReadListParamsPagination): Promise<Array<IAdministrators>>;
	readListCount(params: IAdministratorsReadListParamsPagination): Promise<number>;
}

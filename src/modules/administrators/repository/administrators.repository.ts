import { IAdministrators, IAdministratorsCreate } from "./administrators.model";


export interface IAdministratorsRepository {
	create(params: {administrators: IAdministratorsCreate }): Promise<IAdministrators>;
	
}

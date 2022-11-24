export interface IAdministrators {
	_id: string;
	name: string;
	email: string;
	password: string;
	termsOfUse: string;
}
export type IAdministratorsCreate = Omit<IAdministrators, '_id'>;
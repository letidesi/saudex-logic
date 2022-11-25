import { IAdministrators } from "../../repository/administrators.model";

export interface IAdministratorReadOneDTO {
	administratorId: string;
	email: string;
}

export type IAdministratorReadOneResponse = IAdministrators;

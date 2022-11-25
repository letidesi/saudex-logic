import { IAdministrators } from "../../repository/administrators.model";

export type IAdministratorCreateDTO = {
    name: string;
	email: string;
	password: string;
	confirmPassword: string;
	termsOfUse: string;
}

export type IAdministratorCreateResponse = IAdministrators;

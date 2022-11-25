import { IAdministrators } from "../../repository/administrators.model";

export interface IAdministratorUpdateDTO {
  administrator?: IAdministrators;
}

export type IAdministratorUpdateResponse = IAdministrators;
